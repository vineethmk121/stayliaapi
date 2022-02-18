import express from 'express';
import { adminRouter } from './admin';
import { apiRouter } from './api';

export const restRouter = express.Router();
restRouter.use('/admin', adminRouter);
restRouter.use('/api', apiRouter);
