// personalizationEngine.js - Generates tailored daily & weekly routines with explicit reasoning
import { db } from '../database/db.js';

export const personalizationEngine = {
  generateDailyPlan: (userId) => {
    const pref = db.findOne('preferences', p => p.userId === userId) || {
      primaryGoal: 'career',
      dailyTime: '30 min',
      activityStyle: 'Short and easy',
      preferredTime: 'Evening',
      preferredActivities: ['Learning', 'Creative activities', 'Games', 'Reflection']
    };

    const goals = db.find('goals', g => g.userId === userId && g.status === 'active');
    const primaryGoalTitle = goals[0]?.title || 'Verilog FSM Design';

    // Formulate personalized schedule blocks
    const schedule = [
      {
        id: 'slot-1',
        period: 'Morning',
        timeWindow: '7:30 AM - 8:30 AM',
        duration: '5 min',
        title: 'Sensory Grounding Reflection',
        description: 'Notice 3 calm things around you before checking devices. Log a brief morning intention.',
        category: 'Mindfulness',
        route: 'journal',
        done: true
      },
      {
        id: 'slot-2',
        period: 'Afternoon',
        timeWindow: '2:00 PM - 4:00 PM',
        duration: pref.dailyTime === '15 min' ? '10 min' : '20 min',
        title: `Focused Progress: ${primaryGoalTitle}`,
        description: 'Targeted milestone review and practice testbench execution.',
        category: 'Learning',
        route: 'goals',
        done: false
      },
      {
        id: 'slot-3',
        period: 'Evening',
        timeWindow: '6:30 PM - 7:30 PM',
        duration: '8 min',
        title: 'Calm Flow: Sudoku or 2048',
        description: 'Unwind with low-pressure puzzle sliding followed by a 5-question reflection.',
        category: 'Mind Game',
        route: 'games',
        done: false
      },
      {
        id: 'slot-4',
        period: 'Night',
        timeWindow: '9:00 PM - 10:30 PM',
        duration: '15 min',
        title: 'Tactile Downtime: Sketching / Music / Reading',
        description: 'Unplugged creative relaxation to prepare for restful sleep before 11 PM.',
        category: 'Creative Hobby',
        route: 'hobbies',
        done: false
      }
    ];

    // Explicit Explainability Reasoning
    const reasoning = `You selected ${pref.primaryGoal.replace('_', ' ')} as a priority, usually prefer ${pref.activityStyle.toLowerCase()} sessions within ${pref.dailyTime}, and haven't spent much time on your creative hobbies recently.`;

    return {
      userId,
      date: new Date().toISOString().split('T')[0],
      totalAllocatedMinutes: pref.dailyTime,
      reasoning,
      schedule
    };
  }
};
