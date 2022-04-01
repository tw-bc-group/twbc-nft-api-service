import { Sequelize } from 'sequelize';
import { db } from '@config';
import fs from 'fs';
import path from 'path'

const sequelize = new Sequelize(db.database, db.username, db.password, {
  dialect: 'postgres',
  host: db.host,
  port: db.port,
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: true,
  benchmark: true,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync(path.resolve(__dirname, '../../ca/certs-ae.crt')).toString(),
    },
  },
});

export default sequelize;
