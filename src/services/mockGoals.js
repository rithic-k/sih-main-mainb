// mockGoals.js - Goal management, milestones, tracking, and presets
const STORAGE_KEY_GOALS = 'seera_user_goals';

export const INITIAL_GOALS = [
  {
    id: 'goal-verilog-fsm',
    title: 'Learn Verilog FSM Design',
    category: 'career',
    categoryLabel: 'Career & VLSI',
    deadline: '2026-09-30',
    frequency: '3 sessions / week',
    status: 'active', // 'active' | 'paused' | 'completed'
    color: 'emerald',
    notes: 'Mastering Finite State Machines for digital circuit design and upcoming tech interviews.',
    milestones: [
      { id: 'm1', title: 'Understand FSM basics & state transition diagrams', completed: true, completedAt: '2026-08-10' },
      { id: 'm2', title: 'Implement Mealy FSM in Verilog', completed: true, completedAt: '2026-08-18' },
      { id: 'm3', title: 'Implement Moore FSM in Verilog', completed: true, completedAt: '2026-08-25' },
      { id: 'm4', title: 'Build sequence detector with testbench simulation', completed: false, completedAt: null },
      { id: 'm5', title: 'Complete mini project: Traffic Light Controller', completed: false, completedAt: null }
    ]
  },
  {
    id: 'goal-sketching-nature',
    title: 'Daily 15-Minute Botanical Sketching',
    category: 'hobbies',
    categoryLabel: 'Creative Hobbies',
    deadline: '2026-10-15',
    frequency: 'Daily',
    status: 'active',
    color: 'amber',
    notes: 'Relaxing after screen work by sketching indoor plants and leaves with graphite.',
    milestones: [
      { id: 'm201', title: 'Set up sketchbook and 2B/4B pencils', completed: true, completedAt: '2026-08-01' },
      { id: 'm202', title: 'Practice leaf vein cross-hatching', completed: true, completedAt: '2026-08-12' },
      { id: 'm203', title: 'Complete 10 quick plant silhouettes', completed: false, completedAt: null },
      { id: 'm204', title: 'Share 1 piece anonymously on Hobby Hub', completed: false, completedAt: null }
    ]
  },
  {
    id: 'goal-calm-sleep',
    title: 'Wind-down Routine & 11 PM Sleep',
    category: 'emotional_wellbeing',
    categoryLabel: 'Emotional Wellbeing',
    deadline: '2026-09-20',
    frequency: '5 days / week',
    status: 'active',
    color: 'blue',
    notes: 'Gentle screen cut-off at 10:30 PM with 5-minute breathing or evening audio reflection.',
    milestones: [
      { id: 'm301', title: 'Set phone break reminders at 10:15 PM', completed: true, completedAt: '2026-08-15' },
      { id: 'm302', title: '5 consecutive nights of screen-free winding down', completed: true, completedAt: '2026-08-22' },
      { id: 'm303', title: 'Maintain 2 weeks of steady rest without late-night alerts', completed: false, completedAt: null }
    ]
  }
];

export const mockGoalsService = {
  getGoals: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GOALS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error loading goals from localStorage:', e);
    }
    localStorage.setItem(STORAGE_KEY_GOALS, JSON.stringify(INITIAL_GOALS));
    return INITIAL_GOALS;
  },

  saveGoals: (goals) => {
    localStorage.setItem(STORAGE_KEY_GOALS, JSON.stringify(goals));
    return goals;
  },

  createGoal: (goalData) => {
    const goals = mockGoalsService.getGoals();
    const newGoal = {
      id: `goal-${Date.now()}`,
      title: goalData.title,
      category: goalData.category || 'personal_growth',
      categoryLabel: goalData.categoryLabel || 'Personal Growth',
      deadline: goalData.deadline || '2026-10-30',
      frequency: goalData.frequency || '3 times / week',
      status: 'active',
      color: goalData.color || 'emerald',
      notes: goalData.notes || '',
      milestones: (goalData.milestones || []).map((m, idx) => ({
        id: `m-${Date.now()}-${idx}`,
        title: typeof m === 'string' ? m : m.title,
        completed: false,
        completedAt: null
      }))
    };
    const updated = [newGoal, ...goals];
    mockGoalsService.saveGoals(updated);
    return newGoal;
  },

  toggleMilestone: (goalId, milestoneId) => {
    const goals = mockGoalsService.getGoals();
    const updated = goals.map(g => {
      if (g.id !== goalId) return g;
      const updatedMilestones = g.milestones.map(m => {
        if (m.id !== milestoneId) return m;
        const willBeCompleted = !m.completed;
        return {
          ...m,
          completed: willBeCompleted,
          completedAt: willBeCompleted ? new Date().toISOString().split('T')[0] : null
        };
      });
      // Check if all are completed
      const allDone = updatedMilestones.length > 0 && updatedMilestones.every(m => m.completed);
      return {
        ...g,
        milestones: updatedMilestones,
        status: allDone ? 'completed' : (g.status === 'completed' ? 'active' : g.status)
      };
    });
    mockGoalsService.saveGoals(updated);
    return updated;
  },

  updateGoalStatus: (goalId, newStatus) => {
    const goals = mockGoalsService.getGoals();
    const updated = goals.map(g => g.id === goalId ? { ...g, status: newStatus } : g);
    mockGoalsService.saveGoals(updated);
    return updated;
  },

  deleteGoal: (goalId) => {
    const goals = mockGoalsService.getGoals();
    const updated = goals.filter(g => g.id !== goalId);
    mockGoalsService.saveGoals(updated);
    return updated;
  }
};
