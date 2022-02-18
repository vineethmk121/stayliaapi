import express from 'express';
import rolesController from '../../controllers/admin/dashboardRole.controller';
import passport from 'passport';

export const roleRouter: express.Router = express.Router();

//userCrudRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

roleRouter.post('/addRole', rolesController.addRole);
// userCrudRouter.post('/updateUser/:id', userCrudController.updateUser);
// userCrudRouter.get('/viewUser/:id', userCrudController.viewUser);
// userCrudRouter.get('/allUsers', userCrudController.getAllUsers);
// userCrudRouter.post('/deleteUSer/:id', userCrudController.deleteUser);
