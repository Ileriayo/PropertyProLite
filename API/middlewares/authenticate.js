import userModel from '../models/users.models';
import DecodeToken from '../helpers/decodeToken';

const { getUserById } = userModel;
const { decodeToken } = DecodeToken;

export default class Authenticate {
  static async auth(req, res, next) {
    const token = req.cookies.token || req.headers.token || req.body.token || req.headers.authorization;
    console.log('Cookie Token:', req.cookies.token);
    console.log('Header Token:', req.headers.token);
    console.log('Header Auth Token:', req.headers.authorization);
    console.log('Body Token:', req.headers.token);
    console.log('Request Body:', req.body);
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
      return res.status(401).json({
        status: 'error',
        error,
      });
    }
  }
}
