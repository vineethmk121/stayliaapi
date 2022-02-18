import express from 'express';
import termsAndConditionController from '../../controllers/admin/terms&Condition.contoller';
import passport from 'passport';

export const termsAndConditionRouter: express.Router = express.Router();
termsAndConditionRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

termsAndConditionRouter.post('/addTermsAndCondition', termsAndConditionController.addTermsAndCondition);
termsAndConditionRouter.put('/updateTermsAndCondition/:id', termsAndConditionController.updateTermsAndCondition);
termsAndConditionRouter.get('/viewTermsAndCondition/:id', termsAndConditionController.viewTermsAndCondition);
termsAndConditionRouter.get('/allTermsAndCondition', termsAndConditionController.getAllTermsAndConditions);
termsAndConditionRouter.delete('/deleteTermsAndCondition/:id', termsAndConditionController.deleteTermsAndCondition);
