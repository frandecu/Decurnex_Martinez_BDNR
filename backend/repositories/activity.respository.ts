import { dbInstance } from '../db';

export const ActivityRepository = {
  async createUserActivity(userId, gameId, timestamp, activityType, activityData) {
    const client = await dbInstance.getInstance();
    const query = `INSERT INTO user_activity (user_id, game_id, timestamp, activity_type, activity_data) VALUES (?, ?, ?, ?, ?)`;
    const boundValues = [userId, gameId, timestamp, activityType, JSON.stringify(activityData)];
    await client.execute(query, boundValues);
  },
  async getUserActivity(userId, gameId) {
    const client = await dbInstance.getInstance();
    const query = `SELECT * FROM user_activity WHERE user_id = ? AND game_id = ?`;
    const result = await client.execute(query, [userId, gameId]);
    return result.rows[0] || null;
  },
  async getAllActivitiesFromUser(userId) {
    const client = await dbInstance.getInstance();
    const query = `SELECT * FROM user_activity WHERE user_id = ?`;
    const result = await client.execute(query, [userId]);
    return result.rows;
  },
  async getAllActivities() {
    const client = await dbInstance.getInstance();
    const query = `SELECT * FROM user_activity`;
    const result = await client.execute(query);
    return result.rows;
  },
};
