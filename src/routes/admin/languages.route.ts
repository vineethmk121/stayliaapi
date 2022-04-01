import express from 'express';
import languagesController from '../../controllers/admin/languages.controller';
import passport from 'passport';
const isLoggedIn = require('../../middlewares/user-roles-middleware.ts');

export const languagesRouter: express.Router = express.Router();
languagesRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

languagesRouter.post('/addlanguages', isLoggedIn, languagesController.addLanguages);
languagesRouter.put('/updatelanguages/:id', isLoggedIn, languagesController.updateLanguages);
languagesRouter.get('/viewlanguages/:id', isLoggedIn, languagesController.viewLanguages);
languagesRouter.get('/alllanguages', isLoggedIn, languagesController.getAllLanguages);
languagesRouter.delete('/deletelanguages/:id', isLoggedIn, languagesController.deleteLanguages);
