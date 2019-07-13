import express from 'express';
import PropertyController from '../controllers/property.controller';
import Authenticate from '../middlewares/authenticate';
import Validate from '../middlewares/validate';
import FindPropertyIndex from '../middlewares/findProperty';
import MapPropOwner from '../middlewares/mapPropOwner';

const { auth } = Authenticate;
const {
  createProperty, getAllProperties, getPropertyById, deletePropertyById,
} = PropertyController;
const { checkProperty } = Validate;
const { findPropertyIndex } = FindPropertyIndex;
const { mapPropOwner } = MapPropOwner;

const propertyRouter = express.Router();

propertyRouter.post('/property', auth, checkProperty, createProperty);
propertyRouter.get('/property', auth, getAllProperties);
propertyRouter.get('/property/:id', auth, getPropertyById);
propertyRouter.delete('/property/:id', auth, mapPropOwner, findPropertyIndex, deletePropertyById);

export default propertyRouter;
