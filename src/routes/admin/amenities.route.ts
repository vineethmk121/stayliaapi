import express from 'express';
import amenitiesController from '../../controllers/admin/amenities.controller';
import passport from 'passport';

export const amenityRouter: express.Router = express.Router();
amenityRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

amenityRouter.post('/addAmenity', amenitiesController.addAmenity);
amenityRouter.put('/updateAmenity/:id', amenitiesController.updateAmenity);
amenityRouter.get('/viewAmenity/:id', amenitiesController.viewAmenity);
amenityRouter.get('/allAmenity', amenitiesController.getAllAmenities);
amenityRouter.delete('/deleteAmenity/:id', amenitiesController.deleteAmenity);
