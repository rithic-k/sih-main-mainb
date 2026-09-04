import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageHeader } from '../components/common/PageHeader';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  Sun, Sunset, Moon, Coffee, Sparkles, CheckCircle2, Play,
  BookOpen, Target, Gamepad2, Palette, Clock, Check
} from 'lucide-react';

export const DailyPlanPage = () => {
  const { navigateTo, userPrefs, activeUser } = useApp();

  const [planItems, setPlanItems] = useState([
    {
      id: 'plan-1',
      period: 'Morning',
      timeWindow: '7:30 AM - 8:30 AM',
      duration: '5 min',
      title: '5-Minute Quiet Reflection',
      description: 'Step outside or look out the window. Log one gentle intention or thought for the day.',
      category: 'Mindfulness',
      icon: Sun,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      completed: true,
      route: 'journal'
    },
    {
      id: 'plan-2',
      period: 'Afternoon',
      timeWindow: '2:00 PM - 4:00 PM',
      duration: '20 min',
      title: 'Focused Learning Session: Verilog FSMs',
      description: 'Review state transition diagrams and complete the Sequence Detector simulation testbench.',
      category: 'Learning',
      icon: Target,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      completed: true,
      route: 'goals'
    },
    {
      id: 'plan-3',
      period: 'Evening',
      timeWindow: '6:30 PM - 7:30 PM',
      duration: '10 min',
      title: 'Mind Flow: Play 2048 & Complete Reflection',
      description: 'Unwind with a low-pressure puzzle session followed by the 5-question mindset check-in.',
      category: 'Mind Game',
      icon: Gamepad2,
      color: 'bg-blue-50 text-blue-800 border-blue-200',
      completed: false,
      route: 'games'
    },
    {
      id: 'plan-4',
      period: 'Night',
      timeWindow: '9:00 PM - 10:30 PM',
      duration: '20 min',
      title: 'Tactile Downtime: Botanical Sketching / Music',
      description: 'Screen-free relaxation. Practice leaf shading in your sketchbook or play acoustic chords.',
      category: 'Creative Hobby',
      icon: Palette,
      color: 'bg-terracotta-50 text-terracotta-800 border-terracotta-200',
      completed: false,
      route: 'hobbies'
    }
  ]);

  const toggleComplete = (id) => {
    setPlanItems(prev => prev.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = planItems.filter(i => i.completed).length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader
        title="Your Personalized Daily Plan"
        subtitle={`Tailored around your ${userPrefs.dailyTime} daily commitment and ${userPrefs.activityStyle} style.`}
        badge="Adaptive Daily Routine"
      />

      {/* Overview progress card */}
      <Card className="p-6 bg-sand-50/80 border-cream-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-sage-800">
              Today's Rhythm Progress
            </div>
            <div className="font-serif text-xl font-bold text-clay-900">
              {completedCount} of {planItems.length} Activities Completed
            </div>
            <p className="text-xs text-clay-700">
              Take your time. There are no penalties or broken streaks for adjusting your pace.
            </p>
          </div>
          <div className="w-full sm:w-64">
            <ProgressBar value={completedCount} max={planItems.length} color="sage" />
          </div>
        </div>
      </Card>

      {/* Plan Items Timeline */}
      <div className="space-y-4">
        {planItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.id}
              className={`p-6 transition-all ${
                item.completed ? 'bg-white/60 border-cream-200' : 'bg-white shadow-soft border-cream-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(item.id)}
                    className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center shrink-0 mt-1 transition-all ${
                      item.completed
                        ? 'bg-sage-600 border-sage-600 text-white'
                        : 'border-cream-300 hover:border-sage-400 bg-white'
                    }`}
                    title={item.completed ? 'Mark uncompleted' : 'Mark completed'}
                  >
                    {item.completed && <Check className="w-4 h-4" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.color}`}>
                        {item.period} • {item.duration}
                      </span>
                      <span className="text-xs text-clay-700 font-medium">
                        {item.timeWindow}
                      </span>
                      <span className="text-[10px] text-sage-800 bg-sage-50 px-2 py-0.5 rounded font-semibold">
                        {item.category}
                      </span>
                    </div>

                    <h3 className={`font-serif text-lg font-bold ${item.completed ? 'line-through text-clay-700' : 'text-clay-900'}`}>
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-clay-700 leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Button
                    variant={item.completed ? 'ghost' : 'primary'}
                    size="sm"
                    icon={Play}
                    onClick={() => navigateTo(item.route)}
                  >
                    {item.completed ? 'Revisit' : 'Start Now'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
