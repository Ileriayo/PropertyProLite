import bcrypt from 'bcryptjs';

class CheckPassword {
  static async checkPassword(password, validPass) {
    try {
      const isPassword = bcrypt.compareSync(password, validPass);
      return isPassword;
    } catch (err) {
      return err;
    }
  }
}

export default CheckPassword;
