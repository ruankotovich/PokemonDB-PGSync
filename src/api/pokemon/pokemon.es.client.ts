import { Client } from '@elastic/elasticsearch';
import iocConfiguration from '../ioc/es/es.ioc.context';

function spawn(): Client {
  const options = iocConfiguration();
  const client = new Client(options);
  return client;
}

export default spawn();
