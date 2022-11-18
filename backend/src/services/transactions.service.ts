import Transaction from '../database/models/transactions.model';
import Account from '../database/models/accounts.model';
import { IUserInfo } from '../interfaces/user.interface';

export default class TransactionService {
  public updateBalance = async (
    senderInfo: IUserInfo,
    recipientInfo: IUserInfo,
    amount: number
  ): Promise<Object> => {
    await Account.update(
      { balance: senderInfo.account.balance - amount },
      { where: { id: senderInfo.accountId } }
    );

    await Account.update(
      { balance: recipientInfo.account.balance + amount },
      { where: { id: recipientInfo.accountId } }
    );

    return {
      message: 'Transaction completed successfully',
    };
  };

  public createTransaction = async (
    senderInfo: IUserInfo,
    recipientInfo: IUserInfo,
    amount: number
  ): Promise<Object> => {
    const transaction = await Transaction.create({
      debitedAccountId: senderInfo.id,
      creditedAccountId: recipientInfo.id,
      value: amount,
      createdAt: new Date(),
    });

    return transaction;
  }
}
