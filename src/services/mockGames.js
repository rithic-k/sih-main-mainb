// mockGames.js - Playable game configurations & post-game 5-question reflection handler
const STORAGE_KEY_GAME_REFLECTIONS = 'seera_game_reflections';
const STORAGE_KEY_GAME_STATS = 'seera_game_stats';

export const POST_GAME_QUESTIONS = [
  {
    id: 'q1_feeling',
    question: 'How did that activity feel?',
    type: 'choice',
    options: ['Calming & grounding', 'Engaging & refreshing', 'Challenging', 'Slightly tiring', 'Neutral']
  },
  {
    id: 'q2_focus',
    question: 'How focused did you feel while playing?',
    type: 'slider',
    min: 1,
    max: 10,
    minLabel: 'Easily distracted',
    maxLabel: 'Deeply in the zone',
    defaultValue: 7
  },
  {
    id: 'q3_enjoyment',
    question: 'Did you enjoy this session?',
    type: 'choice',
    options: ['Really enjoyed it', 'It was pleasant', 'A bit repetitive', 'Not quite my style today']
  },
  {
    id: 'q4_difficulty',
    question: 'How was the difficulty level for you?',
    type: 'choice',
    options: ['Too gentle', 'Just right / sweet spot', 'A good brain teaser', 'A bit too complex']
  },
  {
    id: 'q5_current_state',
    question: 'How are you feeling right now?',
    type: 'text_or_tags',
    quickTags: ['Clear-headed', 'Relaxed', 'Energized', 'Ready for learning', 'Need a stretch', 'Thoughtful'],
    placeholder: 'Optional: Write a thought or note to yourself...'
  }
];

export const INITIAL_GAME_STATS = {
  sudokuPlayed: 8,
  game2048Played: 14,
  patternPlayed: 5,
  memoryPlayed: 6,
  totalPlayTimeMinutes: 145,
  calmStreakDays: 6,
  reflectionsCompleted: 21
};

export const mockGamesService = {
  getStats: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GAME_STATS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEY_GAME_STATS, JSON.stringify(INITIAL_GAME_STATS));
    return INITIAL_GAME_STATS;
  },

  incrementGameCount: (gameKey, durationMinutes = 5) => {
    const stats = mockGamesService.getStats();
    const updated = {
      ...stats,
      [`${gameKey}Played`]: (stats[`${gameKey}Played`] || 0) + 1,
      totalPlayTimeMinutes: (stats.totalPlayTimeMinutes || 0) + durationMinutes
    };
    localStorage.setItem(STORAGE_KEY_GAME_STATS, JSON.stringify(updated));
    return updated;
  },

  getReflections: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GAME_REFLECTIONS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    const defaultReflections = [
      {
        id: 'ref-1',
        gameTitle: 'Sudoku (Gentle)',
        timestamp: '2026-09-03T18:30:00Z',
        answers: {
          q1_feeling: 'Calming & grounding',
          q2_focus: 8,
          q3_enjoyment: 'Really enjoyed it',
          q4_difficulty: 'Just right / sweet spot',
          q5_current_state: 'Clear-headed and unhurried'
        }
      },
      {
        id: 'ref-2',
        gameTitle: '2048 (Mind Flow)',
        timestamp: '2026-09-02T20:15:00Z',
        answers: {
          q1_feeling: 'Engaging & refreshing',
          q2_focus: 9,
          q3_enjoyment: 'Really enjoyed it',
          q4_difficulty: 'A good brain teaser',
          q5_current_state: 'Ready to write in journal'
        }
      }
    ];
    localStorage.setItem(STORAGE_KEY_GAME_REFLECTIONS, JSON.stringify(defaultReflections));
    return defaultReflections;
  },

  saveReflection: (gameTitle, answers) => {
    const list = mockGamesService.getReflections();
    const newRef = {
      id: `ref-${Date.now()}`,
      gameTitle,
      timestamp: new Date().toISOString(),
      answers
    };
    const updated = [newRef, ...list];
    localStorage.setItem(STORAGE_KEY_GAME_REFLECTIONS, JSON.stringify(updated));
    
    // Also bump stats
    const stats = mockGamesService.getStats();
    stats.reflectionsCompleted = (stats.reflectionsCompleted || 0) + 1;
    localStorage.setItem(STORAGE_KEY_GAME_STATS, JSON.stringify(stats));

    return newRef;
  }
};
