import express from 'express';
import additionalInfoController from '../../controllers/admin/additionalInfo.controller';
import passport from 'passport';
const isLoggedIn = require('../../middlewares/user-roles-middleware.ts');

export const addInfoRouter: express.Router = express.Router();
addInfoRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

addInfoRouter.post('/addInfo', isLoggedIn, additionalInfoController.addInfo);
addInfoRouter.put('/updateAddInfo/:id', isLoggedIn, additionalInfoController.updateAddInfo);
addInfoRouter.get('/viewAddInfo/:id', isLoggedIn, additionalInfoController.viewAddInfo);
addInfoRouter.get('/allAddInfo', isLoggedIn, additionalInfoController.getAllAddInfo);
addInfoRouter.delete('/deleteAddInfo/:id', isLoggedIn, additionalInfoController.deleteAddInfo);
