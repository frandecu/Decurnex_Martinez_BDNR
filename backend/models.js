const client = require("./db");

async function createUserActivity(
  userId,
  gameId,
  timestamp,
  activityType,
  activityData
) {
  const query = `INSERT INTO user_activity (user_id, game_id, timestamp, activity_type, activity_data) VALUES (?, ?, ?, ?, ?)`;
  const boundValues = [
    userId,
    gameId,
    timestamp,
    activityType,
    JSON.stringify(activityData),
  ];
  await client.execute(query, boundValues);
}

async function getUserActivity(userId, gameId) {
  const query = `SELECT * FROM user_activity WHERE user_id = ? AND game_id = ?`;
  const result = await client.execute(query, [userId, gameId]);
  return result.rows[0] || null; // Return first row or null if not found
}

module.exports = { createUserActivity, getUserActivity };
