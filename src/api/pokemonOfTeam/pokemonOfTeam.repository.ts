import { Transaction } from 'sequelize';
import PokemonOfTeam from '../../models/pokemon.of.team';
import Repository from '../../types/repository';

export default class PokemonOfTeamRepository extends Repository<PokemonOfTeam> {
  constructor(transaction?: Transaction) {
    super(PokemonOfTeam, transaction);
  }

  async removeOfTeam(team_id: string): Promise<void> {
    await this.model.destroy({ transaction: this.transaction, where: { team_id } });
  }
}
