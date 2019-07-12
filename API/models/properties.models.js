const propertyModel = {
  addProperty: property => propertyModel.list.push(property),
  getAllProperties: () => propertyModel.list,
  getPropertyById: id => propertyModel.list.find(property => property.id.toString() === id),
  list: [],
};

export default propertyModel;
