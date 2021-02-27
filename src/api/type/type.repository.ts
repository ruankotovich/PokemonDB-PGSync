import { Transaction } from 'sequelize';
import Type from '../../models/type';
import Repository from '../../types/repository';

export default class TypeRepository extends Repository<Type> {
  constructor(transaction?: Transaction) {
    super(Type, transaction);
  }
}
