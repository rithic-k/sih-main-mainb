// mockJournal.js - Reflection & Journaling service (Text & Realistic Voice simulator)
const STORAGE_KEY_JOURNAL = 'seera_journal_entries';

export const INITIAL_JOURNAL_ENTRIES = [
  {
    id: 'entry-1',
    title: 'Designing the FSM and finding evening stillness',
    date: '2026-09-03',
    time: '21:40',
    mode: 'text', // 'text' | 'voice'
    content: "Today I got the Mealy state machine simulation to produce clean waveform transitions without glitches. It felt very satisfying to see the testbench pass. Afterwards, I went for a 15-minute walk outside instead of scrolling. The cool breeze helped reset my thoughts before night.",
    tags: ['Learning', 'Engineering', 'Stillness'],
    audioDuration: null,
    sentimentPattern: 'focused_constructive',
    promptUsed: 'What brought a sense of small progress or quiet accomplishment to your day?'
  },
  {
    id: 'entry-2',
    title: 'Voice Note: Letting go of perfectionism in sketching',
    date: '2026-09-01',
    time: '20:15',
    mode: 'voice',
    content: "I started drawing the ficus leaves on my desk. At first, I felt annoyed because the proportions were slightly off, but then I remembered that nature isn't symmetrical. Spending 20 minutes without checking my phone was deeply refreshing.",
    tags: ['Art', 'Creative', 'Mindfulness'],
    audioDuration: '01:42',
    sentimentPattern: 'reflective_creative',
    promptUsed: 'How did your creative activity feel today?'
  },
  {
    id: 'entry-3',
    title: 'Midweek check-in: Balancing college projects and rest',
    date: '2026-08-28',
    time: '19:30',
    mode: 'text',
    content: "Classes were somewhat intense today with the lab deadlines. Taking a 5-minute breather before jumping into the evening tasks kept me from feeling scattered. Looking forward to tomorrow's 2048 game and music listening.",
    tags: ['Coursework', 'Balance', 'Habits'],
    audioDuration: null,
    sentimentPattern: 'steady_growth',
    promptUsed: 'Where did you notice your energy going today?'
  }
];

export const MOCK_VOICE_TRANSCRIPTS = [
  "I took a short pause this afternoon when things felt a bit busy. Just stepped away from the monitor, listened to some acoustic tracks, and drank some warm tea. It helped me refocus on what really mattered.",
  "Working on my goals today made me realize how much difference a consistent 20 minutes makes compared to trying to cram everything in one weekend. Feeling calm and ready for the evening.",
  "I noticed my thoughts were running ahead to next week's assignments. Talking it out here helps put things in perspective. One step at a time.",
  "Today was quite creative. I spent half an hour testing different color palettes for my notebook headers. Simple things like that bring a lot of joy."
];

export const JOURNAL_PROMPTS = [
  { id: 'p1', label: 'Daily Unwind', text: 'What is one moment from today that felt gentle, grounded, or genuinely interesting?' },
  { id: 'p2', label: 'Growth & Learning', text: 'What new concept or skill challenged your curiosity today, and how did you approach it?' },
  { id: 'p3', label: 'Letting Go', text: 'What is one lingering worry or expectation you can set aside for tonight?' },
  { id: 'p4', label: 'Creative Spark', text: 'What idea, song, image, or conversation caught your attention recently?' }
];

export const mockJournalService = {
  getEntries: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_JOURNAL);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(INITIAL_JOURNAL_ENTRIES));
    return INITIAL_JOURNAL_ENTRIES;
  },

  addEntry: (entryData) => {
    const entries = mockJournalService.getEntries();
    const newEntry = {
      id: `entry-${Date.now()}`,
      title: entryData.title || (entryData.mode === 'voice' ? 'Voice Reflection' : 'Evening Reflection'),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: entryData.mode || 'text',
      content: entryData.content,
      tags: entryData.tags || ['Reflection'],
      audioDuration: entryData.audioDuration || null,
      sentimentPattern: 'reflective_growth',
      promptUsed: entryData.promptUsed || 'Free Reflection'
    };
    const updated = [newEntry, ...entries];
    localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(updated));
    return newEntry;
  },

  deleteEntry: (entryId) => {
    const entries = mockJournalService.getEntries();
    const updated = entries.filter(e => e.id !== entryId);
    localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(updated));
    return updated;
  },

  getReflectionInsights: () => {
    const entries = mockJournalService.getEntries();
    return {
      topThemes: ['Coursework & Learning', 'Creative Hobbies', 'Evening Wind-down', 'Focus & Habits'],
      summaryObservation: 'Your recent reflections frequently highlight creative problem solving, steady project momentum, and regular evening stillness.',
      totalReflections: entries.length,
      voiceToTextRatio: '33% Voice / 67% Written',
      nonClinicalNote: 'Patterns reflect self-reported topics over your recent sessions.'
    };
  },

  getRandomVoiceTranscript: () => {
    const randomIndex = Math.floor(Math.random() * MOCK_VOICE_TRANSCRIPTS.length);
    return MOCK_VOICE_TRANSCRIPTS[randomIndex];
  }
};
