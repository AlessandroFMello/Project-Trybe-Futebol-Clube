import { Router } from 'express';
import loginMiddleware from '../middlewares/loginMiddleware';
import LoginController from '../controllers/loginController';

const router = Router();

const loginController = new LoginController();

router.post('/', loginMiddleware, loginController.login);

export default router;
