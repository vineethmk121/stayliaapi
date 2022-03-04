import express from 'express';
import chatController from '../../controllers/admin/chat.controller';
import passport from 'passport';

export const chatRouter: express.Router = express.Router();
chatRouter.use(passport.authenticate('adminUser', { session: false, failureRedirect: '/failure' }));

chatRouter.post('/allMessages', chatController.getAllMessage);
chatRouter.post('/getConversation', chatController.getConversation);
chatRouter.post('/sendMessages', chatController.sendMsg);
chatRouter.post('/messageCounter', chatController.messageCounter);
