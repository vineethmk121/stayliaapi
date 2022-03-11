import express from 'express';
import furnishingStatusController from '../../controllers/admin/furnishingStatus.controller';
import passport from 'passport';

export const furnishingStatusRouter: express.Router = express.Router();
furnishingStatusRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

furnishingStatusRouter.post('/addFurnishingStatus', furnishingStatusController.addFurnishStatus);
furnishingStatusRouter.put('/updateFurnishingStatus/:id', furnishingStatusController.updateFurnishStatus);
furnishingStatusRouter.get('/viewFurnishingStatus/:id', furnishingStatusController.viewFurnishStatus);
furnishingStatusRouter.get('/allFurnishingStatus', furnishingStatusController.getAllFurnishStatus);
furnishingStatusRouter.delete('/deleteFurnishingStatus/:id', furnishingStatusController.deleteFurnishStatus);
