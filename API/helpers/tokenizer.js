import jwt from 'jsonwebtoken';

class Tokenizer {
  static async tokenizer(payload, expiresIn = '1h') {
    const token = await jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn },
    );
    return token;
  }
}

export default Tokenizer;
