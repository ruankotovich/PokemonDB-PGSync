import { Transaction } from 'sequelize';
import PokemonOfTeamRepository from '../pokemonOfTeam.repository';
import PokemonOfTeam from '../../../models/pokemon.of.team';

export default class PokemonOfTeamFind {
  private repository: PokemonOfTeamRepository;

  constructor(transaction?: Transaction) {
    this.repository = new PokemonOfTeamRepository(transaction);
  }

  findAll(): Promise<PokemonOfTeam[]> {
    return this.repository.findAll();
  }

  findById(id: string): Promise<PokemonOfTeam | PokemonOfTeam[] | null> {
    return this.repository.findById(id);
  }
}
