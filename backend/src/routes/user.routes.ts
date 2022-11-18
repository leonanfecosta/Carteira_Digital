import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import RegisterMiddleware from '../middlewares/register.middleware';
import ValidateToken from '../middlewares/validateToken';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);
const registerMiddleware = new RegisterMiddleware();
const validateToken = new ValidateToken();

router.post(
  '/register',
  registerMiddleware.rulesValidation,
  userController.register
);

router.post('/login', userController.login);

router.get('/account', validateToken.validateToken, userController.getUserInfo);

export default router;