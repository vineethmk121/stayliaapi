import express from 'express';
import bedRoomTypeController from '../../controllers/admin/bedRoomType.controller';
import passport from 'passport';

export const bedRoomTypeRouter: express.Router = express.Router();
bedRoomTypeRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

bedRoomTypeRouter.post('/addBedRoomType', bedRoomTypeController.addBedRoomType);
bedRoomTypeRouter.put('/updateBedRoomType/:id', bedRoomTypeController.updateBedRoomType);
bedRoomTypeRouter.get('/viewBedRoomType/:id', bedRoomTypeController.viewBedRoomType);
bedRoomTypeRouter.get('/allBedRoomType', bedRoomTypeController.getAllBedRoomTypes);
bedRoomTypeRouter.delete('/deleteBedRoomType/:id', bedRoomTypeController.deleteBedRoomType);
