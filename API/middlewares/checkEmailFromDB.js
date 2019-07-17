import userDBModel from '../models/usersDB.models';
import CheckPassword from '../helpers/checkPassword';

const { getUserByEmail } = userDBModel;
const { checkPassword } = CheckPassword;

export default class CheckEmail {
  static async onSignUp(req, res, next) {
    const { body: { email } } = req;
    try {
      const result = await getUserByEmail(email);
      if (result.length > 0) {
        // console.log('This user tried to sign up again:', result);
        return res.status(409).json({
          status: 'conflict',
          error: 'Email already exists',
        });
      }
      return next();
    } catch (error) {
      return error;
    }
  }

  static async onSignIn(req, res, next) {
    try {
      const { body: { email, password } } = req;
      const validUser = await getUserByEmail(email);
      // console.log('This user is trying to sign in:', validUser);
      if (validUser.length <= 0 && await checkPassword(password, validUser.password)) {
        return res.status(401).json({
          status: 'error',
          error: 'Login Unsuccessful',
        });
      }
      req.validUser = validUser;
      return next();
    } catch (error) {
      return error;
    }
  }
}
