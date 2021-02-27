import { Transaction } from 'sequelize';
import TypeRepository from '../type.repository';
import Type from '../../../models/type';

export default class TypeFind {
  private repository: TypeRepository;

  constructor(transaction?: Transaction) {
    this.repository = new TypeRepository(transaction);
  }

  findAll(): Promise<Type[]> {
    return this.repository.findAll();
  }

  findById(id: string): Promise<Type | Type[]| null> {
    return this.repository.findById(id);
  }
}
