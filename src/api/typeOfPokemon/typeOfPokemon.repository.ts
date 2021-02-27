import { Transaction } from 'sequelize';
import TypeOfPokemon from '../../models/type.of.pokemon';
import Repository from '../../types/repository';

export default class TypeOfPokemonRepository extends Repository<TypeOfPokemon> {
  constructor(transaction?: Transaction) {
    super(TypeOfPokemon, transaction);
  }
}
