import {
  BelongsToMany,
  Column, DataType, Model, Table,
} from 'sequelize-typescript';
import Pokemon from './pokemon';
import TypeOfPokemon from './type.of.pokemon';

@Table
export default class Type extends Model {
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

    @BelongsToMany(() => Pokemon, () => TypeOfPokemon)
    public pokemons?: Pokemon[];
}
