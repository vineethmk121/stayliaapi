import express from 'express';
import propertyController from '../../controllers/admin/property.controller';
import passport from 'passport';
import upload from '../../libraries/multer';

export const propertyRouter: express.Router = express.Router();
propertyRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

propertyRouter.post('/addProperty', upload.any(), propertyController.addProperty);
propertyRouter.put('/updateProperty/:id', propertyController.updateProperty);
propertyRouter.get('/viewProperty/:id', propertyController.viewProperty);
propertyRouter.get('/allPropertties', propertyController.getAllProperties);
propertyRouter.delete('/deleteProperty/:id', propertyController.deleteProperty);
