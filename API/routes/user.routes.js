import express from 'express';
import UserController from '../controllers/user.controller';
import ValidateSignup from '../middlewares/validateSignUp';

const { signUp } = UserController;
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
} = ValidateSignup;

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

export default userRouter;
