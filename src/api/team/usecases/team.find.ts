import { Transaction } from 'sequelize';
import TeamRepository from '../team.repository';
import Team from '../../../models/team';

export default class TeamFind {
  private repository: TeamRepository;

  constructor(transaction?: Transaction) {
    this.repository = new TeamRepository(transaction);
  }

  findAll(): Promise<Team[]> {
    return this.repository.findAll('whichPokemons');
  }

  findById(id: string): Promise<Team | Team[] | null> {
    return this.repository.findById(id, 'whichPokemons');
  }
}
