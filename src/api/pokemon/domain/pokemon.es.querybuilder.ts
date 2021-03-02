import CatchableException from '../../../error/catchable.exception';

export default function buildQuery(query: { name?: string; type?: string }) {
  const { name, type: condensedTypes } = query;

  if (!(name || condensedTypes)) {
    throw new CatchableException('You must inform either "name" or "type"');
  }

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
  };

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
