import express from 'express';
import furnishingTypeController from '../../controllers/admin/furnishingType.controller';
import passport from 'passport';

export const furnishingTypeRouter: express.Router = express.Router();
furnishingTypeRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

furnishingTypeRouter.post('/addFurnishType', furnishingTypeController.addFurnishType);
furnishingTypeRouter.put('/updateFurnishType/:id', furnishingTypeController.updateFurnishType);
furnishingTypeRouter.get('/viewFurnishType/:id', furnishingTypeController.viewFurnishType);
furnishingTypeRouter.get('/allFurnishTypes', furnishingTypeController.getAllFurnishTypes);
furnishingTypeRouter.delete('/deleteFurnishType/:id', furnishingTypeController.deleteFurnishType);
