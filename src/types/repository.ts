// eslint-disable-next-line import/no-unresolved
import { Query } from 'express-serve-static-core';
import { Page, Pageable, PageRequest } from '@flagcard/pagination';
import { FindAndCountOptions, WhereAttributeHash } from 'sequelize/types/lib/model';
import _ from 'lodash';
import Sequelize, {
  Identifier, Op,
} from 'sequelize';
import { IModelActions, Scope } from './model.actions';

export default class Repository<T extends Sequelize.Model> {
  model: IModelActions<T>;

  transaction?: Sequelize.Transaction;

  constructor(model: IModelActions<T>, transaction?: Sequelize.Transaction) {
    this.model = model;
    this.transaction = transaction;
  }

  findAll(scope?: Scope, query?: Query): Promise<T[]> {
    const payload = _.omit(query, ['limit', 'page', 'offset', 'order', 'sort']) as WhereAttributeHash;
    return this.model.scope(scope).findAll({ transaction: this.transaction, where: payload });
  }

  async findPaged(query: Query, scope?: Scope): Promise<Page<T>> {
    const pageable: Pageable = PageRequest.of(query);
    const payload = _.omit(query, ['limit', 'page', 'offset', 'order', 'sort']) as unknown as T;

    const options = {
      ...pageable,
      where: payload,
      transaction: this.transaction,
    } as unknown as FindAndCountOptions;

    const response = await this.model.scope(scope).findAndCountAll(options);
    return {
      total: response.count,
      page: pageable.page,
      content: response.rows,
    } as Page<T>;
  }

  findById(id: string, scope?: Scope): Promise<T| T[] | null> {
    const searchIn = id.split(',');
    if (searchIn.length > 1) {
      return this.model.scope(scope).findAll({ where: { id: { [Op.in]: searchIn } }, transaction: this.transaction });
    }
    return this.model.scope(scope).findByPk(id, { transaction: this.transaction });
  }

  findOne(query: Query, scope?: Scope): Promise<T| T[] | null> {
    return this.model.scope(scope).findOne({ where: query as WhereAttributeHash, transaction: this.transaction });
  }

  save(payload: Partial<T>, scope?: Scope): Promise<T> {
    return this.model.scope(scope).create(payload, { transaction: this.transaction });
  }

  update(id: Identifier, payload: Partial<T>, scope?: Scope): Promise<[number, T[]]> {
    return this.model.scope(scope)
      .update(payload, { where: { id }, transaction: this.transaction });
  }

  remove(id: Identifier, force?: boolean, scope?: Scope): Promise<number> {
    return this.model.scope(scope).destroy({ where: { id }, transaction: this.transaction, force });
  }
}
