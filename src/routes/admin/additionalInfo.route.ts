import express from 'express';
import additionalInfoController from '../../controllers/admin/additionalInfo.controller';
import passport from 'passport';

export const addInfoRouter: express.Router = express.Router();
addInfoRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

addInfoRouter.post('/addInfo', additionalInfoController.addInfo);
addInfoRouter.put('/updateAddInfo/:id', additionalInfoController.updateAddInfo);
addInfoRouter.get('/viewAddInfo/:id', additionalInfoController.viewAddInfo);
addInfoRouter.get('/allAddInfo', additionalInfoController.getAllAddInfo);
addInfoRouter.delete('/deleteAddInfo/:id', additionalInfoController.deleteAddInfo);
