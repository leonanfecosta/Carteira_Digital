import Transaction from '../database/models/transactions.model';
import UserService from './user.service';
import Account from '../database/models/accounts.model';
import CustomError from '../errors/customError';
import { IUserInfo } from '../interfaces/user.interface';

export default class TransactionService {
  constructor(private _userService: UserService) {}

  public verifyUser = async (username: string): Promise<IUserInfo> => {
    const userInfo = await this._userService.getUserInfo(username);
    if (!userInfo) {
      throw new CustomError(404, 'User not found');
    }
    return userInfo as IUserInfo;
  };

  public verifyEqualUsers = async (
    recipient: string,
    sender: string
  ): Promise<void> => {
    if (recipient === sender) {
      throw new CustomError(400, 'You can not send money to yourself');
    }
  };

  public verifyBalance = async (
    amount: number,
    senderInfo: IUserInfo
  ): Promise<void> => {
    const { balance } = senderInfo.account;
    if (amount > balance) {
      throw new CustomError(400, 'Insufficient funds');
    }
  };

  public createTransaction = async (
    sender: string,
    recipient: string,
    amount: number
  ): Promise<Object> => { 
    const senderInfo = await this.verifyUser(sender);
    const recipientInfo = await this.verifyUser(recipient);
    await this.verifyEqualUsers(sender, recipient);
    await this.verifyBalance(amount, senderInfo);

    await Account.update(
      { balance: senderInfo.account.balance - amount },
      { where: { id: senderInfo.accountId } }
    );

    await Account.update(
      { balance: recipientInfo.account.balance + amount },
      { where: { id: recipientInfo.accountId } }
    );

    // const transaction = await Transaction.create({
    //   debitedAccountId: senderInfo.accountId,
    //   creditedAccountId: recipientInfo.accountId,
    //   value: amount,
    //   createdAt: new Date().toISOString(),
    // });
    // return transaction;

    return {
      message: 'Transaction completed successfully',
    };
  };
}
