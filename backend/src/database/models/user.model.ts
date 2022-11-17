import * as Sequelize from 'sequelize';
import db from '.';
import Account from './accounts.model';

class User extends Sequelize.Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: string;
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    accountId: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'account_id',
    },
  },
  {
    sequelize: db,
    modelName: 'users',
    underscored: true,
    timestamps: false,
  }
);

User.belongsTo(Account, { foreignKey: 'accountId', as: 'account' });
Account.hasOne(User, { foreignKey: 'accountId', as: 'userAccount' });

export default User;
