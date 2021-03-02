import { Request, Response, NextFunction } from 'express';
import PokemonFind from './usecases/pokemon.find';

export default class PokemonController {
  static async findAll(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try {
      const pokemon = new PokemonFind();
      const result = await pokemon.findAll(req.query);
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try {
      const pokemon = new PokemonFind();
      const result = await pokemon.findById(req.params.id);
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }

  static async findByCode(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try {
      const pokemon = new PokemonFind();
      const result = await pokemon.findById(req.params.code);
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }
}
