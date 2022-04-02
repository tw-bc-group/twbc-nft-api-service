import Config from './config';
import { app, jwt } from './config';

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, APP_PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export { app, jwt };
export default Config;
