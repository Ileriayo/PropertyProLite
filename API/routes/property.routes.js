import express from 'express';
import PropertyController from '../controllers/property.controller';
import Authenticate from '../middlewares/authenticate';
import Validate from '../middlewares/validate';
import FindPropertyIndex from '../middlewares/findProperty';
import MapPropOwner from '../middlewares/mapPropOwner';

const { auth } = Authenticate;
const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  markPropertySold,
} = PropertyController;
const { checkProperty, checkUpdatePrice, checkIdParam } = Validate;
const { findPropertyIndex } = FindPropertyIndex;
const { mapPropOwner } = MapPropOwner;

const propertyRouter = express.Router();

propertyRouter.post('/property', auth, checkProperty, createProperty);
propertyRouter.get('/property', auth, getAllProperties);
propertyRouter.get('/property/:id', auth, getPropertyById);
propertyRouter.patch('/property/:id', auth, checkIdParam, mapPropOwner, checkUpdatePrice, updateProperty);
propertyRouter.patch('/property/:id/sold', auth, checkIdParam, mapPropOwner, markPropertySold);
propertyRouter.delete('/property/:id', auth, mapPropOwner, findPropertyIndex, deleteProperty);

export default propertyRouter;