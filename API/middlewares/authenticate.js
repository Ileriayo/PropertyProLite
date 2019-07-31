import DecodeToken from '../helpers/decodeToken';

const { decodeToken } = DecodeToken;

export default class Authenticate {
  static async auth(req, res, next) {
    try {
      let token = req.headers.token || req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          status: 'error',
          error: 'Unauthorized!',
        });
      }
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
      }
      const tokenDetails = await decodeToken(token);
      const {
        id, email, firstName, lastName, phoneNumber,
      } = tokenDetails;
      const user = {
        id, email, firstName, lastName, phoneNumber,
      };
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
