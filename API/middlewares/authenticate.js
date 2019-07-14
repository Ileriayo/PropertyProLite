import userModel from '../models/users.models';
import DecodeToken from '../helpers/decodeToken';

const { getUserById } = userModel;
const { decodeToken } = DecodeToken;

export default class Authenticate {
  static async auth(req, res, next) {
    const { token } = req.cookies;
    req.headers.token = token;
    console.log('Request Headers From Auth Middleware: ', req.headers);
    if (!token) {
      return res.status(401).json({
        status: 'error',
        error: 'Unauthenticated!',
      });
    }

    try {
      let user = await decodeToken(token);
      const { id } = user;
      user = getUserById(id);
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).error({
        status: 'error: authentication failed',
        data: error,
      });
    }
  }
}
