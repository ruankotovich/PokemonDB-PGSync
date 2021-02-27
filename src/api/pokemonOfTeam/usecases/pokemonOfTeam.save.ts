import { Transaction } from 'sequelize';
import PokemonOfTeamRepository from '../pokemonOfTeam.repository';
import PokemonOfTeam from '../../../models/pokemon.of.team';

export default class PokemonOfTeamSave {
  private repository: PokemonOfTeamRepository;

  constructor(transaction?: Transaction) {
    this.repository = new PokemonOfTeamRepository(transaction);
  }

  save(pokemonOfTeam: PokemonOfTeam): Promise<PokemonOfTeam> {
    return this.repository.save(pokemonOfTeam);
  }
}
