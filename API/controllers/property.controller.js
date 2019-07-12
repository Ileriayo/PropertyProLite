import propertyModel from '../models/properties.models';

const { addProperty, getAllProperties } = propertyModel;

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
        id: await getAllProperties().length + 1,
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

  static async getAllProperties(req, res) {
    try {
      const allProperties = await getAllProperties();
      return res.status(200).json({
        status: 'success',
        data: allProperties,
      });
    } catch (error) {
      return error;
    }
  }
}

export default PropertyController;
