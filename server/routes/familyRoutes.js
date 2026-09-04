import express from 'express';
import { db } from '../database/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/family/overview
router.get('/overview', authMiddleware, (req, res) => {
  res.json({
    success: true,
    youngUser: {
      code: 'Student #D442',
      nameTag: 'Young User (Age 16)',
      activeGoals: 'High School Lab Exam Prep & Botanical Ink Art',
      goalProgress: 72,
      weeklyActivityHours: 8.4,
      hobbyEngagement: 'Consistent (3+ hrs weekly sketching & music)',
      overallTrend: 'Steady balance with slight exam season compression'
    },
    contextualFactors: [
      { label: 'Academic & Exam Pressure', level: 'Moderate', desc: 'Mid-term practicals in physics and computer science.', color: 'text-amber-800 bg-amber-50 border-amber-200' },
      { label: 'Family Communication Rhythm', level: 'Open & Warm', desc: 'Regular shared dinners and encouragement.', color: 'text-emerald-800 bg-emerald-50 border-emerald-200' },
      { label: 'Social Connection & Peers', level: 'Healthy', desc: 'Collaborates on weekend design and coding projects.', color: 'text-blue-800 bg-blue-50 border-blue-200' },
      { label: 'Rest & Home Environment', level: 'Supportive', desc: 'Quiet workspace provided with reasonable screen curfews.', color: 'text-sage-800 bg-sage-50 border-sage-200' }
    ]
  });
});

export default router;
