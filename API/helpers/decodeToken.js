import jwt from 'jsonwebtoken';

class DecodeToken {
  static async decodeToken(token) {
    const decoded = await jwt.decode(token, process.env.JWT_KEY);
    return decoded;
  }
}

export default DecodeToken;
