import userData from '../utils/users';
import CheckEmail from '../helpers/checkEmail';
import CheckPassword from '../helpers/checkPassword';
import HashPassword from '../helpers/hashPassword';
import Tokenizer from '../helpers/tokenizer';

const { hashPassword } = HashPassword;
const { tokenizer } = Tokenizer;
const { checkEmail } = CheckEmail;
const { checkPassword } = CheckPassword;

class UserController {
  static async signUp(req, res) {
    const {
      email, firstName, lastName, password, phoneNumber, address,
    } = req.body;
    try {
      const existingUser = await checkEmail(email);
      if (existingUser) {
        return res.status(409).json({
          status: 'conflict',
          error: 'Email already exists',
        });
      }
      const hashedPassword = await hashPassword(password);
      const newUser = {
        id: userData.length + 1, email, firstName, lastName, password: hashedPassword, phoneNumber, address, isAdmin: false,
      };
      const { id } = newUser;
      const token = await tokenizer({ id, email });
      userData.push(newUser);
      res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
      return res.status(201).json({
        status: 'success',
        message: 'Sign up successful',
        data: {
          token, id, email, firstName, lastName,
        },
      });
    } catch (err) {
      return err;
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    const validUser = await checkEmail(email);
    if (!validUser) {
      return res.status(401).json({
        status: 'error',
        error: 'Login unsuccessful',
      });
    }
    const validPassword = await checkPassword(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({
        status: 'error',
        error: 'Login unsuccessful',
      });
    }
    const { id, firstName, lastName } = validUser;
    const token = await tokenizer({ id, email });
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
