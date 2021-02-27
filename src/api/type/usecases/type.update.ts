import { Transaction } from 'sequelize';
import TypeRepository from '../type.repository';
import Type from '../../../models/type';

export default class TypeUpdate {
  private repository: TypeRepository;

  constructor(transaction?: Transaction) {
    this.repository = new TypeRepository(transaction);
  }

  update(id: string, type: Type): Promise<[number, Type[]]> {
    return this.repository.update(id, type);
  }
}
