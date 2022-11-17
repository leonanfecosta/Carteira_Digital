import * as md5 from 'md5';
import User from '../database/models/user.model';
import Account from '../database/models/accounts.model';
import { IRegisterUser, IUser } from '../interfaces/user.interface';
import CustomError from '../errors/customError';

export default class UserService {
  public register = async (user: IRegisterUser): Promise<IUser> => {
    const { username, password } = user;
    const { id } = await Account.create({
      balance: 100,
    });
    const hashedPassword = md5(password);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      accountId: id,
    });
    if (!newUser) {
      throw new CustomError(500, 'Something went wrong');
    }
    return newUser;
  };
}
