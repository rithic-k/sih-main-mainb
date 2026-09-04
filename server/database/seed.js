import { db } from './db.js';

export function seedDatabase() {
  // Check if already seeded
  if (db.getTable('users').length > 0) {
    return;
  }

  console.log('Seeding SEERA database with realistic 10-persona cohort and longitudinal data...');

  // 1. Primary Default User (Moonlight27)
  const defaultUserId = 'user-moonlight27';
  db.insert('users', {
    id: defaultUserId,
    accountType: 'individual',
    displayName: 'Moonlight27',
    email: 'moonlight27@example.com',
    phone: '+91 9876543210',
    countryCode: '+91',
    ageGroup: '18-24',
    language: 'English',
    timezone: 'Asia/Kolkata (IST)',
    location: 'Bengaluru, India',
    joinedDate: '2026-07-06'
  });

  db.insert('profiles', {
    id: 'prof-moonlight27',
    userId: defaultUserId,
    avatarSeed: 'sage-sprout',
    streakDays: 14,
    points: 420
  });

  db.insert('preferences', {
    id: 'pref-moonlight27',
    userId: defaultUserId,
    interests: ['technology', 'art', 'music', 'reading', 'games'],
    goals: ['career', 'emotional_wellbeing', 'hobbies'],
    primaryGoal: 'career',
    preferredActivities: ['Learning', 'Creative activities', 'Games', 'Reflection'],
    activityStyle: 'Short and easy',
    dailyTime: '30 min',
    preferredTime: 'Evening',
    isOnboardingCompleted: true
  });

  db.insert('consent_settings', {
    id: 'consent-moonlight27',
    userId: defaultUserId,
    wellbeingAnalysis: true,
    counsellorSupport: true,
    voiceJournaling: true,
    locationPermission: false,
    familyVisibility: false,
    lastConsentDate: '2026-07-06'
  });

  // Default Goal: Verilog FSM
  const verilogGoal = db.insert('goals', {
    id: 'goal-verilog-fsm',
    userId: defaultUserId,
    title: 'Learn Verilog FSM Design',
    category: 'career',
    categoryLabel: 'Career & VLSI',
    deadline: '2026-09-30',
    frequency: '3 sessions / week',
    status: 'active',
    color: 'emerald',
    notes: 'Mastering Finite State Machines for digital circuit design and upcoming tech interviews.'
  });

  db.insert('goal_milestones', { id: 'm1', goalId: verilogGoal.id, title: 'Understand FSM basics & state transition diagrams', completed: true, completedAt: '2026-08-10' });
  db.insert('goal_milestones', { id: 'm2', goalId: verilogGoal.id, title: 'Implement Mealy FSM in Verilog', completed: true, completedAt: '2026-08-18' });
  db.insert('goal_milestones', { id: 'm3', goalId: verilogGoal.id, title: 'Implement Moore FSM in Verilog', completed: true, completedAt: '2026-08-25' });
  db.insert('goal_milestones', { id: 'm4', goalId: verilogGoal.id, title: 'Build sequence detector with testbench simulation', completed: false, completedAt: null });
  db.insert('goal_milestones', { id: 'm5', goalId: verilogGoal.id, title: 'Complete mini project: Traffic Light Controller', completed: false, completedAt: null });

  // Default Reflections & Journals
  db.insert('journal_entries', {
    id: 'entry-1',
    userId: defaultUserId,
    title: 'Designing the FSM and finding evening stillness',
    date: '2026-09-03',
    time: '21:40',
    mode: 'text',
    content: "Today I got the Mealy state machine simulation to produce clean waveform transitions without glitches. It felt very satisfying to see the testbench pass. Afterwards, I went for a 15-minute walk outside instead of scrolling. The cool breeze helped reset my thoughts before night.",
    tags: ['Learning', 'Engineering', 'Stillness'],
    sentimentPattern: 'focused_constructive',
    promptUsed: 'What brought a sense of small progress or quiet accomplishment to your day?'
  });

  db.insert('journal_entries', {
    id: 'entry-2',
    userId: defaultUserId,
    title: 'Voice Note: Letting go of perfectionism in sketching',
    date: '2026-09-01',
    time: '20:15',
    mode: 'voice',
    content: "I started drawing the ficus leaves on my desk. At first, I felt annoyed because the proportions were slightly off, but then I remembered that nature isn't symmetrical. Spending 20 minutes without checking my phone was deeply refreshing.",
    tags: ['Art', 'Creative', 'Mindfulness'],
    audioDuration: '01:42',
    sentimentPattern: 'reflective_creative',
    promptUsed: 'How did your creative activity feel today?'
  });

  // 2. 10 Distinct Fictional Demo Personas (User A to User J)
  const personas = [
    {
      id: 'user-A',
      code: 'User A (#A721)',
      archetype: 'stable',
      ageGroup: '18-24',
      status: 'stable',
      statusLabel: 'Stable',
      statusTag: 'Consistent baseline',
      primaryGoal: 'Daily Habits & Self-discovery',
      interests: ['Art', 'Nature', 'Mind Games'],
      baselineScore: 85,
      currentScore: 88,
      deviationSummary: 'Active adherence to personal daily plan and regular evening reflections.',
      indicators: {
        goalEngagement: { score: 88, baseline: 85, change: '+3%', trend: 'up' },
        hobbyEngagement: { score: 82, baseline: 80, change: '+2%', trend: 'up' },
        reflectionTrend: { score: 90, baseline: 88, change: '+2%', trend: 'up' },
        journalFrequency: { score: 85, baseline: 82, change: '+3%', trend: 'up' },
        lateNightActivity: { score: 15, baseline: 18, change: '-3%', trend: 'good' },
        activityConsistency: { score: 92, baseline: 90, change: '+2%', trend: 'up' }
      }
    },
    {
      id: 'user-B',
      code: 'User B (#B304)',
      archetype: 'improving',
      ageGroup: '25-34',
      status: 'improving',
      statusLabel: 'Improving',
      statusTag: 'Positive momentum',
      primaryGoal: 'Career & Work-life Balance',
      interests: ['Music', 'Fitness', 'Cooking'],
      baselineScore: 65,
      currentScore: 82,
      deviationSummary: 'Positive recovery in physical movement goals and consistent evening unwind routines.',
      indicators: {
        goalEngagement: { score: 80, baseline: 65, change: '+15%', trend: 'up' },
        hobbyEngagement: { score: 75, baseline: 60, change: '+15%', trend: 'up' },
        reflectionTrend: { score: 82, baseline: 70, change: '+12%', trend: 'up' },
        journalFrequency: { score: 78, baseline: 60, change: '+18%', trend: 'up' },
        lateNightActivity: { score: 20, baseline: 35, change: '-15%', trend: 'good' },
        activityConsistency: { score: 85, baseline: 70, change: '+15%', trend: 'up' }
      }
    },
    {
      id: 'user-C',
      code: 'User C (#C119)',
      archetype: 'gradual_disengagement',
      ageGroup: '18-24',
      status: 'change_detected',
      statusLabel: 'Change detected',
      statusTag: 'Recent pattern shift',
      primaryGoal: 'Academics & Engineering',
      interests: ['Technology', 'Games', 'Reading'],
      baselineScore: 80,
      currentScore: 58,
      deviationSummary: 'Moderate drop in daytime study sessions accompanied by delayed nighttime puzzle logins.',
      indicators: {
        goalEngagement: { score: 55, baseline: 80, change: '-25%', trend: 'down' },
        hobbyEngagement: { score: 40, baseline: 70, change: '-30%', trend: 'down' },
        reflectionTrend: { score: 60, baseline: 78, change: '-18%', trend: 'down' },
        journalFrequency: { score: 45, baseline: 75, change: '-30%', trend: 'down' },
        lateNightActivity: { score: 58, baseline: 22, change: '+36%', trend: 'up_alert' },
        activityConsistency: { score: 52, baseline: 82, change: '-30%', trend: 'down' }
      }
    },
    {
      id: 'user-D',
      code: 'User D (#D901)',
      archetype: 'sustained_change',
      ageGroup: '25-34',
      status: 'review_recommended',
      statusLabel: 'Human review recommended',
      statusTag: 'Sustained change noticed',
      primaryGoal: 'Emotional Wellbeing & Career',
      interests: ['Writing', 'Nature', 'Reading'],
      baselineScore: 85,
      currentScore: 32,
      deviationSummary: 'Sustained deviation from personal baseline detected over 10 consecutive days across study, hobbies, and nighttime activity.',
      indicators: {
        goalEngagement: { score: 32, baseline: 85, change: '-53%', trend: 'down' },
        hobbyEngagement: { score: 15, baseline: 70, change: '-55%', trend: 'down' },
        reflectionTrend: { score: 40, baseline: 78, change: '-38%', trend: 'down' },
        journalFrequency: { score: 20, baseline: 80, change: '-60%', trend: 'down' },
        lateNightActivity: { score: 84, baseline: 25, change: '+59%', trend: 'up_alert' },
        activityConsistency: { score: 38, baseline: 88, change: '-50%', trend: 'down' }
      }
    },
    {
      id: 'user-E',
      code: 'User E (#E442)',
      archetype: 'young_user_family',
      ageGroup: 'Young User (15-17)',
      status: 'change_detected',
      statusLabel: 'Change detected',
      statusTag: 'Academic exam pressure',
      primaryGoal: 'High School Lab Prep & Art',
      interests: ['Art', 'Photography', 'Gaming'],
      baselineScore: 72,
      currentScore: 54,
      deviationSummary: 'Family-linked account: Noticeable compression in hobby hours coinciding with pre-board exams.',
      indicators: {
        goalEngagement: { score: 50, baseline: 72, change: '-22%', trend: 'down' },
        hobbyEngagement: { score: 35, baseline: 68, change: '-33%', trend: 'down' },
        reflectionTrend: { score: 55, baseline: 70, change: '-15%', trend: 'down' },
        journalFrequency: { score: 40, baseline: 65, change: '-25%', trend: 'down' },
        lateNightActivity: { score: 62, baseline: 20, change: '+42%', trend: 'up_alert' },
        activityConsistency: { score: 52, baseline: 76, change: '-24%', trend: 'down' }
      }
    },
    {
      id: 'user-F',
      code: 'User F (#F312)',
      archetype: 'high_hobby',
      ageGroup: '18-24',
      status: 'stable',
      statusLabel: 'Stable',
      statusTag: 'Active creative balance',
      primaryGoal: 'Botanical Illustration & Music',
      interests: ['Art', 'Music', 'Crafts'],
      baselineScore: 82,
      currentScore: 88,
      deviationSummary: 'Regular weekend watercolor submissions and daily fingerpicking practice.',
      indicators: {
        goalEngagement: { score: 85, baseline: 80, change: '+5%', trend: 'up' },
        hobbyEngagement: { score: 94, baseline: 88, change: '+6%', trend: 'up' },
        reflectionTrend: { score: 86, baseline: 84, change: '+2%', trend: 'up' },
        journalFrequency: { score: 80, baseline: 78, change: '+2%', trend: 'up' },
        lateNightActivity: { score: 12, baseline: 15, change: '-3%', trend: 'good' },
        activityConsistency: { score: 89, baseline: 85, change: '+4%', trend: 'up' }
      }
    },
    {
      id: 'user-G',
      code: 'User G (#G774)',
      archetype: 'career_focused',
      ageGroup: '25-34',
      status: 'stable',
      statusLabel: 'Stable',
      statusTag: 'Steady milestones',
      primaryGoal: 'Digital Systems & VLSI',
      interests: ['Technology', 'Science', 'Writing'],
      baselineScore: 86,
      currentScore: 89,
      deviationSummary: 'Consistent flashcard mastery and technical project progress.',
      indicators: {
        goalEngagement: { score: 92, baseline: 88, change: '+4%', trend: 'up' },
        hobbyEngagement: { score: 72, baseline: 70, change: '+2%', trend: 'up' },
        reflectionTrend: { score: 84, baseline: 82, change: '+2%', trend: 'up' },
        journalFrequency: { score: 76, baseline: 75, change: '+1%', trend: 'up' },
        lateNightActivity: { score: 18, baseline: 20, change: '-2%', trend: 'good' },
        activityConsistency: { score: 91, baseline: 88, change: '+3%', trend: 'up' }
      }
    },
    {
      id: 'user-H',
      code: 'User H (#H60D)',
      archetype: 'day60_success',
      ageGroup: '18-24',
      status: 'stable',
      statusLabel: 'Stable',
      statusTag: '60-Day milestone complete',
      primaryGoal: 'Holistic Growth & VLSI Design',
      interests: ['Technology', 'Art', 'Fitness'],
      baselineScore: 88,
      currentScore: 94,
      deviationSummary: 'Completed full 60-day cycle with 52 active days and 7 goal milestones reached.',
      indicators: {
        goalEngagement: { score: 95, baseline: 88, change: '+7%', trend: 'up' },
        hobbyEngagement: { score: 88, baseline: 80, change: '+8%', trend: 'up' },
        reflectionTrend: { score: 92, baseline: 86, change: '+6%', trend: 'up' },
        journalFrequency: { score: 88, baseline: 82, change: '+6%', trend: 'up' },
        lateNightActivity: { score: 10, baseline: 16, change: '-6%', trend: 'good' },
        activityConsistency: { score: 96, baseline: 90, change: '+6%', trend: 'up' }
      }
    },
    {
      id: 'user-I',
      code: 'User I (#I521)',
      archetype: 'inconsistent',
      ageGroup: '18-24',
      status: 'change_detected',
      statusLabel: 'Change detected',
      statusTag: 'Fluctuating routines',
      primaryGoal: 'Fitness & Academics',
      interests: ['Fitness', 'Gaming', 'Music'],
      baselineScore: 68,
      currentScore: 50,
      deviationSummary: 'High activity on alternating weekends followed by multiday gaps in weekday reflections.',
      indicators: {
        goalEngagement: { score: 52, baseline: 68, change: '-16%', trend: 'down' },
        hobbyEngagement: { score: 48, baseline: 62, change: '-14%', trend: 'down' },
        reflectionTrend: { score: 55, baseline: 65, change: '-10%', trend: 'down' },
        journalFrequency: { score: 42, baseline: 60, change: '-18%', trend: 'down' },
        lateNightActivity: { score: 48, baseline: 30, change: '+18%', trend: 'neutral' },
        activityConsistency: { score: 46, baseline: 70, change: '-24%', trend: 'down' }
      }
    },
    {
      id: 'user-J',
      code: 'User J (#J102)',
      archetype: 'new_establishing',
      ageGroup: '18-24',
      status: 'stable',
      statusLabel: 'Establishing Baseline',
      statusTag: 'Initial 7-day window',
      primaryGoal: 'Creative Writing & Coding',
      interests: ['Writing', 'Technology', 'Reading'],
      baselineScore: 70,
      currentScore: 72,
      deviationSummary: 'Recently joined. Establishing personal baseline across initial 7 days (zero false alerts).',
      indicators: {
        goalEngagement: { score: 72, baseline: 70, change: '0%', trend: 'stable' },
        hobbyEngagement: { score: 70, baseline: 70, change: '0%', trend: 'stable' },
        reflectionTrend: { score: 75, baseline: 70, change: '0%', trend: 'stable' },
        journalFrequency: { score: 68, baseline: 70, change: '0%', trend: 'stable' },
        lateNightActivity: { score: 15, baseline: 15, change: '0%', trend: 'good' },
        activityConsistency: { score: 74, baseline: 70, change: '0%', trend: 'stable' }
      }
    }
  ];

  personas.forEach(p => {
    db.insert('users', {
      id: p.id,
      accountType: p.ageGroup.includes('Young') ? 'young_user' : 'individual',
      displayName: p.code,
      email: `${p.id}@seera.test`,
      phone: '+91 9123456780',
      ageGroup: p.ageGroup,
      language: 'English',
      timezone: 'Asia/Kolkata (IST)'
    });

    db.insert('personal_baselines', {
      id: `base-${p.id}`,
      userId: p.id,
      archetype: p.archetype,
      status: p.status,
      statusLabel: p.statusLabel,
      statusTag: p.statusTag,
      primaryGoal: p.primaryGoal,
      interests: p.interests,
      deviationSummary: p.deviationSummary,
      indicators: p.indicators,
      weeklyHistory: [
        { week: 'W1', baseline: p.baselineScore, currentEngagement: p.baselineScore + 2, lateNightHours: 0.3 },
        { week: 'W2', baseline: p.baselineScore, currentEngagement: p.baselineScore, lateNightHours: 0.4 },
        { week: 'W3', baseline: p.baselineScore, currentEngagement: p.currentScore + 10, lateNightHours: 1.2 },
        { week: 'W4', baseline: p.baselineScore, currentEngagement: p.currentScore, lateNightHours: p.indicators.lateNightActivity.score > 50 ? 4.1 : 0.4 }
      ],
      permittedInfo: {
        shareWellbeingTrend: true,
        shareGoals: true,
        shareHobbyStats: true,
        shareRawJournals: false,
        shareVoiceRecordings: false,
        emergencyContactLinked: p.status === 'review_recommended'
      },
      isReviewed: p.status === 'stable',
      scheduledSession: p.status === 'review_recommended' ? '2026-09-06 15:00' : null
    });
  });

  // 3. Initial Hobby Hub Posts
  db.insert('hobby_posts', {
    id: 'post-1',
    author: 'CedarBreeze',
    authorAvatar: 'tree-pine',
    timeAgo: '2 hours ago',
    category: 'art',
    title: 'Botanical ink study: Monsoon ferns',
    description: 'Took a break from circuit design this evening to sketch the small ferns growing outside my balcony. Used a 0.3mm fineliner and watered-down gouache.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    likesCount: 24,
    commentsCount: 2,
    saved: false,
    liked: false
  });

  db.insert('hobby_posts', {
    id: 'post-2',
    author: 'EchoStrings',
    authorAvatar: 'guitar',
    timeAgo: '4 hours ago',
    category: 'music',
    title: 'Acoustic Fingerpicking Loop in D-Major',
    description: 'Spent 15 minutes improvising a peaceful chord progression on the nylon guitar. Just keeping the rhythm gentle and uncluttered.',
    audioNote: 'Acoustic Loop (0:45)',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    likesCount: 38,
    commentsCount: 3,
    saved: true,
    liked: true
  });

  console.log('SEERA Database successfully seeded!');
}
