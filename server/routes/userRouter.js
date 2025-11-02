import express from 'express';
import userController from '../controllers/userController.js';
import {
	validate,
	loginValidator,
	signupValidator,
} from '../utils/validators.js';
import { verifyToken } from '../utils/tokenManager.js';
// import authMidleware from ('../middlewares/AuthMiddleware.js');
// import forbiddenMiddleware from ('../middlewares/ForbiddenMiddleware.js');

const userRouter = express.Router();
const UserController = new userController();

userRouter.get('/', UserController.getAllUsers);
userRouter.post(
	'/signup',
	validate(signupValidator),
	UserController.userSignup
);
userRouter.post('/login', validate(loginValidator), UserController.userLogin);
userRouter.get('/auth-status', verifyToken, UserController.verifyUser);
userRouter.get('/logout', verifyToken, UserController.userLogout);

export default userRouter;
