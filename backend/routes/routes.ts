import { Router } from 'express';

import { ActivityRouter } from './activity.routes';

export const ApiRouter = Router();

ApiRouter.use('/activities', ActivityRouter);
ApiRouter.get('/', (_req, res) => {
  res.send('API BDDNR 2024 - Francisco Decurnex, Tomas Martinez');
});
