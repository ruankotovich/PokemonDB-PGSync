import { Client } from '@elastic/elasticsearch';
import config from 'config';

const { host, port } = config.get('services.elasticsearch');
const client = new Client({ node: `${host}:${port}` });

export default client;
