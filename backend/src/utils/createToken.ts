import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const wordSecret = process.env.JWT_SECRET as string;

const createToken = (username: string) => {
  const jwtConfig: object = {
    expiresIn: '24h',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ username }, wordSecret, jwtConfig);
  return token;
}

export default createToken;