import express from 'express';
import nationalitiesController from '../../controllers/admin/nationalities.controller';
import passport from 'passport';
const isLoggedIn = require('../../middlewares/user-roles-middleware.ts');

export const nationalitiesRouter: express.Router = express.Router();
nationalitiesRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

nationalitiesRouter.post('/addNationality', isLoggedIn, nationalitiesController.addNationalities);
nationalitiesRouter.put('/updateNationality/:id', isLoggedIn, nationalitiesController.updateNationalities);
nationalitiesRouter.get('/viewNationality/:id', isLoggedIn, nationalitiesController.viewNationalities);
nationalitiesRouter.get('/allNationality', isLoggedIn, nationalitiesController.getAllNationalities);
nationalitiesRouter.delete('/deleteNationality/:id', isLoggedIn, nationalitiesController.deleteNationalities);
