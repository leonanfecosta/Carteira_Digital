import * as md5 from 'md5';
import User from '../database/models/user.model';
import Account from '../database/models/accounts.model';
import { IRegisterUser, IUser } from '../interfaces/user.interface';
import { ILoginUser } from '../interfaces/token.interface';
import CustomError from '../errors/customError';
import createToken from '../utils/createToken';

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

  public login = async (user: IRegisterUser): Promise<ILoginUser> => {
    const { username, password } = user;
    const userInfo = await User.findOne({
      where: {
        username,
      },
    });

    if (!userInfo) {
      throw new CustomError(404, 'User not found');
    }
    const validatePassword = md5(password) === userInfo.password;
    if (!validatePassword) {
      throw new CustomError(400, 'Invalid password');
    }
    const token = createToken(username);
    const { id, accountId } = userInfo;
    return { id, username, accountId, token };
  };

  public getUserInfo = async (username: string): Promise<IUser> => {
    const userInfo = (await User.findOne({
      where: {
        username,
      },
      attributes: { exclude: ['password'] },
      include: {
        model: Account,
        as: 'account',
        attributes: ['balance'],
      },
    })) as unknown as IUser;

    if (!userInfo) {
      throw new CustomError(404, 'User not found');
    }

    return userInfo;
  };
}
