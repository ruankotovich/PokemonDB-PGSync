import { SequelizeOptions, Sequelize } from 'sequelize-typescript';
import path from 'path';
import config from 'config';

const connection = { ...config.get('connection'), models: [path.resolve(__dirname, '../src/models')], logQueryParameters: true } as SequelizeOptions;

export const sequelize = new Sequelize(connection);
