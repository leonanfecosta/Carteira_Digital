const { Op } = require('sequelize');
import moment = require('moment');
import Transaction from '../database/models/transactions.model';
import Account from '../database/models/accounts.model';
import User from '../database/models/user.model';
import { IUserInfo } from '../interfaces/user.interface';
import {
  ITransaction,
  ITransactionInfo,
} from '../interfaces/transactions.interface';

export default class TransactionService {
  public updateBalance = async (
    senderInfo: IUserInfo,
    recipientInfo: IUserInfo,
    amount: number
  ): Promise<void> => {
    await Account.update(
      { balance: senderInfo.account.balance - amount },
      { where: { id: senderInfo.accountId } }
    );

    await Account.update(
      { balance: recipientInfo.account.balance + amount },
      { where: { id: recipientInfo.accountId } }
    );
  };

  public createTransaction = async (
    senderInfo: IUserInfo,
    recipientInfo: IUserInfo,
    amount: number
  ): Promise<ITransaction> => {
    const transaction = await Transaction.create({
      debitedAccountId: senderInfo.id,
      creditedAccountId: recipientInfo.id,
      value: amount,
      createdAt: new Date(98, 1),
    });

    return transaction;
  };

  public getTransactions = async (
    user: IUserInfo
  ): Promise<ITransactionInfo[]> => {
    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [
          { debitedAccountId: user.accountId },
          { creditedAccountId: user.accountId },
        ],
      },
      include: [
        {
          model: Account,
          include: [
            {
              model: User,
              as: 'userAccount',
              attributes: ['id', 'username'],
            },
          ],
          as: 'debitedAccount',
          attributes: ['id'],
        },
        {
          model: Account,
          include: [
            {
              model: User,
              as: 'userAccount',
              attributes: ['id', 'username'],
            },
          ],
          as: 'creditedAccount',
          attributes: ['id'],
        },
      ],
    });

    return transactions as unknown as ITransactionInfo[];
  };

  public filterTransactionsByDate = async (
    userInfo: IUserInfo,
    date: string,
    filter: string
  ): Promise<ITransactionInfo[]> => {
    const transactions = await this.getTransactions(userInfo);

    switch (filter) {
      case 'date and cash-in':
        return transactions.filter(
          (transaction) =>
            moment(transaction.createdAt).format('YYYY-MM-DD') === date &&
            Number(transaction.creditedAccountId) === Number(userInfo.accountId)
        );
      case 'date and cash-out':
        return transactions.filter(
          (transaction) =>
            moment(transaction.createdAt).format('YYYY-MM-DD') === date &&
            Number(transaction.debitedAccountId) === Number(userInfo.accountId)
        );

      case 'cash-in':
        return transactions.filter(
          (transaction) =>
            Number(transaction.creditedAccountId) === Number(userInfo.accountId)
        );

      case 'cash-out':
        return transactions.filter(
          (transaction) =>
            Number(transaction.debitedAccountId) === Number(userInfo.accountId)
        );

      case 'date':
        return transactions.filter(
          (transaction) =>
            moment(transaction.createdAt).format('YYYY-MM-DD') === date
        );
      default:
        return transactions;
    }
  };
}
