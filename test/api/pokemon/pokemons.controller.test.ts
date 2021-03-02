import http, { Sync } from '../../http';
import Pokemon from '../../../src/models/pokemon';

describe('Pokemon Controller', () => {
  // eslint-disable-next-line no-undef
  beforeAll(async () => {
    await Sync.default();
    await Pokemon.create({
      id: '00000000-0000-0000-0000-000000000000',
      code: 1,
      name: 'Bulbasaur',
      image: '',
    });
  });

  it('[GET /pokemons] should return status code ok (200)', async () => {
    const { status, body } = await http.get('/rest/pokemons?name=macho');

    expect(status).toEqual(200);
    expect(body).toEqual([
      {
        Types: [
          {
            id: '428b9386-f2e4-4015-a4ba-2f924158fa4e',
            name: 'fighting',
          },
        ],
        code: '66',
        id: '9d34ff99-c612-4d15-b040-3055eb7888dc',
        name: 'machop',
      },
      {
        Types: [
          {
            id: '428b9386-f2e4-4015-a4ba-2f924158fa4e',
            name: 'fighting',
          },
        ],
        code: '67',
        id: 'f8e2a92b-5436-46e2-9c67-5a7b7a16491e',
        name: 'machoke',
      },
    ]);
  });
  it('[GET /pokemons] should return status code ok (200)', async () => {
    const { status, body } = await http.get('/rest/pokemons/00000000-0000-0000-0000-000000000000');

    expect(status).toEqual(200);
    expect(body).toEqual({
      code: '1',
      id: '00000000-0000-0000-0000-000000000000',
      image: '',
      name: 'Bulbasaur',
      types: [],
    });
  });
});
