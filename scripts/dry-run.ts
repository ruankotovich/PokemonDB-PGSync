import config from 'config';
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import Sync from './db-sync';
import { PKMJsonSchema } from '../assets/pkm.json.schema';
import Type from '../src/models/type';
import { sequelize } from '../config/database';
import Pokemon from '../src/models/pokemon';
import TypeOfPokemon from '../src/models/type.of.pokemon';
import CatchableException from '../src/error/catchable.exception';

const {
  dialect, database, username, password, host,
} = config.get('services.database.connection');

async function dryRunPostgres(): Promise<void> {
  const connectionString = `postgres://${username}:${password}@${host}/postgres`;
  const client = new Client({ connectionString });
  await client.connect();
  console.log('CREATING DATABASE');
  await client.query(`DROP DATABASE IF EXISTS "${database}";`);
  await client.query(`CREATE DATABASE "${database}";`);
  console.log('DONE');
  await client.end();
}

async function migratePokemons(): Promise<void> {
  const { pokemon: rawPokemonList } = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/pkm.json')).toString()) as PKMJsonSchema;
  // Get all the types that have appeared on the list, create a Set of them to remove duplicates, and assign for each one one UUID, in a map, HOW GRACEFUL!

  const pokemons: Array<Pokemon> = [];
  const typeOfPokemons: Array<TypeOfPokemon> = [];
  const types: Map<string, Type> = new Map();

  // eslint-disable-next-line no-restricted-syntax
  for (const pokemon of rawPokemonList) {
    const currentPokemonGeneratedUuid = uuidv4();
    pokemons.push({
      name: pokemon.name,
      image: pokemon.image,
      code: `${pokemon.id}`,
      id: currentPokemonGeneratedUuid,
    } as Pokemon);

    // eslint-disable-next-line no-restricted-syntax
    for (const type of pokemon.types) {
      if (!types.has(type)) {
        types.set(type, { name: type, id: uuidv4() } as Type);
      }

      const currentType = types.get(type) as Type;

      typeOfPokemons.push({
        pokemon_id: currentPokemonGeneratedUuid,
        type_id: currentType.id,
      } as TypeOfPokemon);
    }
  }

  {
    const transaction = await sequelize.transaction();
    await Type.bulkCreate(Array.from(types.values()), { transaction });
    await Pokemon.bulkCreate(pokemons, { transaction });
    await TypeOfPokemon.bulkCreate(typeOfPokemons, { transaction });
    await transaction.commit();
  }
}

(async (): Promise<void> => {
  switch (dialect) {
    case 'postgres':
      await dryRunPostgres();
      break;
    default:
      throw new CatchableException(`The dialect "${dialect}" currently is not supported`);
  }
  console.log('SYNC DATABASE MODELS');
  await Sync();
  await migratePokemons();
  await sequelize.close();
  return Promise.resolve();
})().then(() => console.log('ALL DONE'));
