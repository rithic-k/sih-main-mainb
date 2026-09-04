// mockUser.js - User profile, onboarding selections, preferences and privacy settings
const STORAGE_KEY_USER_PREFS = 'seera_user_preferences';
const STORAGE_KEY_PRIVACY = 'seera_privacy_consent';

export const ALL_INTERESTS = [
  { id: 'art', label: 'Art & Sketching', icon: 'Palette', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  { id: 'music', label: 'Music & Instruments', icon: 'Music', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { id: 'reading', label: 'Reading & Literature', icon: 'BookOpen', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  { id: 'technology', label: 'Technology & Code', icon: 'Cpu', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  { id: 'fitness', label: 'Fitness & Movement', icon: 'Activity', color: 'bg-rose-50 text-rose-800 border-rose-200' },
  { id: 'cooking', label: 'Cooking & Culinary', icon: 'Utensils', color: 'bg-orange-50 text-orange-800 border-orange-200' },
  { id: 'photography', label: 'Photography', icon: 'Camera', color: 'bg-purple-50 text-purple-800 border-purple-200' },
  { id: 'writing', label: 'Creative Writing', icon: 'PenTool', color: 'bg-teal-50 text-teal-800 border-teal-200' },
  { id: 'games', label: 'Mind Games & Puzzles', icon: 'Gamepad2', color: 'bg-yellow-50 text-yellow-800 border-yellow-200' },
  { id: 'nature', label: 'Nature & Gardening', icon: 'Leaf', color: 'bg-green-50 text-green-800 border-green-200' },
  { id: 'movies', label: 'Cinema & Film', icon: 'Film', color: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
  { id: 'crafts', label: 'Handicrafts & DIY', icon: 'Scissors', color: 'bg-pink-50 text-pink-800 border-pink-200' },
  { id: 'science', label: 'Science & Discovery', icon: 'Compass', color: 'bg-violet-50 text-violet-800 border-violet-200' },
  { id: 'dance', label: 'Dance & Expression', icon: 'Sparkles', color: 'bg-lime-50 text-lime-800 border-lime-200' },
];

export const ALL_GOALS = [
  { id: 'career', label: 'Career & Professional Growth', desc: 'Advancing skills, projects, and interviews', icon: 'Briefcase' },
  { id: 'education', label: 'Education & Academics', desc: 'Coursework, exams, and deep study', icon: 'GraduationCap' },
  { id: 'emotional_wellbeing', label: 'Emotional Wellbeing', desc: 'Mindfulness, calm routines, and self-kindness', icon: 'Heart' },
  { id: 'hobbies', label: 'Creative Hobbies', desc: 'Painting, playing guitar, creative time', icon: 'Palette' },
  { id: 'fitness', label: 'Fitness & Physical Health', desc: 'Regular movement, stamina, and posture', icon: 'Activity' },
  { id: 'relationships', label: 'Meaningful Relationships', desc: 'Family, friends, and genuine human connection', icon: 'Users' },
  { id: 'personal_style', label: 'Personal Style & Expression', desc: 'Self-image, wardrobe, and aesthetic', icon: 'Sparkles' },
  { id: 'finance', label: 'Financial Awareness', desc: 'Budgeting, mindful spending, and saving', icon: 'TrendingUp' },
  { id: 'personal_growth', label: 'Daily Self-Discovery', desc: 'Habits, journaling, and curious learning', icon: 'Compass' },
  { id: 'other', label: 'Custom Goal', desc: 'Define your own personal path', icon: 'Target' }
];

export const defaultUserPreferences = {
  interests: ['technology', 'art', 'music', 'reading', 'games'],
  goals: ['career', 'emotional_wellbeing', 'hobbies'],
  primaryGoal: 'career',
  preferredActivities: ['Learning', 'Creative activities', 'Games', 'Reflection'],
  activityStyle: 'Short and easy', // 'Short and easy' | 'Focused sessions' | 'Creative' | 'Challenge-based' | 'Relaxing' | 'Social'
  dailyTime: '30 min', // '15 min' | '30 min' | '45 min' | '60 min' | '90+ min'
  preferredTime: 'Evening', // 'Morning' | 'Afternoon' | 'Evening' | 'Flexible'
  isOnboardingCompleted: true
};

export const defaultPrivacySettings = {
  wellbeingAnalysis: true,
  counsellorSupport: true,
  voiceJournaling: true,
  locationPermission: false,
  familyVisibility: false, // For young users
  anonymizedAnalytics: true,
  lastConsentDate: '2026-07-06'
};

export const mockUserService = {
  getPreferences: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER_PREFS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading user preferences:', e);
    }
    localStorage.setItem(STORAGE_KEY_USER_PREFS, JSON.stringify(defaultUserPreferences));
    return defaultUserPreferences;
  },

  updatePreferences: (updates) => {
    const current = mockUserService.getPreferences();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEY_USER_PREFS, JSON.stringify(updated));
    return updated;
  },

  getPrivacySettings: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PRIVACY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading privacy settings:', e);
    }
    localStorage.setItem(STORAGE_KEY_PRIVACY, JSON.stringify(defaultPrivacySettings));
    return defaultPrivacySettings;
  },

  updatePrivacySettings: (updates) => {
    const current = mockUserService.getPrivacySettings();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEY_PRIVACY, JSON.stringify(updated));
    return updated;
  },

  exportUserData: () => {
    const data = {
      profile: localStorage.getItem('seera_auth_session') ? JSON.parse(localStorage.getItem('seera_auth_session')) : null,
      preferences: mockUserService.getPreferences(),
      privacy: mockUserService.getPrivacySettings(),
      exportedAt: new Date().toISOString(),
      format: 'SEERA Personal Archive (JSON)',
      statement: 'You are more than your data.'
    };
    return JSON.stringify(data, null, 2);
  },

  resetAllData: () => {
    localStorage.clear();
    return true;
  }
};
