import bcrypt from 'bcryptjs';

class HashPassword {
  static async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}

export default HashPassword;
