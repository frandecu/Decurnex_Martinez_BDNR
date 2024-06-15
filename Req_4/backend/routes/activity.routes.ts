import { Router } from 'express';

import { ActivityController } from '../controllers/activity.controller';
import { tryCatchWrapper } from '../middlewares';

export const ActivityRouter = Router();

ActivityRouter.post('/', tryCatchWrapper(ActivityController.createUserActivity));
ActivityRouter.get('/:userId/:gameId', tryCatchWrapper(ActivityController.getUserActivity));
ActivityRouter.get('/', tryCatchWrapper(ActivityController.getAllActivities));
