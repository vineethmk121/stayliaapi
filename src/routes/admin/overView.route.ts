import express from 'express';
import overViewController from '../../controllers/admin/overView.contoller';
import passport from 'passport';
import upload from '../../libraries/multer';

export const overViewRouter: express.Router = express.Router();
overViewRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

overViewRouter.post('/addOverView', upload.single('overViewIcon'), overViewController.addOverView);
overViewRouter.post('/updateOverView/:id', upload.single('overViewIcon'), overViewController.updateOverView);
overViewRouter.get('/viewOverView/:id', overViewController.viewOverView);
overViewRouter.get('/allOverViews', overViewController.getAllOverViews);
overViewRouter.delete('/deleteOverView/:id', overViewController.deleteOverView);
