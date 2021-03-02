import Mock from '@elastic/elasticsearch-mock';

export default function getMockedElasticsearchConnection() {
  const mock = new Mock();
  mock.add({
    method: 'POST',
    path: '/pkm/_search',
    body: {
      sort: [{ code: 'asc' }],
      query: { bool: { must: [{ query_string: { query: 'macho~', fields: ['name'], fuzziness: 2 } }] } },
    },
  }, () => ({
    took: 3,
    timed_out: false,
    _shards: {
      total: 1,
      successful: 1,
      skipped: 0,
      failed: 0,
    },
    hits: {
      total: {
        value: 2,
        relation: 'eq',
      },
      max_score: null,
      hits: [
        {
          _index: 'pkm',
          _type: '_doc',
          _id: '9d34ff99-c612-4d15-b040-3055eb7888dc',
          _score: null,
          _source: {
            id: '9d34ff99-c612-4d15-b040-3055eb7888dc',
            name: 'machop',
            code: '66',
            Types: [
              {
                id: '428b9386-f2e4-4015-a4ba-2f924158fa4e',
                name: 'fighting',
              },
            ],
            _meta: {
              Types: {
                id: [
                  '428b9386-f2e4-4015-a4ba-2f924158fa4e',
                ],
              },
              TypeOfPokemons: {
                pokemon_id: [
                  '9d34ff99-c612-4d15-b040-3055eb7888dc',
                ],
                type_id: [
                  '428b9386-f2e4-4015-a4ba-2f924158fa4e',
                ],
              },
            },
          },
          sort: [
            66,
          ],
        },
        {
          _index: 'pkm',
          _type: '_doc',
          _id: 'f8e2a92b-5436-46e2-9c67-5a7b7a16491e',
          _score: null,
          _source: {
            id: 'f8e2a92b-5436-46e2-9c67-5a7b7a16491e',
            name: 'machoke',
            code: '67',
            Types: [
              {
                id: '428b9386-f2e4-4015-a4ba-2f924158fa4e',
                name: 'fighting',
              },
            ],
            _meta: {
              Types: {
                id: [
                  '428b9386-f2e4-4015-a4ba-2f924158fa4e',
                ],
              },
              TypeOfPokemons: {
                pokemon_id: [
                  'f8e2a92b-5436-46e2-9c67-5a7b7a16491e',
                ],
                type_id: [
                  '428b9386-f2e4-4015-a4ba-2f924158fa4e',
                ],
              },
            },
          },
          sort: [
            67,
          ],
        },
      ],
    },
  }));

  return mock.getConnection();
}
