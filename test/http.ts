import supertest from 'supertest';
import Server from '../src/server';

export * as Sync from '../scripts/db-sync';

const server = new Server();

export default supertest(server.express);
