import { Request, Response, NextFunction } from 'express';
import CustomError from './customError';

const buildError = (
  Error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (Error instanceof CustomError) {
    return res.status(Error.status).json({ message: Error.message });
  }
};

export default buildError;
