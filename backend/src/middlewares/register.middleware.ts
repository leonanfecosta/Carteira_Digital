import { Request, Response, NextFunction } from 'express';
import { IRegisterUser } from '../interfaces/user.interface';
import User from '../database/models/user.model';

export const registerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IRegisterUser = req.body;
  const { username, password } = user;
  if (username.length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3 characters long' });
  }
  const foundUser = await User.findOne({
    where: {
      username: username,
    },
  });
  if (foundUser) {
    return res.status(409).json({
      message: 'Username already exists',
    });
  }

  const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;

  if (!regex.test(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number',
    });
  }

  next();
};
