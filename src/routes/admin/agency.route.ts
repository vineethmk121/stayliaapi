import express from 'express';
import agencyController from '../../controllers/admin/agency.controller';
import passport from 'passport';

export const agencyRouter: express.Router = express.Router();
agencyRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

agencyRouter.post('/addAgency', agencyController.addagency);
agencyRouter.put('/updateAgency/:id', agencyController.updateagency);
agencyRouter.get('/viewAgency/:id', agencyController.viewagency);
agencyRouter.get('/allAgency', agencyController.getAllagencys);
agencyRouter.delete('/deleteAgency/:id', agencyController.deleteagency);
