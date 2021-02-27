import { Transaction } from 'sequelize';
import TeamRepository from '../team.repository';
import Team from '../../../models/team';
import { TeamInputDto, validate } from '../domain/team.input.dto';
import PokemonOfTeamRemove from '../../pokemonOfTeam/usecases/pokemonOfTeam.remove';
import PokemonOfTeam from '../../../models/pokemon.of.team';
import PokemonOfTeamSave from '../../pokemonOfTeam/usecases/pokemonOfTeam.save';

export default class TeamUpdate {
  private repository: TeamRepository;

  private pokemonOfTeamRemove: PokemonOfTeamRemove;

  private pokemonOfTeamSave: PokemonOfTeamSave;

  constructor(transaction?: Transaction) {
    this.repository = new TeamRepository(transaction);
    this.pokemonOfTeamRemove = new PokemonOfTeamRemove(transaction);
    this.pokemonOfTeamSave = new PokemonOfTeamSave(transaction);
  }

  async update(id: string, team: TeamInputDto): Promise<[number, Team[]]> {
    validate(team);
    await this.pokemonOfTeamRemove.clearTeam(id);

    const promises = team.pokemons.map(
      (pokemon_id) => this.pokemonOfTeamSave.save(
          { pokemon_id, team_id: id } as PokemonOfTeam,
      ),
    );

    await Promise.all(promises);
    return this.repository.update(id, team);
  }
}
