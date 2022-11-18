import { Request, Response, NextFunction } from 'express';
import { IUserInfo } from '../interfaces/user.interface';
import CustomError from '../errors/customError';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private _userService: UserService) {}

  public verifyNames = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { recipient } = req.body;
      const sender = res.locals.user;
      
      if (recipient === sender) {
        return res.status(400).json({ message: 'You can not send money to yourself' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };

  public verifyBalance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { amount } = req.body;
      const sender = res.locals.user;

      const senderInfo = (await this._userService.getUserInfo(
        sender
      )) as IUserInfo;

      const { balance } = senderInfo.account;
      if (amount > balance) {
        throw new CustomError(400, 'Insufficient funds');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
