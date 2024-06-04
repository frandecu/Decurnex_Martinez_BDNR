const express = require("express");
const models = require("./models");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/user-activity", async (req, res) => {
  const { userId, gameId, activityType, activityData } = req.body;
  const timestamp = Date.now();

  try {
    await models.createUserActivity(
      userId,
      gameId,
      timestamp,
      activityType,
      activityData
    );
    res.json({ message: "Activity created successfully" });
  } catch (err) {
    console.error("Error creating activity:", err);
    res.status(500).json({ message: "Failed to create activity" });
  }
});

app.get("/user-activity/:userId/:gameId", async (req, res) => {
  const { userId, gameId } = req.params;
  try {
    const activity = await models.getUserActivity(userId, gameId);
    if (activity) {
      res.json(activity);
    } else {
      res.status(404).json({ message: "Activity not found" });
    }
  } catch (err) {
    console.error("Error getting activity:", err);
    res.status(500).json({ message: "Failed to retrieve activity" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
