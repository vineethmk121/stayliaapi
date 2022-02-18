import express from 'express';
import userController from '../../controllers/mobile/user.controller';
import passport from 'passport';

export const mobileRouter: express.Router = express.Router();

mobileRouter.post('/signup', userController.signup);
mobileRouter.post('/verifyOtp', userController.verifyOtp);
