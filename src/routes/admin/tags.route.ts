import express from 'express';
import tagsController from '../../controllers/admin/tags.contoller';
import passport from 'passport';

export const tagsRouter: express.Router = express.Router();
//tagsRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

tagsRouter.post('/addTag', tagsController.addTag);
tagsRouter.put('/updateTag/:id', tagsController.updateTag);
tagsRouter.get('/viewTag/:id', tagsController.viewTag);
tagsRouter.get('/allTags', tagsController.getAllTags);
tagsRouter.delete('/deleteTag/:id', tagsController.deleteTag);
