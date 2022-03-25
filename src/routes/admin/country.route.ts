import express from 'express';
import countryController from '../../controllers/admin/country.controller';
import passport from 'passport';
const isLoggedIn = require('../../middlewares/user-roles-middleware.ts');

export const countryRouter: express.Router = express.Router();
countryRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

countryRouter.post('/addCountry', isLoggedIn, countryController.addCountry);
countryRouter.put('/updateCountry/:id', isLoggedIn, countryController.updateCountry);
countryRouter.get('/viewCountry/:id', isLoggedIn, countryController.viewCountry);
countryRouter.get('/allCountry', isLoggedIn, countryController.getAllCountries);
countryRouter.delete('/deleteCountry/:id', isLoggedIn, countryController.deleteCountry);
