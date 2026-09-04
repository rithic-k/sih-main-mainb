import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useRoutine } from '../context/RoutineContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { PageHeader } from '../components/common/PageHeader';
import { mockGoalsService } from '../services/mockGoals';
import { mockGamesService } from '../services/mockGames';
import { mockHobbiesService } from '../services/mockHobbies';
import { mockFlashcardsService } from '../services/mockFlashcards';
import {
  Sparkles, Target, Gamepad2, BookOpen, Palette, Layers,
  CheckCircle2, Clock, ArrowRight, Play, Compass, ChevronRight,
  TrendingUp, Calendar, Heart
} from 'lucide-react';

export const DashboardPage = () => {
  const { activeUser, userPrefs, navigateTo } = useApp();
  const { dailyProductiveMinutes, formatTimer, isFocusRunning, startFocusTimer } = useRoutine();

  const [goals, setGoals] = useState(() => mockGoalsService.getGoals());
  const [gameStats, setGameStats] = useState(() => mockGamesService.getStats());
  const [hobbyMonitor, setHobbyMonitor] = useState(() => mockHobbiesService.getHobbyMonitorData());

  // Greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Primary active goal
  const primaryGoalObj = goals.find(g => g.id === 'goal-verilog-fsm') || goals[0];
  const completedMilestones = primaryGoalObj?.milestones?.filter(m => m.completed).length || 0;
  const totalMilestones = primaryGoalObj?.milestones?.length || 1;
  const progressPercent = Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner & Warm Greeting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-sage-50 via-white to-sand-50 p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-sage-800 bg-sage-100 px-3 py-1 rounded-full">
              Day 52 of 60-Day Rhythm
            </span>
            <span className="text-xs text-clay-700">🌱 Gentle Growth Mode</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-clay-900">
            {getGreeting()}, {activeUser.displayName} 🌱
          </h1>
          <p className="text-xs sm:text-sm text-clay-700 max-w-xl">
            Here is your balanced flow for today. 30 minutes planned across learning, mindful play, and evening creative time.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            icon={Play}
            onClick={() => navigateTo('plan')}
          >
            Start Today's Flow
          </Button>
          <Button
            variant="outline"
            size="md"
            icon={Target}
            onClick={() => navigateTo('goals')}
          >
            View Goals
          </Button>
        </div>
      </div>

      {/* AI Explanation Card: "Why this plan?" */}
      <Card variant="accent" className="border-sage-300/80">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-sage-600 text-white rounded-2xl shrink-0 mt-0.5 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-clay-900">Why this plan today?</h3>
              <span className="text-[11px] font-semibold text-sage-800 bg-sage-100 px-2.5 py-0.5 rounded-full">
                Adaptive Reasoning
              </span>
            </div>
            <p className="text-xs sm:text-sm text-clay-700 leading-relaxed">
              "You selected <strong>Career & VLSI</strong> as a priority, prefer <strong>short 20-minute sessions</strong>, and haven't spent much time on your <strong>creative sketching hobby</strong> over the last two days."
            </p>
          </div>
        </div>
      </Card>

      {/* Grid: Daily Focus & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Personalized Timeline (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-cream-100 pb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-clay-900">Today's Personalized Routine</h3>
                <p className="text-xs text-clay-700 mt-0.5">30-minute balanced sequence tailored to your energy</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigateTo('plan')}>
                Full Plan →
              </Button>
            </div>

            <div className="space-y-3">
              {[
                {
                  period: 'Morning',
                  time: '5 min',
                  title: 'Sensory Grounding Reflection',
                  type: 'Mindfulness',
                  icon: BookOpen,
                  color: 'bg-blue-50 text-blue-800 border-blue-200',
                  done: true,
                  action: () => navigateTo('journal')
                },
                {
                  period: 'Afternoon',
                  time: '20 min',
                  title: 'Verilog FSM: Sequence Detector Milestone',
                  type: 'Learning',
                  icon: Target,
                  color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                  done: false,
                  action: () => navigateTo('goals')
                },
                {
                  period: 'Evening',
                  time: '8 min',
                  title: 'Play 2048 or Gentle Sudoku',
                  type: 'Mind Game',
                  icon: Gamepad2,
                  color: 'bg-amber-50 text-amber-800 border-amber-200',
                  done: false,
                  action: () => navigateTo('games')
                },
                {
                  period: 'Night',
                  time: '15 min',
                  title: 'Botanical Drawing / Acoustic Music',
                  type: 'Hobby',
                  icon: Palette,
                  color: 'bg-terracotta-50 text-terracotta-800 border-terracotta-200',
                  done: false,
                  action: () => navigateTo('hobbies')
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      item.done ? 'bg-cream-50/50 border-cream-200 opacity-75' : 'bg-white border-cream-200 hover:border-sage-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2.5 rounded-xl border ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-clay-700">
                            {item.period} • {item.time}
                          </span>
                          {item.done && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                              Done
                            </span>
                          )}
                        </div>
                        <h4 className={`text-sm font-bold ${item.done ? 'line-through text-clay-700' : 'text-clay-900'}`}>
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    <Button
                      variant={item.done ? 'ghost' : 'subtle'}
                      size="sm"
                      onClick={item.action}
                    >
                      {item.done ? 'Review' : 'Start'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Goal Progress Highlight Card */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-clay-900">Active Priority Goal</h3>
                  <p className="text-xs text-clay-700">{primaryGoalObj.title}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {progressPercent}% Complete
              </span>
            </div>

            <ProgressBar value={completedMilestones} max={totalMilestones} label={`${completedMilestones} of ${totalMilestones} Milestones Cleared`} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {primaryGoalObj.milestones.slice(0, 4).map(m => (
                <div key={m.id} className="text-xs p-2.5 rounded-xl bg-cream-50 flex items-center gap-2 border border-cream-200">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${m.completed ? 'text-emerald-600' : 'text-cream-400'}`} />
                  <span className={`truncate ${m.completed ? 'text-clay-700' : 'font-medium text-clay-900'}`}>
                    {m.title}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Widgets & Recommendations (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Hobby Engagement Monitor Card */}
          <Card variant="terracottaSubtle" className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-terracotta-800 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                <span>Hobby Reminder</span>
              </span>
              <span className="text-[10px] text-terracotta-700">{hobbyMonitor.lastHobbyDate}</span>
            </div>
            <h4 className="font-serif font-bold text-base text-clay-900 leading-snug">
              {hobbyMonitor.headline}
            </h4>
            <p className="text-xs text-clay-700 leading-relaxed">
              {hobbyMonitor.subtext}
            </p>
            <Button
              variant="terracotta"
              size="sm"
              className="w-full"
              onClick={() => navigateTo('hobbies')}
            >
              Take 20 min for yourself
            </Button>
          </Card>

          {/* Mind Game Recommendation Card */}
          <Card className="p-5 space-y-3 bg-sand-50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sage-800 uppercase tracking-wider flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Calm Mind Game</span>
              </span>
              <span className="text-[10px] text-sage-700">{gameStats.calmStreakDays} day streak</span>
            </div>
            <h4 className="font-serif font-bold text-base text-clay-900">
              Gentle Sudoku & 2048
            </h4>
            <p className="text-xs text-clay-700 leading-relaxed">
              Low-pressure focus puzzles followed by a 5-question reflection to anchor your mindset.
            </p>
            <div className="flex gap-2">
              <Button
                variant="subtle"
                size="sm"
                className="flex-1"
                onClick={() => navigateTo('games')}
              >
                Play Sudoku
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => navigateTo('games')}
              >
                Play 2048
              </Button>
            </div>
          </Card>

          {/* Flashcard Mastery Widget */}
          <Card className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Flashcards</span>
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                VLSI Design
              </span>
            </div>
            <h4 className="font-serif font-bold text-sm text-clay-900">
              Verilog FSM: Mealy vs Moore Concepts
            </h4>
            <p className="text-xs text-clay-700">
              Reinforce 3-block coding styles and state register definitions before tomorrow.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => navigateTo('flashcards')}
            >
              Review 6 Cards
            </Button>
          </Card>

          {/* Reflection Prompt Card */}
          <Card className="p-5 space-y-3 bg-white border-l-4 border-l-sage-600">
            <div className="flex items-center gap-2 text-xs font-bold text-clay-900">
              <BookOpen className="w-4 h-4 text-sage-600" />
              <span>Evening Reflection Prompt</span>
            </div>
            <p className="text-xs italic text-clay-700 leading-relaxed">
              "What is one moment from today that felt gentle, grounded, or genuinely interesting?"
            </p>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => navigateTo('journal')}
              >
                Write it out
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => navigateTo('journal')}
              >
                Talk it out (Mic)
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
