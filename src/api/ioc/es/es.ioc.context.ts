import config from 'config';
import getMockedElasticsearchConnection from './es.test.mock';

const { host, port } = config.get('services.elasticsearch');

export default function iocConfiguration() {
  if (config.get('environment') !== 'test') {
    return { node: `${host}:${port}` };
  }

  return { node: `${host}:${port}`, Connection: getMockedElasticsearchConnection() };
}
