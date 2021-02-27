import { Transaction } from 'sequelize';
import TypeOfPokemonRepository from '../typeOfPokemon.repository';

export default class TypeOfPokemonRemove {
  private repository: TypeOfPokemonRepository;

  constructor(transaction?: Transaction) {
    this.repository = new TypeOfPokemonRepository(transaction);
  }

  remove(id: string): Promise<number> {
    return this.repository.remove(id);
  }
}
