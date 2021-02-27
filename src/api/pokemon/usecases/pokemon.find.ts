import { Transaction } from 'sequelize';
import PokemonRepository from '../pokemon.repository';
import Pokemon from '../../../models/pokemon';

export default class PokemonFind {
  private repository: PokemonRepository;

  constructor(transaction?: Transaction) {
    this.repository = new PokemonRepository(transaction);
  }

  findAll(): Promise<Pokemon[]> {
    return this.repository.findAll('whichTypes');
  }

  findById(id: string): Promise<Pokemon | Pokemon[] | null> {
    return this.repository.findById(id, 'whichTypes');
  }

  findByCode(code: string): Promise<Pokemon | Pokemon[] | null> {
    return this.repository.findOne({ code }, 'whichTypes');
  }
}
