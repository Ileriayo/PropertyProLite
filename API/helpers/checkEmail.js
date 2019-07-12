import userModel from '../models/users.models';

const { getUserByEmail } = userModel;

class CheckEmail {
  static async checkEmail(email) {
    try {
      const existingUser = getUserByEmail(email);
      if (existingUser) {
        return existingUser;
      }
      return undefined;
    } catch (err) {
      return err;
    }
  }
}

export default CheckEmail;
