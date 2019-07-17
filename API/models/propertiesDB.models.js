import Query from '../db/index';
import SQLHelpers from '../helpers/sqlHelpers';

const { query } = Query;
const {
  insert,
  select,
  selectWhere,
  update,
} = SQLHelpers;

const propertyModel = {
  addProperty: values => query(insert(`properties(status, type, state, city, 
                  address, price, created_on, image_url,
                  owner_email, owner_phone_number)`, values)),
  getAllProperties: () => query(select('*', 'properties')),
  getPropertyById: id => query(selectWhere('*', 'properties', id)),
  // findPropertyIndex: id => propertyModel.list.findIndex(property => property.id.toString() === id),
  // deleteProperty: propertyIndex => propertyModel.list.splice(propertyIndex, 1),
  updateProperty: (price, id) => query(update('properties', price, id)),
  // (propertyIndex, newPrice) => {
  //   propertyModel.list[propertyIndex].price = newPrice;
  // },
  // markPropertySold: (propertyIndex) => {
  //   propertyModel.list[propertyIndex].status = 'sold';
  // },
  // list: [],
};

export default propertyModel;
