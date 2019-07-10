import ValidationHelpers from '../helpers/validationHelpers';
import regex from '../utils/regexes';

const { emailRegex, passwordRegex, phoneNumberRegex } = regex;
const { checkForEmptyField, checkFieldPattern, checkFieldLength } = ValidationHelpers;

class Validate {
  static async checkRequestBody(req, res, next) {
    const errors = [];
    const {
      firstName, lastName, email, password, phoneNumber, address,
    } = req.body;
    if (req.path.includes('signup')) {
      errors.push(...checkForEmptyField('First name', firstName));
      errors.push(...checkFieldLength('First name', firstName, 3));
      errors.push(...checkForEmptyField('Last name', lastName));
      errors.push(...checkFieldLength('Last name', lastName, 3));
      errors.push(...checkForEmptyField('Phone Number', phoneNumber));
      errors.push(...checkFieldPattern('Phone Number', phoneNumber, phoneNumberRegex));
      errors.push(...checkForEmptyField('Address', address));
      errors.push(...checkFieldPattern('Password', password, passwordRegex));
    }
    errors.push(...checkForEmptyField('Email', email));
    errors.push(...checkFieldPattern('Email address', email, emailRegex));
    errors.push(...checkForEmptyField('Password', password));

    if (errors.length) {
      return res.status(400).json({
        status: 'Error: Field(s) require your attention',
        error: errors,
      });
    }
    return next();
  }
}

export default Validate;
