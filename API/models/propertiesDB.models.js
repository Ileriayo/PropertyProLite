import Query from '../db/index';
import SQLHelpers from '../helpers/sqlHelpers';

const { query } = Query;
const {
  insert,
  select,
  selectWhere,
  update,
  deleteFromDB,
} = SQLHelpers;

const propertyModel = {
  addProperty: values => query(insert(`properties(status, type, state, city, 
                  address, price, created_on, image_url,
                  owner_email, owner_phone_number)`, values)),
  getAllProperties: () => query(select('*', 'properties')),
  getPropertiesByType: type => query(selectWhere('*', 'properties', type)),
  getPropertyById: id => query(selectWhere('*', 'properties', id)),
  deleteProperty: id => query(deleteFromDB('properties', id)),
  updateProperty: (price, id) => query(update('properties', price, id)),
};

export default propertyModel;
