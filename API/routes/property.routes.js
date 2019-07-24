import express from 'express';
import PropertyDBController from '../controllers/propertyDB.controller';
import Authenticate from '../middlewares/authenticate';
import Validate from '../middlewares/validate';
import MapPropOwner from '../middlewares/mapPropOwner';
import ImageHandler from '../middlewares/imageHandler';

import { CloudinaryConfig } from '../utils/cloudinaryConfig';
import { multerUploads } from '../utils/multerConfig';

const { cloudinaryConfig } = CloudinaryConfig;
const { imageHandler } = ImageHandler;
const { auth } = Authenticate;

const {
  createProperty,
  getAllProperties,
  updateProperty,
  markPropertySold,
  getPropertyById,
  deleteProperty,
} = PropertyDBController;
const { checkProperty, checkUpdatePrice, checkIdParam } = Validate;
const { mapPropOwner } = MapPropOwner;

const propertyRouter = express.Router();

propertyRouter.post('/property', auth, multerUploads, checkProperty, cloudinaryConfig, imageHandler, createProperty);
propertyRouter.get('/property', auth, getAllProperties);
propertyRouter.get('/property/:id', auth, checkIdParam, getPropertyById);
propertyRouter.patch('/property/:id', auth, checkIdParam, mapPropOwner, checkUpdatePrice, updateProperty);
propertyRouter.patch('/property/:id/sold', auth, checkIdParam, mapPropOwner, markPropertySold);
propertyRouter.delete('/property/:id', auth, checkIdParam, mapPropOwner, deleteProperty);

export default propertyRouter;
