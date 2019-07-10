import trimWhiteSpace from '../helpers/trimWhiteSpace';

class ValidationHelpers {
  static checkForEmptyField(field, value) {
    if (!value || !trimWhiteSpace(value)) return [`${field} is required`];
    return [];
  }

  static checkFieldPattern(field, value, regex) {
    if (value && !regex.test(value)) return [`${field} is invalid`];
    return [];
  }

  static checkFieldLength(field, value, valueLength) {
    if (value && (trimWhiteSpace(value).length < valueLength)) return [`${field} must be at least ${valueLength} characters`];
    return [];
  }
}

export default ValidationHelpers;
