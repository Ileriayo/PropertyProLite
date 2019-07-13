import express from 'express';
import UserController from '../controllers/user.controller';
import Validate from '../middlewares/validate';
import CheckEmail from '../middlewares/checkEmail';

const { signUp, signIn } = UserController;
const { checkRequestBody } = Validate;

const userRouter = express.Router();

userRouter.post('/signup', checkRequestBody, CheckEmail.onSignUp, signUp);
userRouter.post('/signin', checkRequestBody, CheckEmail.onSignIn, signIn);

export default userRouter;
