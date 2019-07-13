import PropertyModel from '../models/properties.models';

const { getPropertyById } = PropertyModel;

class MapPropOwner {
  static async mapPropOwner(req, res, next) {
    const property = getPropertyById(req.params.id);
    if (!property || property.owner_email !== req.user.email) {
      return res.status(400).json({
        status: 'error',
        error: 'You can perform this operation only on existing properties that belong to you',
      });
    }
    return next();
  }
}

export default MapPropOwner;
