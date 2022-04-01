import express from 'express';
import propertyController from '../../controllers/admin/property.controller';
import passport from 'passport';
import upload from '../../libraries/multer';
const isLoggedIn = require('../../middlewares/user-roles-middleware.ts');

export const propertyRouter: express.Router = express.Router();
propertyRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

propertyRouter.post('/addProperty', isLoggedIn, upload.any(), propertyController.addProperty);
propertyRouter.put('/updateProperty/:id', isLoggedIn, propertyController.updateProperty);
propertyRouter.get('/viewProperty/:id', isLoggedIn, propertyController.viewProperty);
propertyRouter.get('/allPropertties', isLoggedIn, propertyController.getAllProperties);
propertyRouter.delete('/deleteProperty/:id', isLoggedIn, propertyController.deleteProperty);
