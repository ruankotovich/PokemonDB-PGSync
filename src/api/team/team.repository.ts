import { Transaction } from 'sequelize';
import Team from '../../models/team';
import Repository from '../../types/repository';

export default class TeamRepository extends Repository<Team> {
  constructor(transaction?: Transaction) {
    super(Team, transaction);
  }
}
