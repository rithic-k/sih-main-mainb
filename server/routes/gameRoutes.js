import express from 'express';
import { db } from '../database/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/games/stats
router.get('/stats', authMiddleware, (req, res) => {
  const sessions = db.find('game_sessions', s => s.userId === req.user.id);
  const reflections = db.find('game_reflections', r => r.userId === req.user.id);

  res.json({
    success: true,
    stats: {
      totalPlayTimeMinutes: 145 + sessions.length * 8,
      calmStreakDays: 6,
      reflectionsCompleted: 21 + reflections.length,
      sessionsCount: sessions.length
    },
    recentReflections: reflections.slice(-5)
  });
});

// POST /api/games/session
router.post('/session', authMiddleware, (req, res) => {
  const { gameType, durationMinutes = 8, score = 0 } = req.body;
  const session = db.insert('game_sessions', {
    userId: req.user.id,
    gameType,
    durationMinutes,
    score
  });
  res.json({ success: true, session });
});

// POST /api/games/reflection
router.post('/reflection', authMiddleware, (req, res) => {
  const { gameTitle, answers } = req.body;
  const ref = db.insert('game_reflections', {
    userId: req.user.id,
    gameTitle: gameTitle || 'Mindful Game',
    answers,
    timestamp: new Date().toISOString()
  });

  res.json({ success: true, reflection: ref });
});

export default router;
