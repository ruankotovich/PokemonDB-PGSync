import { Transaction } from 'sequelize';
import PokemonRepository from '../pokemon.repository';

export default class PokemonRemove {
  private repository: PokemonRepository;

  constructor(transaction?: Transaction) {
    this.repository = new PokemonRepository(transaction);
  }

  remove(id: string): Promise<number> {
    return this.repository.remove(id);
  }
}
