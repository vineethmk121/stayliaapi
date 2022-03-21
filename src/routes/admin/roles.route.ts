import express from 'express';
import rolesController from '../../controllers/admin/roles.controller';
import passport from 'passport';

export const roleRouter: express.Router = express.Router();

// roleRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

roleRouter.post('/addRole', rolesController.addRole);
roleRouter.post('/updateRole/:id', rolesController.updateRole);
roleRouter.get('/viewURole/:id', rolesController.viewRole);
roleRouter.get('/allRoles', rolesController.getAllRoles);
roleRouter.post('/deleteRole/:id', rolesController.deleteRole);
