import * as dotenv from 'dotenv';
import dev from './dev';

dotenv.config();

export interface Config {
  nodeEnv: string;
  app: {
    env: string;
    port: string;
  };
  db: {
    database: string;
    username: string;
    port: number;
    password: string;
    host: string;
  };
  logger: {
    format?: string;
    dir?: string;
  };
  jwt: {
    secretKey?: string;
  };
}

export const app = {
  env: process.env.APP_ENV,
  port: process.env.APP_PORT,
};

export const db = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

export const jwt = {
  secretKey: process.env.JWT_SECRETKEY
}

const env_cfg = {
  dev,
};

const config: Config = {
  nodeEnv: process.env.NODE_ENV,
  app,
  db,
  jwt,
  ...env_cfg[app.env],
};

export default config;
