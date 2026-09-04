import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { ProgressBar } from '../components/common/ProgressBar';
import { PageHeader } from '../components/common/PageHeader';
import { mockGoalsService } from '../services/mockGoals';
import {
  Target, Plus, CheckCircle2, Circle, Clock, Pause, Play,
  Trash2, Edit3, Sparkles, Calendar, Layers, Check
} from 'lucide-react';

export const GoalsPage = () => {
  const { showToast, navigateTo } = useApp();
  const [goals, setGoals] = useState(() => mockGoalsService.getGoals());
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'active' | 'completed' | 'paused'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New goal form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('career');
  const [newDeadline, setNewDeadline] = useState('2026-10-31');
  const [newFrequency, setNewFrequency] = useState('3 times / week');
  const [newNotes, setNewNotes] = useState('');
  const [newMilestones, setNewMilestones] = useState(['', '', '']);

  const filteredGoals = goals.filter(g => {
    if (activeFilter === 'all') return true;
    return g.status === activeFilter;
  });

  const handleToggleMilestone = (goalId, milestoneId) => {
    const updated = mockGoalsService.toggleMilestone(goalId, milestoneId);
    setGoals(updated);
    showToast('Milestone progress updated 🌱', 'success');
  };

  const handleStatusChange = (goalId, newStatus) => {
    const updated = mockGoalsService.updateGoalStatus(goalId, newStatus);
    setGoals(updated);
    showToast(`Goal marked as ${newStatus}`, 'info');
  };

  const handleDeleteGoal = (goalId) => {
    if (window.confirm('Remove this goal from your active dashboard?')) {
      const updated = mockGoalsService.deleteGoal(goalId);
      setGoals(updated);
      showToast('Goal removed', 'info');
    }
  };

  const handleMilestoneInputChange = (index, value) => {
    const next = [...newMilestones];
    next[index] = value;
    setNewMilestones(next);
  };

  const handleAddMilestoneField = () => {
    setNewMilestones([...newMilestones, '']);
  };

  const handleCreateGoalSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const validMilestones = newMilestones.filter(m => m.trim().length > 0);
    const created = mockGoalsService.createGoal({
      title: newTitle.trim(),
      category: newCategory,
      categoryLabel: newCategory === 'career' ? 'Career & VLSI' : newCategory === 'hobbies' ? 'Creative Hobbies' : 'Emotional Wellbeing',
      deadline: newDeadline,
      frequency: newFrequency,
      notes: newNotes,
      milestones: validMilestones.length > 0 ? validMilestones : ['Initial exploratory session']
    });

    setGoals(mockGoalsService.getGoals());
    showToast('New goal created with milestones!', 'success');
    setIsCreateModalOpen(false);
    // Reset
    setNewTitle('');
    setNewNotes('');
    setNewMilestones(['', '', '']);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader
        title="Goals & Milestones"
        subtitle="Break major aspirations into manageable, low-pressure steps."
        badge="Progress Tracking"
        actions={
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Goal
          </Button>
        }
      />

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'all', label: 'All Goals', count: goals.length },
          { id: 'active', label: 'In Progress', count: goals.filter(g => g.status === 'active').length },
          { id: 'completed', label: 'Completed', count: goals.filter(g => g.status === 'completed').length },
          { id: 'paused', label: 'Paused', count: goals.filter(g => g.status === 'paused').length },
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeFilter === filter.id
                ? 'bg-sage-600 text-white shadow-soft'
                : 'bg-white border border-cream-200 text-clay-700 hover:bg-cream-100'
            }`}
          >
            <span>{filter.label}</span>
            <span className="ml-1.5 opacity-70">({filter.count})</span>
          </button>
        ))}
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGoals.map((goal) => {
          const completedCount = goal.milestones.filter(m => m.completed).length;
          const totalCount = goal.milestones.length;
          const pct = Math.round((completedCount / (totalCount || 1)) * 100);

          return (
            <Card key={goal.id} className="p-6 space-y-5 bg-white flex flex-col justify-between">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-sage-100 text-sage-800 px-2 py-0.5 rounded">
                        {goal.categoryLabel}
                      </span>
                      <span className="text-xs text-clay-700 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-clay-700" />
                        <span>{goal.frequency}</span>
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-clay-900 leading-snug">
                      {goal.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {goal.status === 'active' ? (
                      <button
                        onClick={() => handleStatusChange(goal.id, 'paused')}
                        className="p-1.5 text-clay-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg"
                        title="Pause Goal"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(goal.id, 'active')}
                        className="p-1.5 text-clay-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg"
                        title="Resume Goal"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="p-1.5 text-clay-700 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                      title="Delete Goal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {goal.notes && (
                  <p className="text-xs text-clay-700 leading-relaxed bg-cream-50 p-3 rounded-xl border border-cream-200">
                    {goal.notes}
                  </p>
                )}

                {/* Progress Bar */}
                <ProgressBar
                  value={completedCount}
                  max={totalCount}
                  label={`${completedCount} of ${totalCount} Milestones (${pct}%)`}
                />

                {/* Milestones List */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-bold text-clay-700 uppercase tracking-wider">
                    Milestones
                  </div>
                  {goal.milestones.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleToggleMilestone(goal.id, m.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs flex items-start gap-3 transition-all ${
                        m.completed
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                          : 'bg-white border-cream-200 hover:bg-cream-50 text-clay-800'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                        m.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-cream-400 bg-white'
                      }`}>
                        {m.completed && <Check className="w-3 h-3" />}
                      </div>
                      <div className="flex-1">
                        <div className={m.completed ? 'line-through text-clay-700 font-medium' : 'font-semibold'}>
                          {m.title}
                        </div>
                        {m.completedAt && (
                          <div className="text-[10px] text-emerald-700 mt-0.5">Cleared on {m.completedAt}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal Footer info */}
              <div className="flex items-center justify-between pt-4 border-t border-cream-100 text-[11px] text-clay-700">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-sage-600" />
                  <span>Target: {goal.deadline}</span>
                </span>
                <span className={`px-2 py-0.5 rounded-full font-bold capitalize ${
                  goal.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : goal.status === 'paused' ? 'bg-amber-100 text-amber-800' : 'bg-sage-100 text-sage-800'
                }`}>
                  {goal.status}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Create Goal Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create a New Goal"
        subtitle="Set clear intentions with step-by-step milestones."
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleCreateGoalSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-1">
              Goal Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Master Mealy & Moore State Machines"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm text-clay-900 focus:outline-none focus:ring-2 focus:ring-sage-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-xl text-xs text-clay-900"
              >
                <option value="career">Career & VLSI</option>
                <option value="education">Education & Academics</option>
                <option value="hobbies">Creative Hobbies</option>
                <option value="emotional_wellbeing">Emotional Wellbeing</option>
                <option value="fitness">Fitness & Movement</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-1">
                Target Deadline
              </label>
              <input
                type="date"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-xl text-xs text-clay-900"
              >
              </input>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-1">
              Pacing / Frequency
            </label>
            <input
              type="text"
              placeholder="e.g. 3 sessions / week, 20 min daily"
              value={newFrequency}
              onChange={(e) => setNewFrequency(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs text-clay-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-1">
              Personal Note / Context
            </label>
            <textarea
              rows={2}
              placeholder="Why this goal matters to you right now..."
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs text-clay-900"
            />
          </div>

          {/* Milestones */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider">
                Step-by-Step Milestones
              </label>
              <button
                type="button"
                onClick={handleAddMilestoneField}
                className="text-xs text-sage-700 hover:text-sage-900 font-bold"
              >
                + Add Milestone
              </button>
            </div>
            {newMilestones.map((m, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Milestone ${idx + 1}...`}
                value={m}
                onChange={(e) => handleMilestoneInputChange(idx, e.target.value)}
                className="w-full px-3 py-2 bg-white border border-cream-300 rounded-xl text-xs text-clay-900"
              />
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-cream-100">
            <Button variant="secondary" size="md" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" icon={CheckCircle2}>
              Create Goal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
