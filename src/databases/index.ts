import Sequelize from 'sequelize';
import UserModel from '@models/users.model';
import sequelize from './database'
import WalletModel from '@models/wallets.model';

const DB = {
  Users: UserModel(sequelize),
  Wallets: WalletModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
