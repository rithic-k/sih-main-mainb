// nlpEngine.js - Explainable NLP analysis for reflections and journals (Strictly Non-Clinical)

const POSITIVE_WORDS = [
  'calm', 'grounded', 'focused', 'enjoy', 'enjoyed', 'peaceful', 'progress', 'accomplishment',
  'satisfied', 'refreshed', 'gentle', 'clear', 'curious', 'learning', 'creative',
  'rested', 'harmony', 'relaxing', 'happy', 'grateful', 'proud', 'soothing', 'hopeful',
  'great', 'good', 'accomplished', 'love', 'nice', 'smooth', 'helpful', 'positive'
];

const STRESS_WORDS = [
  'overwhelmed', 'tired', 'stuck', 'exhausted', 'pressure', 'worried', 'frustrated',
  'anxious', 'struggling', 'scattered', 'drained', 'heavy', 'hard', 'deadline', 'unsettled'
];

const THEME_DICTIONARY = {
  'Coursework & Academics': ['exam', 'class', 'coursework', 'assignment', 'verilog', 'fsm', 'lab', 'testbench', 'study', 'semester', 'grade', 'lecture'],
  'Creative Hobbies': ['sketch', 'drawing', 'painting', 'guitar', 'music', 'botanical', 'ink', 'photo', 'gouache', 'craft', 'prose', 'poetry'],
  'Rest & Wind-down': ['sleep', 'bedtime', 'rest', 'evening', 'night', 'walk', 'breeze', 'tea', 'relax', 'screen-free', 'unwind'],
  'Daily Habits & Focus': ['routine', 'pomodoro', 'focus', 'consistency', 'timer', 'streak', 'habit', 'schedule', 'goal', 'milestone'],
  'Future Aspirations': ['interview', 'career', 'project', 'future', 'portfolio', 'placement', 'skill', 'mastery']
};

const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end it all', 'want to die', 'self-harm', 'hurt myself',
  'giving up completely', 'no reason to live'
];

export const nlpEngine = {
  analyzeText: (text) => {
    if (!text || typeof text !== 'string') {
      return {
        wordCount: 0,
        sentimentScore: 0,
        sentimentLabel: 'neutral',
        detectedThemes: [],
        linguisticObservation: 'Insufficient text for linguistic pattern observation.',
        isImmediateCrisis: false
      };
    }

    const lower = text.toLowerCase();
    const words = lower.match(/\b[a-z0-9_-]+\b/g) || [];
    const wordCount = words.length;

    // 1. Safety / Crisis Check
    const isImmediateCrisis = CRISIS_KEYWORDS.some(k => lower.includes(k));

    // 2. Sentiment calculation
    let positiveHits = 0;
    let stressHits = 0;

    words.forEach(w => {
      if (POSITIVE_WORDS.includes(w)) positiveHits++;
      if (STRESS_WORDS.includes(w)) stressHits++;
    });

    const netScore = positiveHits - stressHits;
    let sentimentLabel = 'calm_neutral';
    if (netScore >= 1) {
      sentimentLabel = 'reflective_positive';
    } else if (netScore <= -1) {
      sentimentLabel = 'reflective_fatigued';
    } else {
      sentimentLabel = 'calm_neutral';
    }

    // 3. Theme Extraction
    const detectedThemes = [];
    Object.entries(THEME_DICTIONARY).forEach(([theme, keywords]) => {
      const match = keywords.some(k => lower.includes(k));
      if (match) {
        detectedThemes.push(theme);
      }
    });

    if (detectedThemes.length === 0) {
      detectedThemes.push('General Self-Reflection');
    }

    // 4. Non-Clinical Explainable Summary
    let linguisticObservation = '';
    if (sentimentLabel === 'reflective_positive') {
      linguisticObservation = `Your reflection reflects gentle satisfaction with themes in ${detectedThemes.join(' & ')}.`;
    } else if (sentimentLabel === 'reflective_fatigued') {
      linguisticObservation = `Recent reflection notes elevated pressure, particularly around ${detectedThemes.join(' & ')}.`;
    } else {
      linguisticObservation = `Balanced, steady reflections highlighting ${detectedThemes.join(', ')}.`;
    }

    return {
      wordCount,
      sentimentScore: netScore,
      sentimentLabel,
      detectedThemes,
      linguisticObservation,
      isImmediateCrisis,
      analyzedAt: new Date().toISOString()
    };
  }
};
