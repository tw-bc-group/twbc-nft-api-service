import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, IRITA_NODE, IRITA_CHAIN_ID, IRITA_KEY_NAME, IRITA_KEY_PASSWORD, IRITA_MNEMONIC, IRITA_API_KEY } = process.env;
