import * as md5 from 'md5';
import User from '../database/models/user.model';
import { IRegisterUser } from '../interfaces/user.interface';

const register = async (user: IRegisterUser) => {
  const { username, password } = user;
  const hashedPassword = md5(password);
  const newUser = await User.create({ username, password: hashedPassword });
  return newUser;
};
