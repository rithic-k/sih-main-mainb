// counsellorEngine.js - Counsellor cohort analytics, evidence summaries, and clinical note management
import { db } from '../database/db.js';

export const counsellorEngine = {
  getCohortUsers: () => {
    return db.getTable('personal_baselines');
  },

  getUserDetail: (userId) => {
    const baseline = db.findOne('personal_baselines', b => b.userId === userId || b.id === userId);
    const user = db.findOne('users', u => u.id === userId);
    const notes = db.find('counsellor_notes', n => n.userId === userId);

    if (!baseline) return null;

    return {
      ...baseline,
      userSummary: user ? { displayName: user.displayName, ageGroup: user.ageGroup, timezone: user.timezone } : null,
      notes
    };
  },

  addClinicalNote: (userId, authorName, text) => {
    return db.insert('counsellor_notes', {
      userId,
      author: authorName || 'Dr. Anita Sharma',
      text: text.trim(),
      timestamp: new Date().toISOString()
    });
  },

  toggleReviewedStatus: (userId) => {
    const baseline = db.findOne('personal_baselines', b => b.userId === userId || b.id === userId);
    if (!baseline) return false;

    const newStatus = !baseline.isReviewed;
    db.update('personal_baselines', b => b.userId === userId || b.id === userId, { isReviewed: newStatus });
    return newStatus;
  }
};
