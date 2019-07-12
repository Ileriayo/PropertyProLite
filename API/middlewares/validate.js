import ValidationHelpers from '../helpers/validationHelpers';
import regex from '../utils/regexes';

const {
  emailRegex, passwordRegex, phoneNumberRegex, numberRegex,
} = regex;
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

  static async checkProperty(req, res, next) {
    const errors = [];
    const {
      price, state, city, address, type, imageUrl,
    } = req.body;
    errors.push(...checkForEmptyField('Price', price));
    errors.push(...checkFieldPattern('Price', price, numberRegex));
    errors.push(...checkForEmptyField('State', state));
    errors.push(...checkForEmptyField('City', city));
    errors.push(...checkForEmptyField('Address', address));
    errors.push(...checkForEmptyField('Type', type));
    errors.push(...checkForEmptyField('Image', imageUrl));

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
