import config from 'config';

const environment: string = config.get('environment');

export const isProduction = (): boolean => environment === 'production';

export default environment;
