import trimWhiteSpace from '../helpers/trimWhiteSpace';

class ValidateSignUp {
  static async checkRequestBody(req, res, next) {
    const {
      firstName, lastName, email, password, phoneNumber, address,
    } = req.body;
    if (!firstName && !lastName && !email && !password && !phoneNumber && !address) {
      return res.status(400).json({
        status: 'Error: Required field(s)',
        error: 'First name, Last name, Email and Password fields are all required',
      });
    }
    return next();
  }

  static async checkFirstName(req, res, next) {
    const { firstName } = req.body;
    if (!firstName || trimWhiteSpace(firstName) === '') {
      return res.status(400).json({
        status: 'Error: Required field(s)',
        error: 'First name is required and must be at least three characters',
      });
    }
    return next();
  }

  static async checkLastName(req, res, next) {
    const { lastName } = req.body;
    if (!lastName || trimWhiteSpace(lastName) === '') {
      return res.status(400).json({
        status: 'Error: Required field(s)',
        error: 'Last name is required and must be at least three characters',
      });
    }
    return next();
  }

  static async checkEmail(req, res, next) {
    const { email } = req.body;
    if (!email || trimWhiteSpace(email) === '') {
      return res.status(400).json({
        status: 'Error: Required field(s)',
        error: 'Email is required',
      });
    }
    return next();
  }

  static async checkPhoneNumber(req, res, next) {
    const { phoneNumber } = req.body;
    if (!phoneNumber || phoneNumber === '') {
      return res.status(400).json({
        status: 'Error: Required field(s)',
        error: 'Phone number is required',
      });
    }
    return next();
  }

  static async checkAddress(req, res, next) {
    const { address } = req.body;
    if (!address || trimWhiteSpace(address) === '') {
      return res.status(400).json({
        status: 'Error: Required field(s)',
        error: 'Address is required',
      });
    }
    return next();
  }

  static async checkPassword(req, res, next) {
    const { password } = req.body;
    if (!password || trimWhiteSpace(password) === '') {
      return res.status(400).json({
        status: 'Error: Required field(s)',
        error: 'Password is required',
      });
    }
    return next();
  }

  static async checkFirstNameLength(req, res, next) {
    const { firstName } = req.body;
    if (trimWhiteSpace(firstName).length < 3) {
      return res.status(400).json({
        status: 'Error: Field Length',
        error: 'First name must be at least three (3) characters',
      });
    }
    return next();
  }

  static async checkLastNameLength(req, res, next) {
    const { lastName } = req.body;
    if (trimWhiteSpace(lastName).length < 3) {
      return res.status(400).json({
        status: 'Error: Field Length',
        error: 'Last name must be at least three (3) characters',
      });
    }
    return next();
  }

  static async validateEmail(req, res, next) {
    if (!/^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(req.body.email)) {
      return res.status(400).json({
        status: 'Error: Email Validation',
        error: 'Please enter a valid email',
      });
    }
    return next();
  }

  static async checkPasswordLength(req, res, next) {
    const { password } = req.body;
    if (trimWhiteSpace(password).length < 6) {
      return res.status(400).json({
        status: 'Error: Field Length',
        error: 'Password must be at least six (6) characters',
      });
    }
    return next();
  }
}

export default ValidateSignUp;
