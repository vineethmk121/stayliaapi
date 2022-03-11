import express from 'express';
import contructionStatusController from '../../controllers/admin/contruction.controller';
import passport from 'passport';

export const contructionStatusRouter: express.Router = express.Router();
contructionStatusRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

contructionStatusRouter.post('/addContructionStatus', contructionStatusController.addContructionStatus);
contructionStatusRouter.put('/updateContructionStatus/:id', contructionStatusController.updateContructionStatus);
contructionStatusRouter.get('/viewContructionStatus/:id', contructionStatusController.viewContructionStatus);
contructionStatusRouter.get('/allContructionStatus', contructionStatusController.getAllContructionStatus);
contructionStatusRouter.delete('/deleteContructionStatus/:id', contructionStatusController.deleteContructionStatus);
