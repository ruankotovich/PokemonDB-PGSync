import { Transaction } from 'sequelize';
import TypeRepository from '../type.repository';

export default class TypeRemove {
  private repository: TypeRepository;

  constructor(transaction?: Transaction) {
    this.repository = new TypeRepository(transaction);
  }

  remove(id: string): Promise<number> {
    return this.repository.remove(id);
  }
}
