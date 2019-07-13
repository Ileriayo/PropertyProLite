const propertyModel = {
  addProperty: property => propertyModel.list.push(property),
  getAllProperties: () => propertyModel.list,
  getPropertyById: id => propertyModel.list.find(property => property.id.toString() === id),
  findPropertyIndex: id => propertyModel.list.findIndex(property => property.id.toString() === id),
  deleteProperty: propertyIndex => propertyModel.list.splice(propertyIndex, 1),
  updateProperty: (propertyIndex, newPrice) => {
    propertyModel.list[propertyIndex].price = newPrice;
  },
  markPropertySold: (propertyIndex) => {
    propertyModel.list[propertyIndex].status = 'sold';
  },
  list: [],
};

export default propertyModel;
