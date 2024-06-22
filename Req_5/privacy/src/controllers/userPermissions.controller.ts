import { Request, Response } from 'express';
import {
  checkPermissionExists,
  createUserPermission,
  deletePermission,
  getAllPermissions,
  getUserPermissions,
} from '../repositories/userPermissions.repository';

export const addUserPermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const permission = req.body;
    const exists = await checkPermissionExists(permission.user_id, permission.item_type, permission.item_id, permission.permission_type);
    if (exists) {
      res.status(400).send('Permission already exists');
      return;
    }

    await createUserPermission(permission);
    res.status(201).send('Permission added');
  } catch (err) {
    console.error('Error adding permission:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const getUserPermissionsByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id } = req.params;
    const permissions = await getUserPermissions(user_id);
    res.status(200).json(permissions);
  } catch (err) {
    console.error('Error fetching permissions:', err);
    res.status(500).send('Internal Server Error');
  }
};

export async function getAllPermissionsHandler(req: Request, res: Response) {
  try {
    const permissions = await getAllPermissions();
    res.status(200).json(permissions);
  } catch (err) {
    res.status(500).send('Error retrieving permissions');
  }
}

export async function deletePermissionHandler(req: Request, res: Response) {
  const { user_id, item_type, item_id, permission_type } = req.params;

  try {
    await deletePermission(user_id, item_type, item_id, permission_type);
    res.status(200).send('Permission deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting permission');
  }
}
