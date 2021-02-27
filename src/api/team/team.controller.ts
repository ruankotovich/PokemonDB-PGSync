import { Request, Response, NextFunction } from 'express';
import { NO_CONTENT } from 'http-status';
import TeamSave from './usecases/team.save';
import Team from '../../models/team';
import TeamUpdate from './usecases/team.update';
import TeamFind from './usecases/team.find';
import TeamRemove from './usecases/team.remove';
import { TeamInputDto } from './domain/team.input.dto';
import { sequelize } from '../../../config/database';

export default class TeamController {
  static async findAll(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try {
      const team = new TeamFind();
      const result = await team.findAll();
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try {
      const team = new TeamFind();
      const result = await team.findById(req.params.id);
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }

  static async save(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    const transaction = await sequelize.transaction();
    try {
      const team = new TeamSave(transaction);
      const payload = req.body as TeamInputDto;
      const result = await team.save(payload);
      await transaction.commit();
      return res.json(result);
    } catch (err) {
      transaction.rollback();
      return next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    const transaction = await sequelize.transaction();
    try {
      const team = new TeamUpdate(transaction);
      const payload = req.body as TeamInputDto;
      await team.update(req.params.id, payload);
      await transaction.commit();
      return res.sendStatus(NO_CONTENT);
    } catch (err) {
      transaction.rollback();
      return next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try {
      const team = new TeamRemove();
      await team.remove(req.params.id);
      return res.sendStatus(NO_CONTENT);
    } catch (err) {
      return next(err);
    }
  }
}
