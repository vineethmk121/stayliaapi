import express from 'express';
import mobileController from '../../controllers/mobile/mobile.controller';
import passport from 'passport';
import upload from '../../libraries/multer';

export const mobileRouter: express.Router = express.Router();
/********* MOBILE AUTH **********/
mobileRouter.post('/signup', mobileController.signup);
mobileRouter.post('/socialSignIn', mobileController.socialSignIn);
mobileRouter.post('/verifyOtp', mobileController.verifyOtp);
mobileRouter.post('/resentOtp', mobileController.resentOtp);
//AUTHORIZATON
// mobileRouter.use(passport.authenticate('mobileUser', { session: false, failureRedirect: '/failure' }));
/********** MOBILE API'S WITH AUTHENTICATION  **********/
mobileRouter.get('/viewProfile/:id', mobileController.viewProfile);
mobileRouter.put('/updateProfile/:id', upload.single('profilePic'), mobileController.updateProfile);
mobileRouter.post('/savePropertyByUser', mobileController.savePropertyByUser);
mobileRouter.delete('/unSavePropertyByUser/:id', mobileController.unSavePropertyByUser);
mobileRouter.get('/listOfSaveProperties', mobileController.listOfSaveProperties);
mobileRouter.post('/addProperty', upload.any(), mobileController.addProperty);
mobileRouter.put('/updateProperty/:id', mobileController.updateProperty);
mobileRouter.get('/viewProperty/:id', mobileController.viewProperty);
mobileRouter.get('/allPropertties', mobileController.getAllProperties);
mobileRouter.delete('/deleteProperty/:id', mobileController.deleteProperty);
mobileRouter.post('/saveAgentByUser', mobileController.saveAgentByUser);
mobileRouter.delete('/unSaveAgentByUser/:id', mobileController.unSaveAgentByUser);
mobileRouter.get('/listOfSaveAgents', mobileController.listOfSaveAgents);
mobileRouter.post('/propertiesWithAmenities', mobileController.propertiesWithAmenities);
mobileRouter.post('/listOfPropertiesAgaintAgent', mobileController.listOfPropertiesAgaintAgent);
mobileRouter.post('/listOfPropertiesAgainstSaleType', mobileController.listOfPropertiesAgainstSaleType);
mobileRouter.post('/filterProperties', mobileController.filterProperties);
mobileRouter.post('/nearByProperties', mobileController.nearByProperties);
mobileRouter.post('/filterPropertiesBilal', mobileController.filterPropertiesBilal);
