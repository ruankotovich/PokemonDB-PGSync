import Sequelize, {
  CreateOptions, DestroyOptions, FindOptions, Identifier, UpdateOptions, Model,
} from 'sequelize';
import { FindAndCountOptions, ScopeOptions, WhereAttributeHash } from 'sequelize/types/lib/model';

export type Scope = string | ScopeOptions | (string | ScopeOptions)[] | WhereAttributeHash;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IModelActions <T extends Sequelize.Model>{
  new(): T;
  findAll: (options?: FindOptions) => Promise<T[]>;
  findOne: (options?: FindOptions) => Promise<T>;
  findAndCountAll: (options?: FindAndCountOptions) => Promise<{ rows: T[]; count: number }>;
  findByPk: (id: Identifier, options?: Omit<FindOptions, 'where'>) => Promise<T>;
  create: (payload: Partial<T>, options?: CreateOptions) => Promise<T>;
  update: (payload: Partial<T>, options: UpdateOptions) => Promise<[number, T[]]>;
  destroy: (options?: DestroyOptions) => Promise<number>;
  scope<T extends { new (): Model}>(
    this: T,
    options?: Scope
  ): T;
}
