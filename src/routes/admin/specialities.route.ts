import express from 'express';
import specialitiesController from '../../controllers/admin/specialities.controller';
import passport from 'passport';
import upload from '../../libraries/multer';

export const specialitiesRouter: express.Router = express.Router();
specialitiesRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

specialitiesRouter.post('/addspecialities', upload.single('specialtyIcon'), specialitiesController.addSpecialities);
specialitiesRouter.put('/updatespecialities/:id', specialitiesController.updateSpecialities);
specialitiesRouter.get('/viewspecialities/:id', specialitiesController.viewSpecialities);
specialitiesRouter.get('/allspecialities', specialitiesController.getAllSpecialities);
specialitiesRouter.delete('/deletespecialities/:id', specialitiesController.deleteSpecialities);
