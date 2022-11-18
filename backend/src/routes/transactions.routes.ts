import { Router } from 'express';
import UserService from '../services/user.service';
import TransactionController from '../controllers/transactions.controller';
import TransactionService from '../services/transactions.service';
import ValidateToken from '../middlewares/validateToken';
import TransactionsMiddleware from '../middlewares/transactions.middleware';

const router = Router();
const userService = new UserService();
const transactionService = new TransactionService();
const transactionController = new TransactionController(transactionService, userService);
const validateToken = new ValidateToken();
const transactionsMiddleware = new TransactionsMiddleware(userService);

router.post(
  '/transaction',
  validateToken.validateToken,
  transactionsMiddleware.verifyNames,
  transactionsMiddleware.verifyBalance,
  transactionController.createTransaction
);

export default router;
