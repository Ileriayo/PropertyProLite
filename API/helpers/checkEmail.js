import userData from '../utils/users';

class CheckEmail {
  static async checkEmail(email) {
    try {
      const existingUser = userData.find(user => user.email === email);
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
