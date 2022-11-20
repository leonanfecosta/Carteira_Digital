import * as Sequelize from 'sequelize';
import db from '.';

class Account extends Sequelize.Model {
  id!: number;
  balance!: number;
}

Account.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    balance: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'accounts',
    underscored: true,
    timestamps: false,
  }
);

export default Account;