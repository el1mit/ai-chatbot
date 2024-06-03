const express = require('express');
const userController = require('../controllers/userController');
const {
	validate,
	loginValidator,
	signupValidator,
} = require('../utils/validators');
const { verifyToken } = require('../utils/tokenManager');
// const authMidleware = require('../middlewares/AuthMiddleware');
// const forbiddenMiddleware = require('../middlewares/ForbiddenMiddleware');

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

module.exports = userRouter;
