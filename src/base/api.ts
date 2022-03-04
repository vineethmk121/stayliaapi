import express from 'express';
import { mobileRouter } from '../routes/mobile/mobile.route';
export const apiRouter = express.Router();

apiRouter.use('/mobile', mobileRouter);
