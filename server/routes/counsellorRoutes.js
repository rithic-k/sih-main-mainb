import express from 'express';
import { db } from '../database/db.js';
import { authMiddleware } from '../middleware/auth.js';
import { counsellorEngine } from '../services/counsellorEngine.js';

const router = express.Router();

// GET /api/counsellor/cohort
router.get('/cohort', authMiddleware, (req, res) => {
  const users = counsellorEngine.getCohortUsers();
  res.json({ success: true, users });
});

// GET /api/counsellor/users/:id
router.get('/users/:id', authMiddleware, (req, res) => {
  const detail = counsellorEngine.getUserDetail(req.params.id);
  if (!detail) return res.status(404).json({ success: false, error: 'User case not found' });
  res.json({ success: true, user: detail });
});

// POST /api/counsellor/users/:id/notes
router.post('/users/:id/notes', authMiddleware, (req, res) => {
  const { text, author } = req.body;
  if (!text) return res.status(400).json({ success: false, error: 'Note text required' });

  const note = counsellorEngine.addClinicalNote(req.params.id, author, text);
  res.json({ success: true, note });
});

// POST /api/counsellor/users/:id/toggle-reviewed
router.post('/users/:id/toggle-reviewed', authMiddleware, (req, res) => {
  const newStatus = counsellorEngine.toggleReviewedStatus(req.params.id);
  res.json({ success: true, isReviewed: newStatus });
});

// POST /api/counsellor/users/:id/schedule
router.post('/users/:id/schedule', authMiddleware, (req, res) => {
  const { dateTime } = req.body;
  db.update('personal_baselines', b => b.userId === req.params.id || b.id === req.params.id, {
    scheduledSession: dateTime
  });
  res.json({ success: true, scheduledSession: dateTime });
});

export default router;
