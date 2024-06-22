import { Router } from 'express';
import {
  addUserPermission,
  deletePermissionHandler,
  getAllPermissionsHandler,
  getUserPermissionsByUserId,
} from '../controllers/userPermissions.controller';

const PermissionsRouter = Router();

PermissionsRouter.post('/', addUserPermission);
PermissionsRouter.get('/:user_id', getUserPermissionsByUserId);
PermissionsRouter.get('/', getAllPermissionsHandler);
PermissionsRouter.delete('/:user_id/:item_type/:item_id/:permission_type', deletePermissionHandler);

export { PermissionsRouter };
