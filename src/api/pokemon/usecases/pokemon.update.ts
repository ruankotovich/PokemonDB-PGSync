import { Transaction } from 'sequelize';
import PokemonRepository from '../pokemon.repository';
import Pokemon from '../../../models/pokemon';

export default class PokemonUpdate {
  private repository: PokemonRepository;

  constructor(transaction?: Transaction) {
    this.repository = new PokemonRepository(transaction);
  }

  update(id: string, pokemon: Pokemon): Promise<[number, Pokemon[]]> {
    return this.repository.update(id, pokemon);
  }
}
