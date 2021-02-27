import { Transaction } from 'sequelize';
import TeamRepository from '../team.repository';
import Team from '../../../models/team';
import { TeamInputDto, validate } from '../domain/team.input.dto';
import PokemonOfTeamSave from '../../pokemonOfTeam/usecases/pokemonOfTeam.save';
import PokemonOfTeam from '../../../models/pokemon.of.team';

export default class TeamSave {
  private repository: TeamRepository;

  private pokemonOfTeamSave: PokemonOfTeamSave;

  constructor(transaction?: Transaction) {
    this.pokemonOfTeamSave = new PokemonOfTeamSave(transaction);
    this.repository = new TeamRepository(transaction);
  }

  async save(team: TeamInputDto): Promise<Team> {
    validate(team);

    const savedTeam = await this.repository.save(team);

    const promises = team.pokemons.map(
      (pokemon_id) => this.pokemonOfTeamSave.save(
          { pokemon_id, team_id: savedTeam.id } as PokemonOfTeam,
      ),
    );
    await Promise.all(promises);
    return team;
  }
}
