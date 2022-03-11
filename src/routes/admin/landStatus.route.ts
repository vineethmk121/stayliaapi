import express from 'express';
import landStatusController from '../../controllers/admin/landStatus.contoller';
import passport from 'passport';

export const landStatusRouter: express.Router = express.Router();
landStatusRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

landStatusRouter.post('/addLandStatus', landStatusController.addLandStatus);
landStatusRouter.put('/updateLandStatus/:id', landStatusController.updateLandStatus);
landStatusRouter.get('/viewLandStatus/:id', landStatusController.viewLandStatus);
landStatusRouter.get('/allLandStatus', landStatusController.getAllLandStatus);
landStatusRouter.delete('/deleteLandStatus/:id', landStatusController.deleteLandStatus);
