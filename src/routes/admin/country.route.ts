import express from 'express';
import countryController from '../../controllers/admin/country.controller';
import passport from 'passport';

export const countryRouter: express.Router = express.Router();
// countryRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

countryRouter.post('/addCountry', countryController.addCountry);
countryRouter.put('/updateCountry/:id', countryController.updateCountry);
countryRouter.get('/viewCountry/:id', countryController.viewCountry);
countryRouter.get('/allCountry', countryController.getAllCountries);
countryRouter.delete('/deleteCountry/:id', countryController.deleteCountry);
