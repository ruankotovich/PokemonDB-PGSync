import { Transaction } from 'sequelize';
import TypeOfPokemonRepository from '../typeOfPokemon.repository';
import TypeOfPokemon from '../../../models/type.of.pokemon';

export default class TypeOfPokemonUpdate {
  private repository: TypeOfPokemonRepository;

  constructor(transaction?: Transaction) {
    this.repository = new TypeOfPokemonRepository(transaction);
  }

  update(id: string, typeOfPokemon: TypeOfPokemon): Promise<[number, TypeOfPokemon[]]> {
    return this.repository.update(id, typeOfPokemon);
  }
}
