import express from 'express';
import overViewController from '../../controllers/admin/overView.contoller';
import passport from 'passport';

export const overViewRouter: express.Router = express.Router();
overViewRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

overViewRouter.post('/addOverView', overViewController.addOverView);
overViewRouter.put('/updateOverView/:id', overViewController.updateOverView);
overViewRouter.get('/viewOverView/:id', overViewController.viewOverView);
overViewRouter.get('/allOverViews', overViewController.getAllOverViews);
overViewRouter.delete('/deleteOverView/:id', overViewController.deleteOverView);
