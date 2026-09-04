// mockCounsellor.js - Counsellor Portal with 10 fictional anonymous users & longitudinal deviation data
const STORAGE_KEY_COUNSELLOR_USERS = 'seera_counsellor_users';

export const MOCK_COUNSELLOR_USERS = [
  {
    id: 'user-C119',
    code: 'User #C119',
    ageGroup: '18-24',
    status: 'review_recommended', // 'stable' | 'change_detected' | 'review_recommended'
    statusLabel: 'Human review recommended',
    statusTag: 'Sustained change noticed',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    dotColor: 'bg-rose-500',
    primaryGoal: 'Academics & Engineering',
    interests: ['Technology', 'Games', 'Reading'],
    baselinePeriod: '60 days established',
    lastActive: '3 hours ago',
    deviationSummary: 'Sustained deviation from personal baseline detected over multiple sessions across past 10 days.',
    indicators: {
      goalEngagement: { score: 32, baseline: 85, change: '-53%', trend: 'down' },
      hobbyEngagement: { score: 15, baseline: 70, change: '-55%', trend: 'down' },
      reflectionTrend: { score: 40, baseline: 78, change: '-38%', trend: 'down' },
      journalFrequency: { score: 20, baseline: 80, change: '-60%', trend: 'down' },
      lateNightActivity: { score: 84, baseline: 25, change: '+59%', trend: 'up_alert' },
      activityConsistency: { score: 38, baseline: 88, change: '-50%', trend: 'down' }
    },
    weeklyHistory: [
      { week: 'W1', baseline: 80, currentEngagement: 82, lateNightHours: 0.5 },
      { week: 'W2', baseline: 80, currentEngagement: 78, lateNightHours: 0.8 },
      { week: 'W3', baseline: 80, currentEngagement: 75, lateNightHours: 1.0 },
      { week: 'W4', baseline: 80, currentEngagement: 62, lateNightHours: 2.1 },
      { week: 'W5', baseline: 80, currentEngagement: 45, lateNightHours: 3.4 },
      { week: 'W6', baseline: 80, currentEngagement: 34, lateNightHours: 4.2 }
    ],
    permittedInfo: {
      shareWellbeingTrend: true,
      shareGoals: true,
      shareHobbyStats: true,
      shareRawJournals: false, // User privacy consent respected!
      shareVoiceRecordings: false,
      emergencyContactLinked: true
    },
    counsellorNotes: [
      { id: 'n1', author: 'Dr. Anita Sharma', date: '2026-09-02', text: 'Noticed sharp drop in daytime learning modules coinciding with 2 AM to 4 AM logins. Scheduled a gentle outreach check-in.' }
    ],
    isReviewed: false,
    scheduledSession: null
  },
  {
    id: 'user-B304',
    code: 'User #B304',
    ageGroup: '25-34',
    status: 'change_detected',
    statusLabel: 'Change detected',
    statusTag: 'Recent pattern shift',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    dotColor: 'bg-amber-500',
    primaryGoal: 'Career & Work-life Balance',
    interests: ['Music', 'Fitness', 'Cooking'],
    baselinePeriod: '45 days established',
    lastActive: 'Yesterday',
    deviationSummary: 'Moderate drop in daily movement goals and hobby logging during the current week.',
    indicators: {
      goalEngagement: { score: 58, baseline: 75, change: '-17%', trend: 'down' },
      hobbyEngagement: { score: 45, baseline: 65, change: '-20%', trend: 'down' },
      reflectionTrend: { score: 62, baseline: 70, change: '-8%', trend: 'stable' },
      journalFrequency: { score: 60, baseline: 60, change: '0%', trend: 'stable' },
      lateNightActivity: { score: 40, baseline: 30, change: '+10%', trend: 'neutral' },
      activityConsistency: { score: 60, baseline: 75, change: '-15%', trend: 'down' }
    },
    weeklyHistory: [
      { week: 'W1', baseline: 75, currentEngagement: 74, lateNightHours: 0.2 },
      { week: 'W2', baseline: 75, currentEngagement: 76, lateNightHours: 0.5 },
      { week: 'W3', baseline: 75, currentEngagement: 70, lateNightHours: 0.6 },
      { week: 'W4', baseline: 75, currentEngagement: 58, lateNightHours: 1.2 }
    ],
    permittedInfo: {
      shareWellbeingTrend: true,
      shareGoals: true,
      shareHobbyStats: true,
      shareRawJournals: false,
      shareVoiceRecordings: false,
      emergencyContactLinked: true
    },
    counsellorNotes: [],
    isReviewed: true,
    scheduledSession: '2026-09-08 16:00'
  },
  {
    id: 'user-A721',
    code: 'User #A721',
    ageGroup: '18-24',
    status: 'stable',
    statusLabel: 'Stable',
    statusTag: 'Consistent baseline',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    dotColor: 'bg-emerald-500',
    primaryGoal: 'Daily Habits & Self-discovery',
    interests: ['Art', 'Nature', 'Mind Games'],
    baselinePeriod: '90 days established',
    lastActive: '45 mins ago',
    deviationSummary: 'Active adherence to personal daily plan and regular evening reflections.',
    indicators: {
      goalEngagement: { score: 88, baseline: 85, change: '+3%', trend: 'up' },
      hobbyEngagement: { score: 82, baseline: 80, change: '+2%', trend: 'up' },
      reflectionTrend: { score: 90, baseline: 88, change: '+2%', trend: 'up' },
      journalFrequency: { score: 85, baseline: 82, change: '+3%', trend: 'up' },
      lateNightActivity: { score: 15, baseline: 18, change: '-3%', trend: 'good' },
      activityConsistency: { score: 92, baseline: 90, change: '+2%', trend: 'up' }
    },
    weeklyHistory: [
      { week: 'W1', baseline: 85, currentEngagement: 86, lateNightHours: 0.2 },
      { week: 'W2', baseline: 85, currentEngagement: 88, lateNightHours: 0.3 },
      { week: 'W3', baseline: 85, currentEngagement: 87, lateNightHours: 0.2 },
      { week: 'W4', baseline: 85, currentEngagement: 90, lateNightHours: 0.1 }
    ],
    permittedInfo: {
      shareWellbeingTrend: true,
      shareGoals: true,
      shareHobbyStats: true,
      shareRawJournals: false,
      shareVoiceRecordings: false,
      emergencyContactLinked: false
    },
    counsellorNotes: [],
    isReviewed: true,
    scheduledSession: null
  },
  {
    id: 'user-D442',
    code: 'User #D442',
    ageGroup: 'Young User (15-17)',
    status: 'change_detected',
    statusLabel: 'Change detected',
    statusTag: 'Academic stress pattern',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    dotColor: 'bg-amber-500',
    primaryGoal: 'High School Exams & Art',
    interests: ['Art', 'Photography', 'Gaming'],
    baselinePeriod: '30 days established',
    lastActive: '5 hours ago',
    deviationSummary: 'Shift towards irregular game times and reduced creative hobby submissions.',
    indicators: {
      goalEngagement: { score: 50, baseline: 72, change: '-22%', trend: 'down' },
      hobbyEngagement: { score: 35, baseline: 68, change: '-33%', trend: 'down' },
      reflectionTrend: { score: 55, baseline: 70, change: '-15%', trend: 'down' },
      journalFrequency: { score: 40, baseline: 65, change: '-25%', trend: 'down' },
      lateNightActivity: { score: 62, baseline: 20, change: '+42%', trend: 'up_alert' },
      activityConsistency: { score: 52, baseline: 76, change: '-24%', trend: 'down' }
    },
    weeklyHistory: [
      { week: 'W1', baseline: 70, currentEngagement: 72, lateNightHours: 0.4 },
      { week: 'W2', baseline: 70, currentEngagement: 68, lateNightHours: 0.8 },
      { week: 'W3', baseline: 70, currentEngagement: 54, lateNightHours: 2.2 },
      { week: 'W4', baseline: 70, currentEngagement: 48, lateNightHours: 3.1 }
    ],
    permittedInfo: {
      shareWellbeingTrend: true,
      shareGoals: true,
      shareHobbyStats: true,
      shareRawJournals: false,
      shareVoiceRecordings: false,
      familyAccountLinked: true
    },
    counsellorNotes: [
      { id: 'n2', author: 'Dr. Anita Sharma', date: '2026-08-30', text: 'Exam pressure season noted. Recommended lightweight 15-min drawing breaks.' }
    ],
    isReviewed: false,
    scheduledSession: null
  },
  {
    id: 'user-E819',
    code: 'User #E819',
    ageGroup: '18-24',
    status: 'stable',
    statusLabel: 'Stable',
    statusTag: 'Steady engagement',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    dotColor: 'bg-emerald-500',
    primaryGoal: 'Fitness & Physical Health',
    interests: ['Fitness', 'Dance', 'Cooking'],
    baselinePeriod: '60 days established',
    lastActive: 'Today',
    deviationSummary: 'Consistent daily workout and habit streak tracking within expected baseline.',
    indicators: {
      goalEngagement: { score: 91, baseline: 88, change: '+3%', trend: 'up' },
      hobbyEngagement: { score: 79, baseline: 75, change: '+4%', trend: 'up' },
      reflectionTrend: { score: 84, baseline: 82, change: '+2%', trend: 'up' },
      journalFrequency: { score: 76, baseline: 74, change: '+2%', trend: 'up' },
      lateNightActivity: { score: 10, baseline: 12, change: '-2%', trend: 'good' },
      activityConsistency: { score: 90, baseline: 89, change: '+1%', trend: 'up' }
    },
    weeklyHistory: [
      { week: 'W1', baseline: 88, currentEngagement: 87, lateNightHours: 0.1 },
      { week: 'W2', baseline: 88, currentEngagement: 89, lateNightHours: 0.2 },
      { week: 'W3', baseline: 88, currentEngagement: 92, lateNightHours: 0.1 }
    ],
    permittedInfo: {
      shareWellbeingTrend: true,
      shareGoals: true,
      shareHobbyStats: true,
      shareRawJournals: false,
      shareVoiceRecordings: false,
      emergencyContactLinked: false
    },
    counsellorNotes: [],
    isReviewed: true,
    scheduledSession: null
  },
  {
    id: 'user-F203',
    code: 'User #F203',
    ageGroup: '25-34',
    status: 'review_recommended',
    statusLabel: 'Human review recommended',
    statusTag: 'Sustained disengagement',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    dotColor: 'bg-rose-500',
    primaryGoal: 'Emotional Wellbeing',
    interests: ['Writing', 'Nature', 'Reading'],
    baselinePeriod: '50 days established',
    lastActive: '3 days ago',
    deviationSummary: 'Total pause in journal entries and goal milestones over 12 consecutive days.',
    indicators: {
      goalEngagement: { score: 18, baseline: 78, change: '-60%', trend: 'down' },
      hobbyEngagement: { score: 20, baseline: 72, change: '-52%', trend: 'down' },
      reflectionTrend: { score: 25, baseline: 80, change: '-55%', trend: 'down' },
      journalFrequency: { score: 10, baseline: 75, change: '-65%', trend: 'down' },
      lateNightActivity: { score: 70, baseline: 22, change: '+48%', trend: 'up_alert' },
      activityConsistency: { score: 22, baseline: 82, change: '-60%', trend: 'down' }
    },
    weeklyHistory: [
      { week: 'W1', baseline: 78, currentEngagement: 76, lateNightHours: 0.5 },
      { week: 'W2', baseline: 78, currentEngagement: 65, lateNightHours: 1.5 },
      { week: 'W3', baseline: 78, currentEngagement: 38, lateNightHours: 3.2 },
      { week: 'W4', baseline: 78, currentEngagement: 18, lateNightHours: 4.8 }
    ],
    permittedInfo: {
      shareWellbeingTrend: true,
      shareGoals: true,
      shareHobbyStats: true,
      shareRawJournals: false,
      shareVoiceRecordings: false,
      emergencyContactLinked: true
    },
    counsellorNotes: [
      { id: 'n3', author: 'Dr. Anita Sharma', date: '2026-09-01', text: 'Sent warm asynchronous message with helpline resources & gentle invitation for audio check-in.' }
    ],
    isReviewed: false,
    scheduledSession: '2026-09-05 11:30'
  },
  {
    id: 'user-G550',
    code: 'User #G550',
    ageGroup: '18-24',
    status: 'stable',
    statusLabel: 'Stable',
    statusTag: 'Active learner',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    dotColor: 'bg-emerald-500',
    primaryGoal: 'Career & Tech',
    interests: ['Technology', 'Science', 'Writing'],
    baselinePeriod: '40 days established',
    lastActive: '2 hours ago',
    deviationSummary: 'Regular flashcard reviews and progress in coding goals.',
    indicators: {
      goalEngagement: { score: 85, baseline: 82, change: '+3%', trend: 'up' },
      hobbyEngagement: { score: 74, baseline: 70, change: '+4%', trend: 'up' },
      reflectionTrend: { score: 80, baseline: 78, change: '+2%', trend: 'up' },
      journalFrequency: { score: 70, baseline: 68, change: '+2%', trend: 'up' },
      lateNightActivity: { score: 20, baseline: 25, change: '-5%', trend: 'good' },
      activityConsistency: { score: 86, baseline: 84, change: '+2%', trend: 'up' }
    },
    weeklyHistory: [
      { week: 'W1', baseline: 82, currentEngagement: 80, lateNightHours: 0.4 },
      { week: 'W2', baseline: 82, currentEngagement: 84, lateNightHours: 0.3 }
    ],
    permittedInfo: {
      shareWellbeingTrend: true,
      shareGoals: true,
      shareHobbyStats: true,
      shareRawJournals: false,
      shareVoiceRecordings: false,
      emergencyContactLinked: false
    },
    counsellorNotes: [],
    isReviewed: true,
    scheduledSession: null
  },
  {
    id: 'user-H902',
    code: 'User #H902',
    ageGroup: 'Young User (13-14)',
    status: 'change_detected',
    statusLabel: 'Change detected',
    statusTag: 'Contextual adjustment',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    dotColor: 'bg-amber-500',
    primaryGoal: 'Creative Hobbies & School',
    interests: ['Crafts', 'Movies', 'Music'],
    baselinePeriod: '25 days established',
    lastActive: '1 day ago',
    deviationSummary: 'Family-linked account: Noticeable increase in mind games playtime during school hours.',
    indicators: {
      goalEngagement: { score: 60, baseline: 75, change: '-15%', trend: 'down' },
      hobbyEngagement: { score: 55, baseline: 65, change: '-10%', trend: 'down' },
      reflectionTrend: { score: 65, baseline: 72, change: '-7%', trend: 'stable' },
      journalFrequency: { score: 50, baseline: 60, change: '-10%', trend: 'stable' },
      lateNightActivity: { score: 35, baseline: 20, change: '+15%', trend: 'neutral' },
      activityConsistency: { score: 62, baseline: 78, change: '-16%', trend: 'down' }
    },
    weeklyHistory: [
      { week: 'W1', baseline: 75, currentEngagement: 73, lateNightHours: 0.2 },
      { week: 'W2', baseline: 75, currentEngagement: 64, lateNightHours: 0.6 }
    ],
    permittedInfo: {
      shareWellbeingTrend: true,
      shareGoals: true,
      shareHobbyStats: true,
      shareRawJournals: false,
      shareVoiceRecordings: false,
      familyAccountLinked: true
    },
    counsellorNotes: [],
    isReviewed: false,
    scheduledSession: null
  },
  {
    id: 'user-J331',
    code: 'User #J331',
    ageGroup: '35+',
    status: 'stable',
    statusLabel: 'Stable',
    statusTag: 'Consistent routines',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    dotColor: 'bg-emerald-500',
    primaryGoal: 'Personal Growth & Family Time',
    interests: ['Reading', 'Cooking', 'Nature'],
    baselinePeriod: '75 days established',
    lastActive: '6 hours ago',
    deviationSummary: 'Consistently completes morning reflections and weekend culinary hobby logs.',
    indicators: {
      goalEngagement: { score: 86, baseline: 85, change: '+1%', trend: 'up' },
      hobbyEngagement: { score: 88, baseline: 86, change: '+2%', trend: 'up' },
      reflectionTrend: { score: 92, baseline: 90, change: '+2%', trend: 'up' },
      journalFrequency: { score: 84, baseline: 82, change: '+2%', trend: 'up' },
      lateNightActivity: { score: 8, baseline: 10, change: '-2%', trend: 'good' },
      activityConsistency: { score: 94, baseline: 92, change: '+2%', trend: 'up' }
    },
    weeklyHistory: [
      { week: 'W1', baseline: 85, currentEngagement: 86, lateNightHours: 0.1 },
      { week: 'W2', baseline: 85, currentEngagement: 88, lateNightHours: 0.1 }
    ],
    permittedInfo: {
      shareWellbeingTrend: true,
      shareGoals: true,
      shareHobbyStats: true,
      shareRawJournals: false,
      shareVoiceRecordings: false,
      emergencyContactLinked: false
    },
    counsellorNotes: [],
    isReviewed: true,
    scheduledSession: null
  },
  {
    id: 'user-K104',
    code: 'User #K104',
    ageGroup: '18-24',
    status: 'review_recommended',
    statusLabel: 'Human review recommended',
    statusTag: 'Sustained night owl shift',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    dotColor: 'bg-rose-500',
    primaryGoal: 'Education & Career Transition',
    interests: ['Technology', 'Fitness', 'Games'],
    baselinePeriod: '35 days established',
    lastActive: '4 hours ago',
    deviationSummary: 'Sharp spike in late-night activity (3 AM - 5 AM) accompanied by complete cessation of daytime hobby logs.',
    indicators: {
      goalEngagement: { score: 35, baseline: 80, change: '-45%', trend: 'down' },
      hobbyEngagement: { score: 18, baseline: 65, change: '-47%', trend: 'down' },
      reflectionTrend: { score: 42, baseline: 75, change: '-33%', trend: 'down' },
      journalFrequency: { score: 25, baseline: 70, change: '-45%', trend: 'down' },
      lateNightActivity: { score: 88, baseline: 18, change: '+70%', trend: 'up_alert' },
      activityConsistency: { score: 40, baseline: 82, change: '-42%', trend: 'down' }
    },
    weeklyHistory: [
      { week: 'W1', baseline: 80, currentEngagement: 79, lateNightHours: 0.3 },
      { week: 'W2', baseline: 80, currentEngagement: 68, lateNightHours: 1.8 },
      { week: 'W3', baseline: 80, currentEngagement: 48, lateNightHours: 3.9 },
      { week: 'W4', baseline: 80, currentEngagement: 36, lateNightHours: 5.2 }
    ],
    permittedInfo: {
      shareWellbeingTrend: true,
      shareGoals: true,
      shareHobbyStats: true,
      shareRawJournals: false,
      shareVoiceRecordings: false,
      emergencyContactLinked: true
    },
    counsellorNotes: [
      { id: 'n4', author: 'Dr. Anita Sharma', date: '2026-09-03', text: 'Flagged for proactive video check-in. User confirmed permission for counsellor outreach.' }
    ],
    isReviewed: false,
    scheduledSession: '2026-09-04 17:00'
  }
];

export const mockCounsellorService = {
  getUsers: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_COUNSELLOR_USERS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEY_COUNSELLOR_USERS, JSON.stringify(MOCK_COUNSELLOR_USERS));
    return MOCK_COUNSELLOR_USERS;
  },

  getUserById: (id) => {
    const users = mockCounsellorService.getUsers();
    return users.find(u => u.id === id || u.code === id) || users[0];
  },

  addNote: (userId, noteText, author = 'Dr. Anita Sharma') => {
    const users = mockCounsellorService.getUsers();
    const updated = users.map(u => {
      if (u.id !== userId && u.code !== userId) return u;
      const newNote = {
        id: `n-${Date.now()}`,
        author,
        date: new Date().toISOString().split('T')[0],
        text: noteText
      };
      return {
        ...u,
        counsellorNotes: [newNote, ...(u.counsellorNotes || [])]
      };
    });
    localStorage.setItem(STORAGE_KEY_COUNSELLOR_USERS, JSON.stringify(updated));
    return updated;
  },

  toggleReviewed: (userId) => {
    const users = mockCounsellorService.getUsers();
    const updated = users.map(u => {
      if (u.id !== userId && u.code !== userId) return u;
      return { ...u, isReviewed: !u.isReviewed };
    });
    localStorage.setItem(STORAGE_KEY_COUNSELLOR_USERS, JSON.stringify(updated));
    return updated;
  },

  scheduleSession: (userId, dateTime) => {
    const users = mockCounsellorService.getUsers();
    const updated = users.map(u => {
      if (u.id !== userId && u.code !== userId) return u;
      return { ...u, scheduledSession: dateTime };
    });
    localStorage.setItem(STORAGE_KEY_COUNSELLOR_USERS, JSON.stringify(updated));
    return updated;
  }
};
