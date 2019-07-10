import express from 'express';
import UserController from '../controllers/user.controller';
import Validate from '../middlewares/validate';

const { signUp, signIn } = UserController;
const { checkRequestBody } = Validate;

const userRouter = express.Router();

userRouter.post('/signup', checkRequestBody, signUp);
userRouter.post('/signin', checkRequestBody, signIn);

export default userRouter;
