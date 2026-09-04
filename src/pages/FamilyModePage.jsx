import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageHeader } from '../components/common/PageHeader';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  Users, ShieldCheck, Heart, Sparkles, BookOpen, Target,
  Palette, Lock, AlertCircle, CheckCircle2, MessageSquare
} from 'lucide-react';

export const FamilyModePage = () => {
  const [activeYoungUser] = useState({
    code: 'Student #D442',
    nameTag: 'Young User (Age 16)',
    activeGoals: 'High School Lab Exam Prep & Botanical Ink Art',
    goalProgress: 72,
    weeklyActivityHours: 8.4,
    hobbyEngagement: 'Consistent (3+ hrs weekly sketching & music)',
    overallTrend: 'Steady balance with slight exam season compression'
  });

  const contextualFactors = [
    { label: 'Academic & Exam Pressure', level: 'Moderate', desc: 'Mid-term practicals in physics and computer science.', color: 'text-amber-800 bg-amber-50 border-amber-200' },
    { label: 'Family Communication Rhythm', level: 'Open & Warm', desc: 'Regular shared dinners and encouragement.', color: 'text-emerald-800 bg-emerald-50 border-emerald-200' },
    { label: 'Social Connection & Peers', level: 'Healthy', desc: 'Collaborates on weekend design and coding projects.', color: 'text-blue-800 bg-blue-50 border-blue-200' },
    { label: 'Rest & Home Environment', level: 'Supportive', desc: 'Quiet workspace provided with reasonable screen curfews.', color: 'text-sage-800 bg-sage-50 border-sage-200' }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader
        title="Family & Guardian Wellbeing Portal"
        subtitle="High-level supportive visibility for parents and guardians while safeguarding young user personal privacy."
        badge="Family Support Mode"
        badgeColor="bg-amber-100 text-amber-800 border-amber-200"
      />

      {/* Privacy Notice on Journal Contents */}
      <Card className="p-5 bg-sand-50 border-cream-300 flex items-start gap-3.5">
        <div className="p-2 bg-sage-100 text-sage-800 rounded-xl shrink-0 mt-0.5">
          <Lock className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-serif font-bold text-sm text-clay-900">
            Privacy Boundary Protection
          </h4>
          <p className="text-xs text-clay-700 leading-relaxed">
            To foster genuine trust and independent reflection, private journal entries, voice transcripts, and specific puzzle reflections remain strictly confidential. Guardians view aggregated goal progress and positive activity trends.
          </p>
        </div>
      </Card>

      {/* Young User Overview Card */}
      <Card className="p-6 sm:p-8 bg-white space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-2xl font-bold text-clay-900">{activeYoungUser.code}</h3>
              <span className="text-xs font-semibold bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
                {activeYoungUser.nameTag}
              </span>
            </div>
            <p className="text-xs text-clay-700">Active Focus: {activeYoungUser.activeGoals}</p>
          </div>

          <div className="text-right">
            <span className="text-xs text-clay-700 block">Overall Growth Trend</span>
            <span className="text-sm font-bold text-emerald-700">Stable & Constructive</span>
          </div>
        </div>

        {/* High-Level Engagement Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 space-y-2">
            <div className="flex justify-between text-xs text-clay-700">
              <span>Goal Milestones</span>
              <span className="font-bold text-clay-900">{activeYoungUser.goalProgress}%</span>
            </div>
            <ProgressBar value={activeYoungUser.goalProgress} max={100} color="sage" />
          </div>

          <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 space-y-2">
            <div className="flex justify-between text-xs text-clay-700">
              <span>Weekly Activity Hours</span>
              <span className="font-bold text-clay-900">{activeYoungUser.weeklyActivityHours} hrs</span>
            </div>
            <ProgressBar value={84} max={100} color="terracotta" />
          </div>

          <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 space-y-2">
            <div className="flex justify-between text-xs text-clay-700">
              <span>Hobby Balance</span>
              <span className="font-bold text-emerald-700">Active</span>
            </div>
            <ProgressBar value={90} max={100} color="sage" />
          </div>
        </div>
      </Card>

      {/* Environmental & Contextual Support Factors */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-xl text-clay-900">
            Environmental & Household Support Factors
          </h3>
          <p className="text-xs text-clay-700">
            Counsellors evaluate holistic lifestyle variables rather than clinical assumptions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contextualFactors.map((f, idx) => (
            <Card key={idx} className="p-5 bg-white space-y-2 border-cream-200">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-clay-900">{f.label}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${f.color}`}>
                  {f.level}
                </span>
              </div>
              <p className="text-xs text-clay-700 leading-relaxed">
                {f.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Support Tips for Guardians */}
      <Card className="p-6 bg-sand-50/70 space-y-3 border-cream-200">
        <h4 className="font-serif font-bold text-base text-clay-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sage-600" />
          <span>Supportive Suggestions for this Week</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-clay-700">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
            <span>Encourage 15-minute screen-free drawing breaks when studying for science exams.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
            <span>Celebrate the completion of the Verilog FSM milestone with an evening family walk.</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};
