import express from 'express';
import UserController from '../controllers/user.controller';
import ValidateSignUp from '../middlewares/validateSignUp';

const { signUp, signIn } = UserController;
const {
  checkRequestBody,
  checkFirstName,
  checkLastName,
  checkEmail,
  checkPhoneNumber,
  checkAddress,
  checkPassword,
  checkFirstNameLength,
  checkLastNameLength,
  validateEmail,
  checkPasswordLength,
} = ValidateSignUp;

const userRouter = express.Router();

userRouter.post(
  '/signup',
  checkRequestBody,
  checkFirstName,
  checkFirstNameLength,
  checkLastName,
  checkLastNameLength,
  checkEmail,
  checkPhoneNumber,
  checkAddress,
  validateEmail,
  checkPassword,
  checkPasswordLength,
  signUp,
);

userRouter.post(
  '/signin',
  checkEmail,
  validateEmail,
  checkPassword,
  signIn,
);

export default userRouter;
