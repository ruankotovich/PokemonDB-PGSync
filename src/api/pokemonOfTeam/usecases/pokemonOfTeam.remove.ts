import { Transaction } from 'sequelize';
import PokemonOfTeamRepository from '../pokemonOfTeam.repository';

export default class PokemonOfTeamRemove {
  private repository: PokemonOfTeamRepository;

  constructor(transaction?: Transaction) {
    this.repository = new PokemonOfTeamRepository(transaction);
  }

  remove(id: string): Promise<number> {
    return this.repository.remove(id);
  }

  clearTeam(team_id: string): Promise<void> {
    return this.repository.removeOfTeam(team_id);
  }
}
