import express from 'express';
import { mobileRouter } from '../routes/mobile/user.route';
export const apiRouter = express.Router();

apiRouter.use('/users', mobileRouter);
