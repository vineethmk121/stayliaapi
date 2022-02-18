import express from 'express';
import propertyTypeController from '../../controllers/admin/propertyType.controller';
import passport from 'passport';

export const propertyTypeRouter: express.Router = express.Router();
propertyTypeRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

propertyTypeRouter.post('/addPropertyType', propertyTypeController.addPropertyType);
propertyTypeRouter.put('/updatePropertyType/:id', propertyTypeController.updatePropertyType);
propertyTypeRouter.get('/viewPropertyType/:id', propertyTypeController.viewPropertyType);
propertyTypeRouter.get('/allPropertyTypes', propertyTypeController.getAllPropertyTypes);
propertyTypeRouter.delete('/deletePropertyType/:id', propertyTypeController.deletePropertyType);
