import propertyModel from '../models/properties.models';

const {
  addProperty, getAllProperties, getPropertyById,
} = propertyModel;

class PropertyController {
  static async createProperty(req, res) {
    const {
      body: {
        price, state, city, address, type, imageUrl,
      },
      user: { email, phoneNumber },
    } = req;
    try {
      const property = {
        id: getAllProperties().length + 1,
        status: 'Available',
        type,
        state,
        city,
        address,
        price,
        createdOn: new Date().toLocaleString(),
        imageUrl,
        ownerEmail: email,
        ownerPhoneNumber: phoneNumber,
      };

      await addProperty(property);
      return res.status(201).json({
        status: 'success',
        data: {
          id: property.id,
          status: property.status,
          type,
          state,
          city,
          address,
          price,
          createdOn: property.createdOn,
          imageUrl,
        },
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

  static async getPropertyById(req, res) {
    try {
      const { params: { id } } = req;
      const property = getPropertyById(id);
      return res.status(200).json({
        status: 'success',
        data: property || [],
      });
    } catch (error) {
      return error;
    }
  }
}

export default PropertyController;
