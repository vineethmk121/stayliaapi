import express from 'express';
import areaRangeController from '../../controllers/admin/areaRange.controller';
import passport from 'passport';

export const areaRangeRouter: express.Router = express.Router();
areaRangeRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

areaRangeRouter.post('/addAreaRange', areaRangeController.addAreaRange);
areaRangeRouter.put('/updateAreaRange/:id', areaRangeController.updateAreaRange);
areaRangeRouter.get('/viewAreaRange/:id', areaRangeController.viewAreaRange);
areaRangeRouter.get('/allAreaRanges', areaRangeController.getAllAreaRanges);
areaRangeRouter.delete('/deleteAreaRange/:id', areaRangeController.deleteAreaRange);
