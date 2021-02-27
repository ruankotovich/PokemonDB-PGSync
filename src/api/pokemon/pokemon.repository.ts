import { Transaction } from 'sequelize';
import Pokemon from '../../models/pokemon';
import Repository from '../../types/repository';

export default class PokemonRepository extends Repository<Pokemon> {
  constructor(transaction?: Transaction) {
    super(Pokemon, transaction);
  }
}
