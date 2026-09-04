import express from 'express';
import { db } from '../database/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const JOURNEY_MILESTONES = [
  { day: 1, title: 'Your Space Established', date: 'Day 1', description: 'Chosen anonymous profile (Moonlight27), selected priorities (Career + Emotional Wellbeing), and set a gentle 30-min daily target.', completed: true },
  { day: 7, title: 'Finding the Flow', date: 'Week 1', description: 'Completed 6 learning sessions and 3 mindful puzzles. Began regular evening reflections.', completed: true },
  { day: 14, title: 'First Milestone Reached', date: 'Week 2', description: 'Completed Verilog FSM basics milestone and logged first voice reflection.', completed: true },
  { day: 28, title: 'Creative Balance Formed', date: 'Week 4', description: 'Integrated botanical sketching alongside technical study. Hobby alerts helped prevent late-night fatigue.', completed: true },
  { day: 45, title: 'Deepening Self-Awareness', date: 'Week 6', description: 'Consistent 85% goal progress; pattern reflections showed clear preference for evening audio reflections.', completed: true },
  { day: 60, title: '60-Day Retrospective & Growth Synthesis', date: 'Day 60', description: 'A sustained window of intentional habits, projects advanced, and space created for creative downtime.', completed: true, isCurrent: true }
];

const JOURNEY_WEEKLY_TRENDS = [
  { week: 'W1', learningHrs: 2.5, hobbyHrs: 1.2, consistency: 72, reflectionScore: 6.8 },
  { week: 'W2', learningHrs: 3.2, hobbyHrs: 1.8, consistency: 80, reflectionScore: 7.4 },
  { week: 'W3', learningHrs: 4.0, hobbyHrs: 1.5, consistency: 78, reflectionScore: 7.1 },
  { week: 'W4', learningHrs: 3.8, hobbyHrs: 2.4, consistency: 86, reflectionScore: 8.0 },
  { week: 'W5', learningHrs: 4.5, hobbyHrs: 2.1, consistency: 90, reflectionScore: 8.3 },
  { week: 'W6', learningHrs: 4.1, hobbyHrs: 2.6, consistency: 88, reflectionScore: 8.1 },
  { week: 'W7', learningHrs: 4.8, hobbyHrs: 3.0, consistency: 94, reflectionScore: 8.6 },
  { week: 'W8', learningHrs: 5.0, hobbyHrs: 3.2, consistency: 96, reflectionScore: 8.9 },
];

const DAY_60_SYNTHESIS = {
  headline: "Look how far you've come.",
  subtext: "A 60-day reflection on your natural rhythms, habits built, and what brought real momentum.",
  overallStats: {
    totalActiveDays: 52,
    goalsMilestonesCompleted: 7,
    learningHours: 31.6,
    hobbiesLogged: 17.8,
    mindGamesSolved: 53,
    reflectionsCaptured: 46
  },
  retrospectivePillars: [
    {
      title: 'What seems to work for you',
      points: [
        'Short 20-30 minute focused blocks in the evening work significantly better than multi-hour marathons.',
        'Pairing deep logic (like Verilog FSM design) with tactile creative hobbies (botanical drawing) keeps mental fatigue low.',
        'Audio reflections help you process thoughts faster when typing feels heavy after long screen hours.'
      ]
    },
    {
      title: 'What changed over 60 days',
      points: [
        'Study sessions shifted from irregular late-night sprints to predictable 6:00 PM - 8:00 PM routines.',
        'Hobby engagement went from 0 hours in week 1 to consistent 3+ hours weekly.',
        'Your reflection focus shifted from exam worries to personal progress and creative curiosity.'
      ]
    },
    {
      title: 'What you’ve accomplished',
      points: [
        'Mastered 3 critical Verilog FSM milestone modules (Mealy & Moore state implementations).',
        'Built a 14-day steady mindfulness streak with calming mind games.',
        'Created and archived 12 botanical sketch studies and shared 3 in the Hobby Hub.'
      ]
    },
    {
      title: 'What you may want to focus on next',
      points: [
        'Complete the Traffic Light Controller mini-project sequence detector.',
        'Try scheduling 1 weekly unplugged outdoor movement hour on Saturday mornings.',
        'Continue exploring new acoustic chord progressions or creative writing prompts.'
      ]
    }
  ],
  nonClinicalStatement: 'This 60-day synthesis is based entirely on your logged activity, self-chosen milestones, and personal reflection inputs. It represents personal growth tracking without clinical or diagnostic claims.'
};

// GET /api/journey
router.get('/', authMiddleware, (req, res) => {
  res.json({
    success: true,
    milestones: JOURNEY_MILESTONES,
    trends: JOURNEY_WEEKLY_TRENDS,
    synthesis: DAY_60_SYNTHESIS
  });
});

export default router;
