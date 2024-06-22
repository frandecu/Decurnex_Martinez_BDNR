import { Router } from 'express';

import { PermissionsRouter } from './userPermissions.routes';

export const ApiRouter = Router();

ApiRouter.use('/permissions', PermissionsRouter);
ApiRouter.get('/', (_req, res) => {
  res.send('API BDDNR 2024 - Francisco Decurnex, Tomas Martinez');
});
