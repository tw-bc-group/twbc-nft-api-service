import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from 'Sequelize';
import sequelize from '../databases/database';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
//   declare username: string;
  declare password: string;
  declare email: string;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
//    username: {
//      allowNull: false,
//      type: DataTypes.STRING(255),
//    },
    email: {
      type: DataTypes.STRING(45),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'users',
    sequelize,
  },
);

export default User;
