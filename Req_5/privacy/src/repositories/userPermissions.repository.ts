import { dbInstance } from '../db';

interface UserPermission {
  user_id: string;
  item_type: string;
  item_id: string;
  permission_type: string;
  allowed_users: string[];
}

export const createUserPermission = async (permission: UserPermission): Promise<void> => {
  const query = `
    INSERT INTO user_permissions (user_id, item_type, item_id, permission_type, allowed_users)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [permission.user_id, permission.item_type, permission.item_id, permission.permission_type, permission.allowed_users];
  const client = await dbInstance.getInstance();
  await client.execute(query, params, { prepare: true });
};

export const getUserPermissions = async (user_id: string): Promise<UserPermission[]> => {
  const query = 'SELECT * FROM user_permissions WHERE user_id = ?';
  const client = await dbInstance.getInstance();
  const result = await client.execute(query, [user_id], { prepare: true });
  return result.rows as UserPermission[];
};

export async function getAllPermissions() {
  const client = await dbInstance.getInstance();
  const query = 'SELECT * FROM user_permissions;';

  try {
    const result = await client.execute(query);
    return result.rows;
  } catch (err) {
    console.error('Error retrieving permissions:', err);
    return [];
  }
}

export async function deletePermission(user_id: string, item_type: string, item_id: string, permission_type: string) {
  const client = await dbInstance.getInstance();
  const query = `
    DELETE FROM user_permissions
    WHERE user_id = ? AND item_type = ? AND item_id = ? AND permission_type = ?;
  `;
  const params = [user_id, item_type, item_id, permission_type];

  try {
    await client.execute(query, params, { prepare: true });
  } catch (err) {
    console.error('Error deleting permission:', err);
  }
}

export async function checkPermissionExists(user_id: string, item_type: string, item_id: string, permission_type: string): Promise<boolean> {
  const client = await dbInstance.getInstance();
  const query = `
    SELECT COUNT(*) FROM user_permissions
    WHERE user_id = ? AND item_type = ? AND item_id = ? AND permission_type = ?;
  `;
  const params = [user_id, item_type, item_id, permission_type];

  try {
    const result = await client.execute(query, params, { prepare: true });
    return result.rows[0]['count'] > 0;
  } catch (err) {
    console.error('Error checking permission existence:', err);
    return false;
  }
}
