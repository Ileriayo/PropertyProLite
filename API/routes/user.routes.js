import express from 'express';
import UserController from '../controllers/user.controller';
import UserDBController from '../controllers/userDB.controller';
import Validate from '../middlewares/validate';
import CheckEmail from '../middlewares/checkEmail';
import CheckEmailFromDB from '../middlewares/checkEmailFromDB';

const { /* signUp, */ signIn } = UserController;
const { checkRequestBody } = Validate;

const userRouter = express.Router();

// userRouter.post('/signup', checkRequestBody, CheckEmail.onSignUp, signUp);
userRouter.post('/signin', checkRequestBody, CheckEmail.onSignIn, signIn);

userRouter.post('/signup', checkRequestBody, CheckEmailFromDB.onSignUp, UserDBController.signUp);

export default userRouter;
