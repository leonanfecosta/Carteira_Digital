import { Request, Response, NextFunction } from 'express';
import { IRegisterUser } from '../interfaces/user.interface';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private _userService: UserService) {}
  public register = async (req: Request, res: Response, next: NextFunction)=> {
    try {
      const user: IRegisterUser = req.body;
      const newUser = await this._userService.register(user);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };
}
