import { Transaction } from 'sequelize';
import TypeOfPokemonRepository from '../typeOfPokemon.repository';
import TypeOfPokemon from '../../../models/type.of.pokemon';

export default class TypeOfPokemonSave {
  private repository: TypeOfPokemonRepository;

  constructor(transaction?: Transaction) {
    this.repository = new TypeOfPokemonRepository(transaction);
  }

  save(typeOfPokemon: TypeOfPokemon): Promise<TypeOfPokemon> {
    return this.repository.save(typeOfPokemon);
  }
}
