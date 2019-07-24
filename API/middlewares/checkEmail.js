import userModel from '../models/users.models';

const { getUserByEmail } = userModel;

export default class CheckEmail {
  static async onSignUp(req, res, next) {
    const { body: { email } } = req;
    try {
      const existinguser = await getUserByEmail(email);
      if (existinguser) {
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
      const { body: { email } } = req;
      const validUser = await getUserByEmail(email);
      if (!validUser) {
        return res.status(401).json({
          status: 'error',
          error: 'Login unsuccessful',
        });
      }
      req.validUser = validUser;
      return next();
    } catch (error) {
      return error;
    }
  }
}
