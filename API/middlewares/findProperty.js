import PropertyModel from '../models/properties.models';

const { findPropertyIndex } = PropertyModel;

class FindProperty {
  static async findPropertyIndex(req, res, next) {
    const { params: { id } } = req;
    const index = findPropertyIndex(id);
    req.propertyIndex = index;
    if (index === -1) {
      return res.status(404).json({
        status: 'error',
        error: 'Invalid property',
      });
    }
    return next();
  }
}

export default FindProperty;
