import express from 'express';
import amenitiesController from '../../controllers/admin/amenities.controller';
import passport from 'passport';
const isLoggedIn = require('../../middlewares/user-roles-middleware.ts');
import upload from '../../libraries/multer';

export const amenityRouter: express.Router = express.Router();
amenityRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

amenityRouter.post('/addAmenity', isLoggedIn, upload.single('amenitiesIcon'), amenitiesController.addAmenity);
amenityRouter.put('/updateAmenity/:id', isLoggedIn, amenitiesController.updateAmenity);
amenityRouter.get('/viewAmenity/:id', isLoggedIn, amenitiesController.viewAmenity);
amenityRouter.get('/allAmenity', isLoggedIn, amenitiesController.getAllAmenities);
amenityRouter.delete('/deleteAmenity/:id', isLoggedIn, amenitiesController.deleteAmenity);
