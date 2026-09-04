import express from 'express';
import { db } from '../database/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/privacy/settings
router.get('/settings', authMiddleware, (req, res) => {
  const settings = db.findOne('consent_settings', s => s.userId === req.user.id) || {
    wellbeingAnalysis: true,
    counsellorSupport: true,
    voiceJournaling: true,
    familyVisibility: false,
    locationPermission: false
  };
  res.json({ success: true, settings });
});

// PATCH /api/privacy/settings
router.patch('/settings', authMiddleware, (req, res) => {
  const updates = req.body;
  const existing = db.findOne('consent_settings', s => s.userId === req.user.id);
  if (existing) {
    db.update('consent_settings', s => s.userId === req.user.id, updates);
  } else {
    db.insert('consent_settings', { userId: req.user.id, ...updates });
  }
  res.json({ success: true, settings: { ...existing, ...updates } });
});

// GET /api/privacy/export
router.get('/export', authMiddleware, (req, res) => {
  const user = db.findOne('users', u => u.id === req.user.id);
  const goals = db.find('goals', g => g.userId === req.user.id);
  const journals = db.find('journal_entries', j => j.userId === req.user.id);
  const games = db.find('game_sessions', s => s.userId === req.user.id);

  const archive = {
    user,
    goals,
    journals,
    games,
    exportedAt: new Date().toISOString(),
    format: 'SEERA Personal Growth Archive (JSON)',
    statement: 'You are more than your data.'
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename=SEERA_Archive_${user?.displayName || 'User'}.json`);
  res.send(JSON.stringify(archive, null, 2));
});

// DELETE /api/privacy/account
router.delete('/account', authMiddleware, (req, res) => {
  const userId = req.user.id;
  db.delete('users', u => u.id === userId);
  db.delete('profiles', p => p.userId === userId);
  db.delete('goals', g => g.userId === userId);
  db.delete('journal_entries', j => j.userId === userId);
  db.delete('game_sessions', s => s.userId === userId);
  db.delete('consent_settings', c => c.userId === userId);

  res.json({ success: true, message: 'All personal user data permanently deleted from local database.' });
});

export default router;
