import express from 'express';
import userController from '../../controllers/admin/user.controller';
import passport from 'passport';
import upload from '../../libraries/multer';
const isLoggedIn = require('../../middlewares/user-roles-middleware.ts');

export const userRouter: express.Router = express.Router();

userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.apiLogin);
userRouter.post('/forgotPassword', userController.forgotPassword);
userRouter.get('/verifyEmail', userController.verifyEmail);

userRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));
userRouter.post('/changePassword', userController.changePassword);
userRouter.post('/addUser', isLoggedIn, upload.single('profilePic'), userController.addUser);
userRouter.put('/updateUser/:id', isLoggedIn, upload.single('profilePic'), userController.updateUser);
userRouter.get('/viewUser/:id', isLoggedIn, userController.viewUser);
userRouter.get('/allUsers', isLoggedIn, userController.getAllUsers);
userRouter.delete('/deleteUser/:id', isLoggedIn, userController.deleteUser);
