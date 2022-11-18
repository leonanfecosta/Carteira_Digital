import { Request, Response, NextFunction } from 'express';
import TransactionService from '../services/transactions.service';

export default class TransactionController {
  constructor(private _transactionService: TransactionService) {}

  public createTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { sender, recipient, amount } = req.body;
      const transaction = await this._transactionService.createTransaction(
        sender,
        recipient,
        amount
      );
      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  };
}

