import { Router } from 'express';
import UserService from '../services/user.service';
import TransactionController from '../controllers/transactions.controller';
import TransactionService from '../services/transactions.service';
import ValidateToken from '../middlewares/validateToken';

const router = Router();
const userService = new UserService();
const transactionService = new TransactionService(userService);
const transactionController = new TransactionController(transactionService);
const validateToken = new ValidateToken();

router.post(
  '/transaction',
  validateToken.validateToken,
  transactionController.createTransaction
);

export default router;
