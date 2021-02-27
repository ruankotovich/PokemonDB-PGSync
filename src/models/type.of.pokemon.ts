import {
  ForeignKey, Model, Table,
} from 'sequelize-typescript';
import Pokemon from './pokemon';
import Type from './type';

@Table
export default class TypeOfPokemon extends Model {
    @ForeignKey(() => Pokemon)
    public readonly pokemon_id?: string

    @ForeignKey(() => Type)
    public readonly type_id?: string
}
