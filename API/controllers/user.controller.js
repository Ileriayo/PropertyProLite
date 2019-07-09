import userData from '../utils/users';
import CheckEmail from '../helpers/checkEmail';
import HashPassword from '../helpers/hashPassword';
import Tokenizer from '../helpers/tokenizer';

const { hashPassword } = HashPassword;
const { tokenizer } = Tokenizer;
const { checkEmail } = CheckEmail;

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
      const newId = newUser.id;
      const token = await tokenizer({ newId, email });
      userData.push(newUser);
      return res.status(201).json({
        status: 'success',
        message: 'Sign up successful',
        data: {
          token, id: newId, email, firstName, lastName, type: newUser.type,
        },
      });
    } catch (err) {
      return err;
    }
  }
}

export default UserController;
