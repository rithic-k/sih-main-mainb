import React, { useState } from 'react';
import { useRoutine } from '../context/RoutineContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageHeader } from '../components/common/PageHeader';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  Clock, Play, Pause, RotateCcw, AlertCircle, Sparkles,
  Calendar, Flame, Moon, Sun, CheckCircle2, Shield
} from 'lucide-react';

export const ScreenTimePage = () => {
  const {
    focusSeconds, isFocusRunning, activePreset,
    startFocusTimer, pauseFocusTimer, resetFocusTimer, formatTimer,
    dailyProductiveMinutes, dailyEntertainmentMinutes, lateNightMinutes,
    breakReminderNotice
  } = useRoutine();

  const totalScreenMinutes = dailyProductiveMinutes + dailyEntertainmentMinutes + lateNightMinutes;

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader
        title="Screen Time & Mindful Routines"
        subtitle="Cultivate intentional digital boundaries. Rest and screen-free stillness are encouraged."
        badge="Digital Balance"
      />

      {/* Focus Timer Card */}
      <Card variant="accent" className="p-6 sm:p-10 text-center space-y-6 max-w-xl mx-auto border-sage-300">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-sage-800 bg-sage-100 px-3 py-1 rounded-full">
            Intentional Focus Block
          </span>
          <h3 className="font-serif text-2xl font-bold text-clay-900">
            {activePreset}-Minute Deep Session
          </h3>
          <p className="text-xs text-clay-700">Gentle countdown with automatic break reminders.</p>
        </div>

        {/* Digital Clock Display */}
        <div className="py-4">
          <div className="font-mono text-5xl sm:text-6xl font-bold text-clay-900 tracking-wider">
            {formatTimer(focusSeconds)}
          </div>
        </div>

        {/* Preset Selectors */}
        <div className="flex items-center justify-center gap-2">
          {[15, 25, 45, 60].map(mins => (
            <button
              key={mins}
              onClick={() => startFocusTimer(mins)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePreset === mins
                  ? 'bg-sage-600 text-white shadow-soft'
                  : 'bg-white border border-cream-200 text-clay-700 hover:bg-cream-100'
              }`}
            >
              {mins} min
            </button>
          ))}
        </div>

        {/* Play/Pause Controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {isFocusRunning ? (
            <Button variant="secondary" size="lg" icon={Pause} onClick={pauseFocusTimer}>
              Pause Focus
            </Button>
          ) : (
            <Button variant="primary" size="lg" icon={Play} onClick={() => startFocusTimer(activePreset)}>
              Start Focus Timer
            </Button>
          )}
          <Button variant="ghost" size="lg" icon={RotateCcw} onClick={resetFocusTimer}>
            Reset
          </Button>
        </div>
      </Card>

      {/* Daily Usage Distribution Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 bg-white space-y-2">
          <div className="flex items-center justify-between text-xs text-clay-700">
            <span>Productive Learning</span>
            <span className="font-bold text-emerald-700">{dailyProductiveMinutes} min</span>
          </div>
          <ProgressBar value={dailyProductiveMinutes} max={120} color="sage" />
          <span className="text-[11px] text-clay-700 block">Verilog study, reading & reflections</span>
        </Card>

        <Card className="p-5 bg-white space-y-2">
          <div className="flex items-center justify-between text-xs text-clay-700">
            <span>Relaxation & Play</span>
            <span className="font-bold text-amber-700">{dailyEntertainmentMinutes} min</span>
          </div>
          <ProgressBar value={dailyEntertainmentMinutes} max={60} color="amber" />
          <span className="text-[11px] text-clay-700 block">Sudoku, 2048 & hobby browsing</span>
        </Card>

        <Card className="p-5 bg-white space-y-2">
          <div className="flex items-center justify-between text-xs text-clay-700">
            <span>Late-Night Usage (Post 11 PM)</span>
            <span className="font-bold text-blue-700">{lateNightMinutes} min</span>
          </div>
          <ProgressBar value={lateNightMinutes} max={30} color="blue" />
          <span className="text-[11px] text-emerald-700 font-medium block">✓ Healthy bedtime maintained</span>
        </Card>
      </div>

      {/* Break & Health Notice */}
      <Card className="p-5 bg-sand-50 border-cream-200 flex items-start gap-3.5">
        <div className="p-2 bg-sage-100 text-sage-800 rounded-xl shrink-0 mt-0.5">
          <Clock className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-serif font-bold text-sm text-clay-900">
            Healthy Screen Philosophy
          </h4>
          <p className="text-xs text-clay-700 leading-relaxed">
            Unlike standard applications that maximize screen retention, SEERA actively reminds you when you have been focused for extended intervals. Stepping away for a quick physical stretch or water break supports sustained mental clarity.
          </p>
        </div>
      </Card>
    </div>
  );
};
