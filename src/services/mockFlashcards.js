// mockFlashcards.js - Goal-oriented flashcards and mastery tracking
const STORAGE_KEY_FLASHCARDS = 'seera_flashcard_progress';

export const FLASHCARD_DECKS = [
  {
    id: 'deck-verilog',
    title: 'Verilog & VLSI Design',
    category: 'career',
    categoryLabel: 'Career & Tech',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    description: 'Master Mealy vs Moore FSMs, non-blocking assignments, and RTL simulation concepts.',
    totalCards: 6,
    cards: [
      {
        id: 'v1',
        difficulty: 'Easy',
        question: 'What is the fundamental difference between a Mealy and a Moore FSM?',
        answer: 'In a Moore machine, the output depends ONLY on the current state. In a Mealy machine, the output depends on BOTH the current state AND the current inputs.',
        hint: 'Think about output dependency on inputs.'
      },
      {
        id: 'v2',
        difficulty: 'Medium',
        question: 'Why are non-blocking assignments (<=) preferred in sequential always @(posedge clk) blocks?',
        answer: 'Non-blocking assignments evaluate their RHS simultaneously at the clock edge and schedule updates for the end of the simulation time-step, preventing race conditions between flip-flops.',
        hint: 'Consider delta simulation cycles and race conditions.'
      },
      {
        id: 'v3',
        difficulty: 'Medium',
        question: 'What is the 3-block coding style for an FSM in Verilog?',
        answer: 'Block 1: Sequential state register update (always @posedge clk). Block 2: Combinational next-state logic (always @*). Block 3: Combinational or registered output logic.',
        hint: 'State register, next state logic, output logic.'
      },
      {
        id: 'v4',
        difficulty: 'Hard',
        question: 'What is metastability in digital flip-flops and how is it mitigated across clock domains?',
        answer: 'Metastability occurs when setup or hold times are violated, causing the output to oscillate between valid logic states. It is mitigated using 2-stage or 3-stage flip-flop synchronizers (or asynchronous FIFOs).',
        hint: 'Setup/hold violation and synchronizers.'
      },
      {
        id: 'v5',
        difficulty: 'Easy',
        question: 'What keyword represents a combinational sensitivity list in modern Verilog/SystemVerilog?',
        answer: 'always @(*) or always_comb ensures all RHS variables are automatically added to the sensitivity list, preventing simulation-synthesis mismatches.',
        hint: 'Wildcard sensitivity.'
      },
      {
        id: 'v6',
        difficulty: 'Hard',
        question: 'How do you prevent inferred latches in combinational always blocks?',
        answer: 'Ensure every signal assigned in the block has a default assignment at the very beginning of the block, and that all if-else branches and case statements have complete, exhaustive branches/defaults.',
        hint: 'Default assignments and exhaustive branches.'
      }
    ]
  },
  {
    id: 'deck-mindfulness',
    title: 'Mindfulness & Grounding',
    category: 'emotional_wellbeing',
    categoryLabel: 'Emotional Wellbeing',
    badgeColor: 'bg-blue-100 text-blue-800',
    description: 'Cognitive grounding tools, breathing cadences, and self-compassion cues.',
    totalCards: 5,
    cards: [
      {
        id: 'm1',
        difficulty: 'Easy',
        question: 'What is the 5-4-3-2-1 sensory grounding technique?',
        answer: 'A technique to anchor in the present by acknowledging: 5 things you can see, 4 things you can physically feel, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.',
        hint: '5 senses in descending order.'
      },
      {
        id: 'm2',
        difficulty: 'Easy',
        question: 'What is Box Breathing (4-4-4-4) and when is it useful?',
        answer: 'Inhale for 4s -> Hold for 4s -> Exhale for 4s -> Hold empty for 4s. It regulates the autonomic nervous system to reduce heart rate and bring calm during high pressure.',
        hint: 'Equal 4-second quarters.'
      },
      {
        id: 'm3',
        difficulty: 'Medium',
        question: 'What is "Cognitive Defusion"?',
        answer: 'Viewing thoughts as passing mental events or words rather than absolute truths or commands. Example: "I am having the thought that I must be perfect" instead of "I must be perfect."',
        hint: 'Stepping back to observe thoughts.'
      },
      {
        id: 'm4',
        difficulty: 'Medium',
        question: 'What does the STOP acronym stand for in daily reflection?',
        answer: 'S = Stop what you are doing. T = Take a breath. O = Observe your physical and mental state. P = Proceed with intention and kindness.',
        hint: 'Stop, Take, Observe, Proceed.'
      },
      {
        id: 'm5',
        difficulty: 'Hard',
        question: 'How does self-compassion differ from self-esteem?',
        answer: 'Self-esteem relies on evaluation, comparisons, and perceived success. Self-compassion is unconditional kindness towards oneself during moments of struggle, failure, or imperfection.',
        hint: 'Kindness during failure vs evaluation of success.'
      }
    ]
  },
  {
    id: 'deck-fitness',
    title: 'Daily Movement & Posture',
    category: 'fitness',
    categoryLabel: 'Health & Habits',
    badgeColor: 'bg-rose-100 text-rose-800',
    description: 'Desk ergonomics, micro-stretches, hydration cues, and active recovery.',
    totalCards: 4,
    cards: [
      {
        id: 'f1',
        difficulty: 'Easy',
        question: 'What is the 20-20-20 rule for reducing digital eye strain?',
        answer: 'Every 20 minutes spent looking at a screen, look at an object at least 20 feet away for at least 20 seconds.',
        hint: '20 minutes, 20 feet, 20 seconds.'
      },
      {
        id: 'f2',
        difficulty: 'Easy',
        question: 'What is the "Thoracic Extension" stretch and why does it help desk workers?',
        answer: 'Arching gently over the back of your chair with hands behind your head. It counters the rounded-shoulder hunch from prolonged laptop typing.',
        hint: 'Upper back and chest opener.'
      },
      {
        id: 'f3',
        difficulty: 'Medium',
        question: 'Why is Zone 2 low-intensity walking beneficial for mental recovery?',
        answer: 'Zone 2 aerobic movement boosts cerebral blood flow and mitochondrial efficiency without elevating stress hormones (cortisol), facilitating clear thinking.',
        hint: 'Conversational pace aerobic benefits.'
      },
      {
        id: 'f4',
        difficulty: 'Medium',
        question: 'How does staying hydrated impact cognitive stamina during study blocks?',
        answer: 'Even mild dehydration (1-2% body mass loss) measurably reduces working memory, vigilance, and reaction times while increasing perceived fatigue.',
        hint: '1-2% fluid balance and working memory.'
      }
    ]
  },
  {
    id: 'deck-communication',
    title: 'Constructive Communication',
    category: 'relationships',
    categoryLabel: 'Relationships',
    badgeColor: 'bg-purple-100 text-purple-800',
    description: 'Active listening, empathetic feedback, and boundary setting.',
    totalCards: 4,
    cards: [
      {
        id: 'c1',
        difficulty: 'Easy',
        question: 'What is an "I-Statement" in constructive dialogue?',
        answer: 'Framing feelings around personal experience (e.g. "I feel overwhelmed when meetings run past schedule") instead of accusatory phrasing ("You always take too long").',
        hint: 'Expressing personal experience rather than blame.'
      },
      {
        id: 'c2',
        difficulty: 'Medium',
        question: 'What is the core principle of "Reflective Listening"?',
        answer: 'Paraphrasing what the speaker shared to confirm comprehension before offering advice or opinions (e.g. "It sounds like you felt unheard during the project review...").',
        hint: 'Mirroring meaning before responding.'
      },
      {
        id: 'c3',
        difficulty: 'Medium',
        question: 'How do you set a compassionate professional boundary?',
        answer: 'Acknowledge the request, state your limit clearly, and offer an alternative window (e.g. "I want to give this my full attention, but I am at capacity today. Can we review it tomorrow at 11 AM?").',
        hint: 'Acknowledge, state limit, offer alternative.'
      },
      {
        id: 'c4',
        difficulty: 'Hard',
        question: 'What is the difference between intent and impact in human conversations?',
        answer: 'Intent is what you hoped to convey; impact is how the listener experienced it emotionally. Mature communication acknowledges impact without getting defensive about original intent.',
        hint: 'What was meant vs how it felt.'
      }
    ]
  }
];

export const mockFlashcardsService = {
  getDecks: () => {
    return FLASHCARD_DECKS;
  },

  getDeckById: (deckId) => {
    return FLASHCARD_DECKS.find(d => d.id === deckId) || FLASHCARD_DECKS[0];
  },

  getProgress: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FLASHCARDS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    const defaultProgress = {
      masteredCards: ['v1', 'v2', 'm1', 'f1'],
      currentStreak: 4,
      accuracyRate: 88,
      totalReviewed: 34
    };
    localStorage.setItem(STORAGE_KEY_FLASHCARDS, JSON.stringify(defaultProgress));
    return defaultProgress;
  },

  markCardResult: (cardId, isCorrect) => {
    const progress = mockFlashcardsService.getProgress();
    const mastered = new Set(progress.masteredCards || []);
    if (isCorrect) {
      mastered.add(cardId);
    }
    const updated = {
      ...progress,
      masteredCards: Array.from(mastered),
      totalReviewed: (progress.totalReviewed || 0) + 1,
      currentStreak: isCorrect ? (progress.currentStreak || 0) + 1 : 0
    };
    localStorage.setItem(STORAGE_KEY_FLASHCARDS, JSON.stringify(updated));
    return updated;
  }
};
