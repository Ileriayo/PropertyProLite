const propertyModel = {
  addProperty: property => propertyModel.list.push(property),
  getAllProperties: () => propertyModel.list,
  getPropertyById: id => propertyModel.list.find(property => property.id.toString() === id),
  findPropertyIndex: id => propertyModel.list.findIndex(property => property.id.toString() === id),
  deletePropertyById: propertyIndex => propertyModel.list.splice(propertyIndex, 1),
  list: [],
};

export default propertyModel;
