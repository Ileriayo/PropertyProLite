import userDBModel from '../models/usersDB.models';

const { getUserByEmail } = userDBModel;

export default class CheckEmail {
  static async onSignUp(req, res, next) {
    const { body: { email } } = req;
    try {
      const result = await getUserByEmail(email);
      if (result.length > 0) {
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
      if (validUser.length <= 0) {
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
