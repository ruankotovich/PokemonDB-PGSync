import {
  BelongsToMany, Column, DataType, Model, Scopes, Table,
} from 'sequelize-typescript';
import Type from './type';
import Team from './team';
import TypeOfPokemon from './type.of.pokemon';
import PokemonOfTeam from './pokemon.of.team';

@Scopes(() => ({
  whichTypes: {
    attributes: ['id', 'code', 'name', 'image'],
    include: [{
      model: Type, as: 'types', attributes: ['name', 'id'], through: { attributes: [] },
    }],
  },
}))
@Table
export default class Pokemon extends Model {
    @Column({
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    })
    public id?: string;

    @Column({
      allowNull: false,
      type: DataType.STRING,
      unique: true,
    })
    public code?: string;

    @Column({
      allowNull: false,
      type: DataType.STRING,
      unique: true,
    })
    public name?: string;

    @Column({
      allowNull: false,
      type: DataType.STRING(500),
      unique: true,
    })
    public image?: string;

    @BelongsToMany(() => Type, { through: () => TypeOfPokemon, onDelete: 'cascade' })
    public types?: Type[];

    @BelongsToMany(() => Team, { through: () => PokemonOfTeam, onDelete: 'cascade' })
    public team?: Team;
}
