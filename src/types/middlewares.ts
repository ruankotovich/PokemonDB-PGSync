import { NextFunction, Request, Response } from 'express';

export async function scopeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (req.query.action) {
    req.action = req.query.action as string;
    delete req.query.action;
  }

  if (req.query.scopes) {
    try {
      const parsedScope = JSON.parse(req.query.scopes as string);
      if (Array.isArray(parsedScope)) {
        req.scopes = parsedScope;
        delete req.query.scopes;
      }
    } catch (error) {
      req.scopes = undefined;
    }
  }
  next();
}
