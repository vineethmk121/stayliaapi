import express from 'express';
import nationalitiesController from '../../controllers/admin/nationalities.controller';
import passport from 'passport';

export const nationalitiesRouter: express.Router = express.Router();
nationalitiesRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

nationalitiesRouter.post('/addNationality', nationalitiesController.addNationalities);
nationalitiesRouter.put('/updateNationality/:id', nationalitiesController.updateNationalities);
nationalitiesRouter.get('/viewNationality/:id', nationalitiesController.viewNationalities);
nationalitiesRouter.get('/allNationality', nationalitiesController.getAllNationalities);
nationalitiesRouter.delete('/deleteNationality/:id', nationalitiesController.deleteNationalities);
