import { Transaction } from 'sequelize';
import PokemonOfTeamRepository from '../pokemonOfTeam.repository';
import PokemonOfTeam from '../../../models/pokemon.of.team';

export default class PokemonOfTeamUpdate {
  private repository: PokemonOfTeamRepository;

  constructor(transaction?: Transaction) {
    this.repository = new PokemonOfTeamRepository(transaction);
  }

  update(id: string, pokemonOfTeam: PokemonOfTeam): Promise<[number, PokemonOfTeam[]]> {
    return this.repository.update(id, pokemonOfTeam);
  }
}
