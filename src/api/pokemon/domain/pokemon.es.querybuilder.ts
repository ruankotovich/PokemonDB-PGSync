export type QueryPokemon = {name?: string; type?: string; from?: string; size?: string}

export default function buildQuery(query: QueryPokemon) {
  const {
    name, type: condensedTypes, from, size,
  } = query;

  let type: string | string[] | undefined;

  if (condensedTypes) {
    type = (condensedTypes as string).split(',');
    if (type.length <= 1) {
      type = condensedTypes as string;
    }
  }

  const payload = {
    sort: [
      {
        code: 'asc',
      },
    ],
    query: {
      bool: {
        must: [] as Array<object>,
      },
    },
  } as {from?: string; size?: string; sort: Array<any>; query: any};

  if (name) {
    payload.query.bool.must.push({
      query_string: {
        query: `${name}~`,
        fields: [
          'name',
        ],
        fuzziness: 2,
      },
    });
  }

  if (from) {
    payload.from = from;
  }

  if (size) {
    payload.size = size;
  }

  if (type) {
    if (!Array.isArray(type)) {
      payload.query.bool.must.push({
        query_string: {
          query: `${type}~`,
          fields: [
            'Types.name',
          ],
          fuzziness: 2,
        },
      });
    } else {
      payload.query.bool.must.push({
        bool: {
          should: type.map((t) => ({
            query_string: {
              query: `${t}~`,
              fields: [
                'Types.name',
              ],
              fuzziness: 2,
            },
          })),
        },
      });
    }
  }

  return payload;
}
