import {
  BelongsToMany,
  Column, DataType, Model, Scopes, Table,
} from 'sequelize-typescript';
import Pokemon from './pokemon';
import PokemonOfTeam from './pokemon.of.team';
import Type from './type';

@Scopes(() => ({
  whichPokemons: {
    attributes: ['id', 'name', 'trainer_name'],
    include: [{
      model: Pokemon,
      attributes: ['name', 'id', 'code'],
      through: { attributes: [] },
      include: [{
        model: Type,
        attributes: ['name', 'id'],
        through: { attributes: [] },
      }],
    }],
  },
}))
@Table
export default class Team extends Model {
    @Column({
      allowNull: false,
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    })
    public id?: string;

    @Column({
      allowNull: false,
      type: DataType.TEXT,
    })
    public name?: string;

    @Column({
      allowNull: false,
      type: DataType.TEXT,
    })
    public trainer_name?: string;

    @BelongsToMany(() => Pokemon, { through: () => PokemonOfTeam, onDelete: 'cascade' })
    public pokemons?: Pokemon[];
}
