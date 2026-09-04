import express from 'express';
import { db } from '../database/db.js';
import { authMiddleware } from '../middleware/auth.js';
import { personalizationEngine } from '../services/personalizationEngine.js';

const router = express.Router();

// GET /api/routine/plan
router.get('/plan', authMiddleware, (req, res) => {
  const plan = personalizationEngine.generateDailyPlan(req.user.id);
  res.json({ success: true, plan });
});

// GET /api/routine/screen-time
router.get('/screen-time', authMiddleware, (req, res) => {
  res.json({
    success: true,
    screenTime: {
      productiveMinutes: 52,
      entertainmentMinutes: 28,
      lateNightMinutes: 0,
      breakReminderNotice: "You've been focused for 52 minutes. A short break might help."
    }
  });
});

export default router;
