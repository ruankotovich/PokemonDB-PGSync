import _ from 'lodash';
import http, { Sync } from '../../http';
import Pokemon from '../../../src/models/pokemon';

describe('Team Controller', () => {
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

  it('[GET /teams] should return status code ok (200)', async () => {
    const { status, body } = await http.get('/rest/teams');
    expect(status).toEqual(200);
    expect(body).toEqual([]);
  });

  it('[POST /teams] should return status code fail (500) as there are missing attributes', async () => {
    const { status, body } = await http.post('/rest/teams')
      .send({
      });
    expect(status).toEqual(500);
    expect(body.name).toEqual('Error');
    expect(body.status).toEqual(500);
    expect(body.message).toContain('"pokemons" is required');
  });

  it('[POST /teams] should return status code ok (200)', async () => {
    const { status, body } = await http.post('/rest/teams')
      .send({
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Perfect Team',
        trainer_name: 'Ruan Gato',
        pokemons: ['00000000-0000-0000-0000-000000000000'],
      });
    expect(status).toEqual(200);
    const cleanBody = _.omit(body, ['createdAt', 'updatedAt', 'deletedAt']);
    expect(cleanBody).toEqual({
      id: '00000000-0000-0000-0000-000000000000',
      name: 'Perfect Team',
      pokemons: [
        '00000000-0000-0000-0000-000000000000',
      ],
      trainer_name: 'Ruan Gato',
    });
  });

  it('[UPDATE /teams] should return status code ok (204) when update and ok (200) when get', async () => {
    const { status: status_1 } = await http.put('/rest/teams/00000000-0000-0000-0000-000000000000')
      .send({
        name: 'Perfect Team Updated',
        pokemons: [
          '00000000-0000-0000-0000-000000000000',
        ],
        trainer_name: 'Ruan Gato',
      });
    expect(status_1).toEqual(204);
    const { status: status_2, body } = await http.get('/rest/teams/00000000-0000-0000-0000-000000000000')
      .send();

    expect(status_2).toEqual(200);
    expect(body).toEqual({
      id: '00000000-0000-0000-0000-000000000000',
      name: 'Perfect Team Updated',
      pokemons: [
        {
          code: '1',
          id: '00000000-0000-0000-0000-000000000000',
          name: 'Bulbasaur',
          types: [],
        },
      ],
      trainer_name: 'Ruan Gato',
    });
  });

  it('[DELETE /teams] should return status code ok (204)', async () => {
    const { status } = await http.delete('/rest/teams/1')
      .send({
      });
    expect(status).toEqual(204);
  });
});
