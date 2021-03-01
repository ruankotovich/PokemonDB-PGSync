import express, { Application } from 'express';
import log from './logger';
import cors from 'cors';
import { Sequelize } from 'sequelize-typescript';
import * as Database from '../config/database';
import api from './api';
import { scopeMiddleware } from './types/middlewares';
import errorHandler from './error/handler';

class Server {
  public express: Application;

  public sequelize: Sequelize;

  public constructor() {
    this.express = express();
    this.sequelize = Database.sequelize;
    this.initialize();
  }

  private initialize(): void {
    this.sequelize.validate();
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(scopeMiddleware);
    this.express.use(api);
    this.express.use(errorHandler);
  }

  public start(applicationName: string, applicationPort: number, environment: string): void {
    this.express.get('/', (req, res) => {
      res.send(
        `${applicationName} is up and running on ${environment} environment.`,
      );
    });
    this.express.listen(applicationPort, () => {
      log.info(`${applicationName} is running on port ${applicationPort}`);
    });
  }
}

export default Server;
