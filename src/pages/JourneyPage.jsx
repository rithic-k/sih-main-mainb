import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageHeader } from '../components/common/PageHeader';
import { mockJourneyService } from '../services/mockJourney';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from 'recharts';
import {
  Award, Compass, TrendingUp, Sparkles, CheckCircle2,
  Calendar, BookOpen, Target, Palette, Gamepad2, Heart, Shield
} from 'lucide-react';

export const JourneyPage = () => {
  const milestones = mockJourneyService.getMilestones();
  const trends = mockJourneyService.getTrends();
  const synthesis = mockJourneyService.getDay60Synthesis();
  const [activeChartTab, setActiveChartTab] = useState('engagement'); // 'engagement' | 'reflections'

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader
        title="My Journey (60-Day Experience)"
        subtitle="A longitudinal look at your personal routines, goals reached, and quiet accomplishments."
        badge="Day 60 Synthesis"
      />

      {/* Main Retrospective Banner */}
      <div className="bg-gradient-to-br from-sage-50 via-white to-sand-50 p-6 sm:p-10 rounded-3xl border border-sage-200/80 shadow-soft-lg space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sage-800 bg-sage-100 px-3 py-1 rounded-full">
            60-Day Retrospective
          </span>
          <span className="text-xs text-clay-700">🌱 Sustained Routine Established</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-clay-900 leading-tight">
          {synthesis.headline}
        </h2>
        <p className="text-sm sm:text-base text-clay-700 max-w-2xl leading-relaxed">
          {synthesis.subtext}
        </p>

        {/* 60-Day Key Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-cream-200">
          <div className="p-3 bg-white/80 rounded-2xl border border-cream-200 text-center">
            <span className="text-[11px] text-clay-700 block">Active Days</span>
            <span className="text-xl font-serif font-bold text-clay-900">{synthesis.overallStats.totalActiveDays} / 60</span>
          </div>
          <div className="p-3 bg-white/80 rounded-2xl border border-cream-200 text-center">
            <span className="text-[11px] text-clay-700 block">Milestones Cleared</span>
            <span className="text-xl font-serif font-bold text-emerald-700">{synthesis.overallStats.goalsMilestonesCompleted}</span>
          </div>
          <div className="p-3 bg-white/80 rounded-2xl border border-cream-200 text-center">
            <span className="text-[11px] text-clay-700 block">Learning Hours</span>
            <span className="text-xl font-serif font-bold text-clay-900">{synthesis.overallStats.learningHours}h</span>
          </div>
          <div className="p-3 bg-white/80 rounded-2xl border border-cream-200 text-center">
            <span className="text-[11px] text-clay-700 block">Hobby Downtime</span>
            <span className="text-xl font-serif font-bold text-terracotta-600">{synthesis.overallStats.hobbiesLogged}h</span>
          </div>
          <div className="p-3 bg-white/80 rounded-2xl border border-cream-200 text-center">
            <span className="text-[11px] text-clay-700 block">Mind Games Solved</span>
            <span className="text-xl font-serif font-bold text-sage-700">{synthesis.overallStats.mindGamesSolved}</span>
          </div>
          <div className="p-3 bg-white/80 rounded-2xl border border-cream-200 text-center">
            <span className="text-[11px] text-clay-700 block">Reflections Logged</span>
            <span className="text-xl font-serif font-bold text-blue-700">{synthesis.overallStats.reflectionsCaptured}</span>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Synthesis (What seems to work, What changed, What accomplished, What next) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {synthesis.retrospectivePillars.map((pillar, idx) => (
          <Card key={idx} className="p-6 bg-white space-y-4 border-cream-200 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-sage-50 text-sage-700 rounded-2xl border border-sage-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-clay-900">
                {pillar.title}
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-clay-700">
              {pillar.points.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed bg-sand-50/60 p-3 rounded-xl border border-cream-100">
                  <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Recharts Longitudinal Trends */}
      <Card className="p-6 sm:p-8 bg-white space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-100 pb-4">
          <div>
            <h3 className="font-serif font-bold text-xl text-clay-900">
              Longitudinal Activity Trends (8 Weeks)
            </h3>
            <p className="text-xs text-clay-700 mt-0.5">
              Weekly hours dedicated to learning vs creative downtime & consistency
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={activeChartTab === 'engagement' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveChartTab('engagement')}
            >
              Time Balance (Hours)
            </Button>
            <Button
              variant={activeChartTab === 'reflections' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveChartTab('reflections')}
            >
              Consistency Index (%)
            </Button>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {activeChartTab === 'engagement' ? (
              <BarChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFECE6" vertical={false} />
                <XAxis dataKey="week" stroke="#759A77" fontSize={12} tickLine={false} />
                <YAxis stroke="#759A77" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FAF8F5', borderRadius: '1rem', border: '1px solid #DDD4C7', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="learningHrs" name="Technical Learning (Hrs)" fill="#557B57" radius={[6, 6, 0, 0]} />
                <Bar dataKey="hobbyHrs" name="Creative Hobbies (Hrs)" fill="#D7A287" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFECE6" vertical={false} />
                <XAxis dataKey="week" stroke="#759A77" fontSize={12} tickLine={false} />
                <YAxis stroke="#759A77" fontSize={12} tickLine={false} domain={[50, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FAF8F5', borderRadius: '1rem', border: '1px solid #DDD4C7', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="consistency" name="Rhythm Consistency %" stroke="#557B57" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="reflectionScore" name="Mindfulness Score (x10)" stroke="#A65A36" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 60-Day Milestones Timeline */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-xl text-clay-900">
          Journey Stepping Stones
        </h3>
        <div className="space-y-3">
          {milestones.map((m) => (
            <Card
              key={m.day}
              className={`p-5 flex items-start justify-between gap-4 transition-all ${
                m.isCurrent ? 'bg-sage-50/70 border-sage-400 shadow-soft' : 'bg-white border-cream-200'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                  m.completed ? 'bg-sage-600 text-white' : 'bg-cream-200 text-clay-700'
                }`}>
                  {m.completed ? <CheckCircle2 className="w-4 h-4" /> : m.day}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-terracotta-700 bg-terracotta-50 px-2 py-0.5 rounded">
                      {m.date}
                    </span>
                    <h4 className="font-serif font-bold text-base text-clay-900">{m.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-clay-700 mt-1 leading-relaxed max-w-2xl">
                    {m.description}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                Milestone Reached
              </span>
            </Card>
          ))}
        </div>
      </div>

      {/* Non-clinical compliance statement */}
      <div className="p-4 bg-sand-50 rounded-2xl border border-cream-200 text-xs text-clay-700 flex items-start gap-2.5">
        <Shield className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
        <p>{synthesis.nonClinicalStatement}</p>
      </div>
    </div>
  );
};
