import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import catchAsyncErrors from '../middlewares/catch-async-errors';

const router = Router();
const authController = new AuthController();

router.post('/login', catchAsyncErrors(authController.login));

export { router as authRoutes };
