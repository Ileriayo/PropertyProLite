/* eslint-disable camelcase */
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
      first_name, last_name, email, password, phone_number, address,
    } = req.body;
    if (req.path.includes('signup')) {
      errors.push(...checkForEmptyField('First name', first_name));
      errors.push(...checkFieldLength('First name', first_name, 3));
      errors.push(...checkForEmptyField('Last name', last_name));
      errors.push(...checkFieldLength('Last name', last_name, 3));
      errors.push(...checkForEmptyField('Phone Number', phone_number));
      errors.push(...checkFieldPattern('Phone Number', phone_number, phoneNumberRegex));
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

  static async checkUpdatePrice(req, res, next) {
    const errors = [];
    const { price } = req.body;
    errors.push(...checkForEmptyField('Price', price));
    errors.push(...checkFieldPattern('Price', price, numberRegex));

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
    // const {
    //   price, state, city, address, type, image_url,
    // } = req.body;
    // errors.push(...checkForEmptyField('Price', price));
    // errors.push(...checkFieldPattern('Price', price, numberRegex));
    // errors.push(...checkForEmptyField('State', state));
    // errors.push(...checkForEmptyField('City', city));
    // errors.push(...checkForEmptyField('Address', address));
    // errors.push(...checkForEmptyField('Type', type));
    // errors.push(...checkForEmptyField('Image', image_url));

    if (errors.length) {
      return res.status(400).json({
        status: 'Error: Field(s) require your attention',
        error: errors,
      });
    }
    return next();
  }

  static async checkIdParam(req, res, next) {
    const errors = [];
    const { params: { id } } = req;
    errors.push(...checkForEmptyField('Property Id', id));
    errors.push(...checkFieldPattern('Property Id', id, numberRegex));

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
