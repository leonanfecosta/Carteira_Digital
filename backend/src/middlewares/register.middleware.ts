import { Request, Response, NextFunction } from 'express';
import { IRegisterUser } from '../interfaces/user.interface';
import User from '../database/models/user.model';
import customError from '../errors/customError';

export default class RegisterMiddleware {
 public rulesValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IRegisterUser = req.body;
  const { username, password } = user;
  if (username.length < 3) {
    throw new customError(400, 'Username must be at least 3 characters long');
  }
  const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;

  if (!regex.test(password)) {
    throw new customError(
      400,
      'Password must contain at least 8 characters, one uppercase, one lowercase and one number'
    );
  }
  const foundUser = await User.findOne({
    where: {
      username: username,
    },
  });
  if (foundUser) {
    throw new customError(409, 'Username already exists');
  }


  next();
};
}