import * as Sequelize from 'sequelize';
import db from '.';

class Transaction extends Sequelize.Model {
  id!: number;
  debitedAccountId!: string;
  creditedAccountId!: number;
  value!: number;
  createdAt!: Date;
}

Transaction.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    debitedAccountId: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'debited_account_id',
    },
    creditedAccountId: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'credited_account_id',
    },
    value: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      field: 'created_at',
    },
  },
  {
    sequelize: db,
    modelName: 'transactions',
    underscored: true,
    timestamps: false,
  }
);

export default Transaction;