import { Transaction } from 'sequelize';
import TypeRepository from '../type.repository';
import Type from '../../../models/type';

export default class TypeSave {
  private repository: TypeRepository;

  constructor(transaction?: Transaction) {
    this.repository = new TypeRepository(transaction);
  }

  save(type: Type): Promise<Type> {
    return this.repository.save(type);
  }
}
