const propertyModel = {
  addProperty: property => propertyModel.list.push(property),
  getAllProperties: () => propertyModel.list,
  list: [],
};

export default propertyModel;
