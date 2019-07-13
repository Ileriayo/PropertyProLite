import userModel from '../models/users.models';
import CheckPassword from '../helpers/checkPassword';
import HashPassword from '../helpers/hashPassword';
import Tokenizer from '../helpers/tokenizer';

const { addUser, getAllUsers } = userModel;
const { hashPassword } = HashPassword;
const { tokenizer } = Tokenizer;
const { checkPassword } = CheckPassword;

class UserController {
  static async signUp(req, res) {
    const {
      email, firstName, lastName, password, phoneNumber, address,
    } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = {
      id: await getAllUsers().length + 1,
      email,
      firstName,
      lastName,
      password: hashedPassword,
      phoneNumber,
      address,
      isAdmin: false,
    };
    const { id } = newUser;
    await addUser(newUser);
    const token = await tokenizer({ id });
    res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
    return res.status(201).json({
      status: 'success',
      message: 'Sign up successful',
      data: {
        token, id, email, firstName, lastName,
      },
    });
  }

  static async signIn(req, res) {
    const { body: { email, password }, validUser } = req;
    const validPassword = await checkPassword(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({
        status: 'error',
        error: 'Login unsuccessful',
      });
    }
    const { id, firstName, lastName } = validUser;
    const token = await tokenizer({ id });
    res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
    return res.status(200).json({
      status: 'success',
      message: 'Sign in successful',
      data: {
        token, id, email, firstName, lastName,
      },
    });
  }
}

export default UserController;
