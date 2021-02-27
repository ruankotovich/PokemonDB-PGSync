import { Transaction } from 'sequelize';
import TypeOfPokemonRepository from '../typeOfPokemon.repository';
import TypeOfPokemon from '../../../models/type.of.pokemon';

export default class TypeOfPokemonFind {
  private repository: TypeOfPokemonRepository;

  constructor(transaction?: Transaction) {
    this.repository = new TypeOfPokemonRepository(transaction);
  }

  findAll(): Promise<TypeOfPokemon[]> {
    return this.repository.findAll();
  }

  findById(id: string): Promise<TypeOfPokemon | TypeOfPokemon[] | null> {
    return this.repository.findById(id);
  }
}
