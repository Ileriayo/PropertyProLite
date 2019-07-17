import Query from '../db/index';
import SQLHelpers from '../helpers/sqlHelpers';

const { query } = Query;
const { insert } = SQLHelpers;

const propertyModel = {
  addProperty: values => query(insert(`properties(status, type, state, city, 
                  address, price, created_on, image_url,
                  owner_email, owner_phone_number)`, values)),
  // getAllProperties: () => propertyModel.list,
  // getPropertyById: id => propertyModel.list.find(property => property.id.toString() === id),
  // findPropertyIndex: id => propertyModel.list.findIndex(property => property.id.toString() === id),
  // deleteProperty: propertyIndex => propertyModel.list.splice(propertyIndex, 1),
  // updateProperty: (propertyIndex, newPrice) => {
  //   propertyModel.list[propertyIndex].price = newPrice;
  // },
  // markPropertySold: (propertyIndex) => {
  //   propertyModel.list[propertyIndex].status = 'sold';
  // },
  // list: [],
};

export default propertyModel;
