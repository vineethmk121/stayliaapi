import express from 'express';
import faqController from '../../controllers/admin/FAQ.controller';
import passport from 'passport';

export const faqRouter: express.Router = express.Router();
faqRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

faqRouter.post('/addFaq', faqController.addFaq);
faqRouter.put('/updateFaq/:id', faqController.updateFaq);
faqRouter.get('/viewFaq/:id', faqController.viewFaq);
faqRouter.get('/allFaqs', faqController.getAllFaqs);
faqRouter.delete('/deleteFaq/:id', faqController.deleteFaq);
