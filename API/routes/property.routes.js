import express from 'express';
import PropertyController from '../controllers/property.controller';
import Authenticate from '../middlewares/authenticate';
import Validate from '../middlewares/validate';

const { auth } = Authenticate;
const { createProperty, getAllProperties } = PropertyController;
const { checkProperty } = Validate;

const propertyRouter = express.Router();

propertyRouter.post('/property', auth, checkProperty, createProperty);
propertyRouter.get('/property', auth, getAllProperties);

export default propertyRouter;
