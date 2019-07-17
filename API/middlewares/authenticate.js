import userDBModel from '../models/usersDB.models';
import DecodeToken from '../helpers/decodeToken';

const { getUserById } = userDBModel;
const { decodeToken } = DecodeToken;

export default class Authenticate {
  static async auth(req, res, next) {
    try {
      let token = req.headers.token || req.headers.authorization;
      let user = await decodeToken(token);
      const { id } = user;
      if (!token || !id) {
        return res.status(401).json({
          status: 'error',
          error: 'Unauthorized!',
        });
      }
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
      }
      // let user = await decodeToken(token);
      // const { id } = user;
      user = await getUserById(id);
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        error: 'Unauthorized',
      });
    }
  }
}
