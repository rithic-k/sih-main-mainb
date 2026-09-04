import express from 'express';
import { db } from '../database/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/goals
router.get('/', authMiddleware, (req, res) => {
  const goals = db.find('goals', g => g.userId === req.user.id || g.userId === 'user-moonlight27');
  const goalsWithMilestones = goals.map(g => {
    const milestones = db.find('goal_milestones', m => m.goalId === g.id);
    return { ...g, milestones };
  });

  res.json({ success: true, goals: goalsWithMilestones });
});

// POST /api/goals
router.post('/', authMiddleware, (req, res) => {
  const { title, category, categoryLabel, deadline, frequency, notes, milestones } = req.body;
  if (!title) return res.status(400).json({ success: false, error: 'Goal title required' });

  const newGoal = db.insert('goals', {
    userId: req.user.id,
    title,
    category: category || 'career',
    categoryLabel: categoryLabel || 'Career & VLSI',
    deadline: deadline || '2026-10-31',
    frequency: frequency || '3 times / week',
    status: 'active',
    color: 'emerald',
    notes: notes || ''
  });

  const createdMilestones = (milestones || []).map((m, idx) => {
    return db.insert('goal_milestones', {
      goalId: newGoal.id,
      title: typeof m === 'string' ? m : m.title,
      completed: false,
      completedAt: null
    });
  });

  res.json({ success: true, goal: { ...newGoal, milestones: createdMilestones } });
});

// PATCH /api/goals/:goalId/milestones/:milestoneId
router.patch('/:goalId/milestones/:milestoneId', authMiddleware, (req, res) => {
  const { milestoneId } = req.params;
  const milestone = db.findOne('goal_milestones', m => m.id === milestoneId);
  if (!milestone) return res.status(404).json({ success: false, error: 'Milestone not found' });

  const nextState = !milestone.completed;
  db.update('goal_milestones', m => m.id === milestoneId, {
    completed: nextState,
    completedAt: nextState ? new Date().toISOString().split('T')[0] : null
  });

  res.json({ success: true, completed: nextState });
});

// PATCH /api/goals/:goalId/status
router.patch('/:goalId/status', authMiddleware, (req, res) => {
  const { goalId } = req.params;
  const { status } = req.body;
  db.update('goals', g => g.id === goalId, { status });
  res.json({ success: true, status });
});

export default router;
