import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import RegisterMiddleware from '../middlewares/register.middleware';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);
const registerMiddleware = new RegisterMiddleware();

router.post(
  '/register',
  registerMiddleware.rulesValidation,
  userController.register
);

export default router;