// baselineEngine.js - Computes and maintains individual rolling personal baselines (Non-Clinical)
import { db } from '../database/db.js';

export const baselineEngine = {
  calculateUserBaseline: (userId) => {
    // Fetch user's historical events
    const goals = db.find('goals', g => g.userId === userId);
    const journals = db.find('journal_entries', j => j.userId === userId);
    const gameReflections = db.find('game_reflections', r => r.userId === userId);
    const screenLogs = db.find('screen_time_logs', s => s.userId === userId);

    // Minimum historical points required for established baseline
    const totalDataPoints = goals.length + journals.length + gameReflections.length + screenLogs.length;
    const isEstablished = totalDataPoints >= 5;

    if (!isEstablished) {
      return {
        userId,
        isEstablished: false,
        status: 'establishing_baseline',
        statusLabel: 'Establishing Baseline',
        statusTag: 'Initial observation window',
        minRequiredPoints: 5,
        currentPoints: totalDataPoints,
        baselineSummary: 'User recently joined. Accumulating natural behavioral data before evaluating deviations.'
      };
    }

    // Compute rolling engagement metrics
    const completedMilestones = goals.reduce((acc, g) => {
      const ms = db.find('goal_milestones', m => m.goalId === g.id && m.completed);
      return acc + ms.length;
    }, 0);

    const avgFocusScore = gameReflections.length > 0
      ? gameReflections.reduce((acc, r) => acc + (r.answers?.q2_focus || 7), 0) / gameReflections.length
      : 7.5;

    const avgJournalWords = journals.length > 0
      ? journals.reduce((acc, j) => acc + (j.content?.split(/\s+/).length || 0), 0) / journals.length
      : 45;

    return {
      userId,
      isEstablished: true,
      status: 'established',
      totalDataPoints,
      metrics: {
        goalCompletionBaseline: Math.min(95, Math.max(50, completedMilestones * 15 + 50)),
        focusScoreBaseline: Math.round(avgFocusScore * 10),
        journalLengthBaseline: Math.round(avgJournalWords),
        expectedWeeklyHobbyHours: 2.5,
        normalLateNightMinutes: 15
      },
      updatedAt: new Date().toISOString()
    };
  }
};
