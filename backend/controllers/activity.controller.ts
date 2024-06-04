import { type Request, type Response } from 'express';

import { ActivityRepository } from '../repositories';

export const ActivityController = {
  async createUserActivity(req: Request, res: Response) {
    const { userId, gameId, activityType, activityData } = req.body;
    const timestamp = Date.now();

    try {
      await ActivityRepository.createUserActivity(userId, gameId, timestamp, activityType, activityData);
      res.json({ message: 'Activity created successfully' });
    } catch (err) {
      console.error('Error creating activity:', err);
      res.status(500).json({ message: 'Failed to create activity' });
    }
  },
  async getUserActivity(req: Request, res: Response) {
    const { userId, gameId } = req.params;
    try {
      if (!gameId) {
        const activities = await ActivityRepository.getAllActivitiesFromUser(userId);
        res.json(activities);
      } else {
        const activity = await ActivityRepository.getUserActivity(userId, gameId);
        if (activity) {
          res.json(activity);
        } else {
          res.status(404).json({ message: 'Activity not found' });
        }
      }
    } catch (err) {
      console.error('Error getting activity:', err);
      res.status(500).json({ message: 'Failed to retrieve activity' });
    }
  },
  async getAllActivities(_req: Request, res: Response) {
    try {
      const activities = await ActivityRepository.getAllActivities();
      res.json(activities);
    } catch (err) {
      console.error('Error getting activities:', err);
      res.status(500).json({ message: 'Failed to retrieve activities' });
    }
  },
};
