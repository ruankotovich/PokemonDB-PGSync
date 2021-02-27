import {
  ForeignKey, Model, Table,
} from 'sequelize-typescript';
import Pokemon from './pokemon';
import Team from './team';

@Table
export default class PokemonOfTeam extends Model {
    @ForeignKey(() => Pokemon)
    public readonly pokemon_id?: string

    @ForeignKey(() => Team)
    public readonly team_id?: string
}
