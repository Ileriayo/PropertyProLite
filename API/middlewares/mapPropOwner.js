import PropertyDBModel from '../models/propertiesDB.models';

const { getPropertyById } = PropertyDBModel;

class MapPropOwner {
  static async mapPropOwner(req, res, next) {
    const property = await getPropertyById(`id = '${req.params.id}'`);
    // console.log('property-owner:', property[0].owner_email);
    // console.log('Request-user:', req.user[0].email);
    if (property.length <= 0 || property[0].owner_email !== req.user[0].email) {
      return res.status(400).json({
        status: 'error',
        error: 'You can perform this operation only on existing properties that belong to you',
      });
    }
    return next();
  }
}

export default MapPropOwner;
