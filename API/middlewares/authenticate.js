import DecodeToken from '../helpers/decodeToken';

const { decodeToken } = DecodeToken;

export default class Authenticate {
  static async auth(req, res, next) {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        status: 'error',
        error: 'Unauthenticated!',
      });
    }

    try {
      const user = await decodeToken(token);
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
