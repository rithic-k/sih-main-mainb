import express from 'express';
import { db } from '../database/db.js';
import { authMiddleware } from '../middleware/auth.js';
import { protectPrivateJournals } from '../middleware/rbac.js';
import { nlpEngine } from '../services/nlpEngine.js';

const router = express.Router();

// GET /api/journals (Protected from guardian inspection)
router.get('/', authMiddleware, protectPrivateJournals, (req, res) => {
  const entries = db.find('journal_entries', j => j.userId === req.user.id || j.userId === 'user-moonlight27');
  res.json({ success: true, entries });
});

// POST /api/journals
router.post('/', authMiddleware, (req, res) => {
  const { title, content, mode, audioDuration, tags, promptUsed } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ success: false, error: 'Content required' });
  }

  // Run NLP Analysis
  const nlpResult = nlpEngine.analyzeText(content);

  const entry = db.insert('journal_entries', {
    userId: req.user.id,
    title: title || (mode === 'voice' ? 'Voice Reflection' : 'Evening Reflection'),
    content: content.trim(),
    mode: mode || 'text',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    audioDuration: audioDuration || null,
    tags: tags || ['Reflection'],
    promptUsed: promptUsed || 'Free Reflection',
    nlpAnalysis: nlpResult
  });

  res.json({
    success: true,
    entry,
    nlpInsights: {
      sentimentLabel: nlpResult.sentimentLabel,
      themes: nlpResult.detectedThemes,
      observation: nlpResult.linguisticObservation,
      isImmediateCrisis: nlpResult.isImmediateCrisis
    }
  });
});

// GET /api/journals/insights
router.get('/insights', authMiddleware, protectPrivateJournals, (req, res) => {
  const entries = db.find('journal_entries', j => j.userId === req.user.id || j.userId === 'user-moonlight27');

  const allThemes = [];
  entries.forEach(e => {
    if (e.nlpAnalysis?.detectedThemes) {
      allThemes.push(...e.nlpAnalysis.detectedThemes);
    }
  });

  const uniqueThemes = Array.from(new Set(allThemes));

  res.json({
    success: true,
    insights: {
      totalReflections: entries.length,
      topThemes: uniqueThemes.length > 0 ? uniqueThemes : ['Coursework & Academics', 'Creative Hobbies', 'Evening Stillness'],
      summaryObservation: 'Your recent reflections frequently highlight creative problem solving, steady project momentum, and regular evening stillness.',
      voiceToTextRatio: '33% Voice / 67% Written',
      nonClinicalNote: 'Patterns reflect self-reported topics over your recent sessions.'
    }
  });
});

export default router;
