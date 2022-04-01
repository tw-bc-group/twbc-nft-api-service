import Sequelize from 'sequelize';
import UserModel from '@models/users.model';
import sequelize from './database'

const DB = {
  Users: UserModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
