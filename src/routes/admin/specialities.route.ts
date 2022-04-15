import express from 'express';
import specialitiesController from '../../controllers/admin/specialities.controller';
import passport from 'passport';
import upload from '../../libraries/multer';

export const specialitiesRouter: express.Router = express.Router();
specialitiesRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

specialitiesRouter.post('/addspecialities', upload.single('specialtyIcon'), specialitiesController.addSpecialities);
specialitiesRouter.post('/updatespecialities/:id', upload.single('specialtyIcon'), specialitiesController.updateSpecialities);
specialitiesRouter.get('/viewspecialities/:id', specialitiesController.viewSpecialities);
specialitiesRouter.get('/allSpecialities', specialitiesController.getAllSpecialities);
specialitiesRouter.delete('/deletespecialities/:id', specialitiesController.deleteSpecialities);
