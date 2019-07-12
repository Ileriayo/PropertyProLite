import propertyModel from '../models/properties.models';

const { addProperty } = propertyModel;

class PropertyController {
  static async createProperty(req, res) {
    const {
      body: {
        price, state, city, address, type, imageUrl,
      },
      user: { id },
    } = req;

    try {
      const property = {
        id: await propertyModel.list.length + 1,
        owner: id,
        price,
        state,
        city,
        address,
        type,
        imageUrl,
      };

      await addProperty(property);
      return res.status(201).json({
        status: 'success',
        data: property,
      });
    } catch (error) {
      return error;
    }
  }
}

export default PropertyController;
