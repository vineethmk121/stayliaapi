import express from 'express';
import languagesController from '../../controllers/admin/languages.controller';
import passport from 'passport';

export const languagesRouter: express.Router = express.Router();
languagesRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

languagesRouter.post('/addlanguages', languagesController.addLanguages);
languagesRouter.put('/updatelanguages/:id', languagesController.updateLanguages);
languagesRouter.get('/viewlanguages/:id', languagesController.viewLanguages);
languagesRouter.get('/alllanguages', languagesController.getAllLanguages);
languagesRouter.delete('/deletelanguages/:id', languagesController.deleteLanguages);
