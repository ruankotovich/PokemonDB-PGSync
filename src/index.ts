import os from 'os';
import cluster from 'cluster';
import config from 'config';
import log from './logger';
import environment, { isProduction } from '../config/environment';
import Server from './server';
import { name } from '../package.json';

class Application {
  private server: Server;

  private readonly port: number;

  private readonly cpus: number;

  public constructor() {
    this.server = new Server();
    this.port = config.get('port');
    this.cpus = os.cpus().length;
  }

  public initialize(): void {
    if (isProduction() && cluster.isMaster) {
      for (let i = 0; i < this.cpus; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        log.info(
          `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`,
        );
        log.info('Starting a new worker');
        cluster.fork();
      });
    } else {
      this.server.start(name, this.port, environment);
    }
  }
}

new Application().initialize();
