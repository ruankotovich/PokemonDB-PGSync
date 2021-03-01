import {
  BAD_REQUEST,
} from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { BaseError, ValidationErrorItem } from 'sequelize';
import log from '../logger';

interface Exception{
  status: number;
  name: string;
  message: string | string[];
}

const parseException = (err: Error): Exception => {
  if (err instanceof BaseError) {
    const sequelizeError = err as unknown as {message: string; errors?: Array<ValidationErrorItem>; name: string};
    return {
      status: BAD_REQUEST,
      message: sequelizeError.errors?.map((validationError) => `${validationError.type}: ${validationError.message}`) || sequelizeError.message,
      name: sequelizeError.name,
    };
  }
  return ({ status: 500, message: err.message, name: 'Error' });
};

export default (err: Error, req: Request, res: Response, next: NextFunction): void => {
  const exception = parseException(err);
  log.error(`[status: ${exception.status} - ${exception.message}] ${req.method}: ${req.originalUrl} BODY: ${JSON.stringify(req.body)}`);
  res.status(exception.status).json(exception);
  return next();
};
