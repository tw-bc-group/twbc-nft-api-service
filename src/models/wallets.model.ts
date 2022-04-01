import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Wallet } from '@interfaces/wallets.interface';

export type WalletCreationAttributes = Optional<Wallet, 'id' | 'keyName' | 'address' | 'privKey'>;

export class WalletModel extends Model<Wallet, WalletCreationAttributes> implements Wallet {
  public id: number;
  public keyName: string;
  public address: string;
  public privKey: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof WalletModel {
  WalletModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      keyName: {
        allowNull: false,
        type: DataTypes.STRING(255),
        unique: true,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      privKey: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'wallets',
      sequelize,
    },
  );

  return WalletModel;
}
