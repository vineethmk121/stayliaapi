import express from 'express';
import priceRangeController from '../../controllers/admin/priceRange.controller';
import passport from 'passport';

export const priceRangeRouter: express.Router = express.Router();
priceRangeRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

priceRangeRouter.post('/addPriceRange', priceRangeController.addpriceRange);
priceRangeRouter.put('/updatePriceRange/:id', priceRangeController.updatepriceRange);
priceRangeRouter.get('/viewPriceRange/:id', priceRangeController.viewpriceRange);
priceRangeRouter.get('/allPriceRanges', priceRangeController.getAllpriceRanges);
priceRangeRouter.delete('/deletePriceRange/:id', priceRangeController.deletepriceRange);
