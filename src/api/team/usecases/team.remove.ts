import { Transaction } from 'sequelize';
import TeamRepository from '../team.repository';

export default class TeamRemove {
  private repository: TeamRepository;

  constructor(transaction?: Transaction) {
    this.repository = new TeamRepository(transaction);
  }

  remove(id: string): Promise<number> {
    return this.repository.remove(id);
  }
}
