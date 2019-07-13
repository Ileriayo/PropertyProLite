/* eslint-disable camelcase */
import propertyModel from '../models/properties.models';

const {
  addProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty,
  updateProperty,
  findPropertyIndex,
  markPropertySold,
} = propertyModel;

class PropertyController {
  static async createProperty(req, res) {
    const {
      body: {
        price, state, city, address, type, image_url,
      },
      user: { email, phone_number },
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
        created_on: new Date().toLocaleString(),
        image_url,
        owner_email: email,
        owner_phone_number: phone_number,
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
          created_on: property.created_on,
          image_url,
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

  static async deleteProperty(req, res) {
    try {
      const { propertyIndex } = req;
      await deleteProperty(propertyIndex);
      return res.status(200).json({
        status: 'success',
        data: { message: 'Property has been successfuly deleted' },
      });
    } catch (error) {
      return error;
    }
  }

  static async updateProperty(req, res) {
    try {
      const { params: { id }, body: { price } } = req;
      const propertyIndex = await findPropertyIndex(id);
      await updateProperty(propertyIndex, price);
      const property = getPropertyById(id);
      const {
        status,
        type,
        state,
        city,
        address,
        created_on,
        image_url,
      } = property;
      return res.status(200).json({
        status: 'success',
        data: {
          id,
          status,
          type,
          state,
          city,
          address,
          price,
          created_on,
          image_url,
        },
      });
    } catch (error) {
      return error;
    }
  }

  static async markPropertySold(req, res) {
    try {
      const { params: { id }, body: { price } } = req;
      const propertyIndex = await findPropertyIndex(id);
      await markPropertySold(propertyIndex);
      const property = getPropertyById(id);
      const {
        status,
        type,
        state,
        city,
        address,
        created_on,
        image_url,
      } = property;
      return res.status(200).json({
        status: 'success',
        data: {
          id,
          status,
          type,
          state,
          city,
          address,
          price,
          created_on,
          image_url,
        },
      });
    } catch (error) {
      return error;
    }
  }
}

export default PropertyController;
