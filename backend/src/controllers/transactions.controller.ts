import { Request, Response, NextFunction } from 'express';
import TransactionService from '../services/transactions.service';
import UserService from '../services/user.service';
import { IUserInfo } from '../interfaces/user.interface';
import CustomError from '../errors/customError';

export default class TransactionController {
  constructor(
    private _transactionService: TransactionService,
    private _userService: UserService
  ) {}

  public createTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { recipient, amount } = req.body;
      const sender = res.locals.user

      if (!recipient || !amount || !sender) {
        throw new CustomError(400, 'Missing fields');
      }

      const senderInfo = (await this._userService.getUserInfo(
        sender
      )) as IUserInfo;

      const recipientInfo = (await this._userService.getUserInfo(
        recipient
      )) as IUserInfo;

      await this._transactionService.updateBalance(
        senderInfo,
        recipientInfo,
        amount
      );

      const transaction = await this._transactionService.createTransaction(
        senderInfo,
        recipientInfo,
        amount
      );
      res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  };
}
