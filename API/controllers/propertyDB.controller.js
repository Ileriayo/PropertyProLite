/* eslint-disable camelcase */
import propertyDBModel from '../models/propertiesDB.models';

const {
  addProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty,
  updateProperty,
} = propertyDBModel;

class PropertyController {
  static async createProperty(req, res) {
    const {
      body: {
        price, state, city, address, type, image_url,
      },
    } = req;
    const { email, phone_number } = req.user[0];
    try {
      const property = await addProperty(`'Available', '${type}', '${state}', '${city}','${address}',
                         '${price}', '${new Date().toLocaleString()}', '${image_url}', '${email}', '${phone_number}'`);
      const { id, status, created_on } = property[0];
      return res.status(201).json({
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
      const property = await getPropertyById(`id = ${id}`);
      return res.status(200).json({
        status: 'success',
        data: property,
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
      const property = await updateProperty(`price = '${price}'`, `id = '${id}'`);
      const {
        status,
        type,
        state,
        city,
        address,
        created_on,
        image_url,
      } = property[0];
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
      const property = await updateProperty('status = \'Sold\'', `id = '${id}'`);
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
