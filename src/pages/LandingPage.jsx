import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import {
  Compass, Sprout, BookOpen, Users, Sparkles, Shield, HeartHandshake,
  ArrowRight, CheckCircle2, ChevronRight, Clock, Award, Target, Palette, Gamepad2
} from 'lucide-react';

export const LandingPage = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-clay-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100/80 border border-sage-200 text-xs font-semibold text-sage-800">
              <Sparkles className="w-3.5 h-3.5 text-sage-600" />
              <span>Non-Clinical Personal Growth & Rhythms</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-clay-900 leading-[1.15]">
              Your space to grow, reflect & reconnect.
            </h1>

            <p className="text-base sm:text-xl text-clay-700 leading-relaxed max-w-2xl font-normal">
              Build better habits, pursue what matters to you, discover your interests and understand your wellbeing over time.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigateTo('onboarding')}
                className="text-base font-semibold px-8 shadow-soft-lg"
              >
                Start your journey
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigateTo('counsellor')}
                className="text-base"
              >
                I'm a counsellor
              </Button>
            </div>

            {/* Privacy notice badge */}
            <div className="flex items-center gap-2.5 text-xs text-clay-700 bg-sand-50 p-3 rounded-2xl border border-cream-200/80 max-w-lg">
              <Shield className="w-4 h-4 text-sage-600 shrink-0" />
              <span>Your identity stays yours. Choose an anonymous display name and control what you share.</span>
            </div>
          </div>

          {/* Right Abstract Journey Visual using warm cards & shapes */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md w-full">
              {/* Decorative warm blobs */}
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-sage-100/60 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-terracotta-100/50 rounded-full blur-3xl pointer-events-none" />

              {/* Composition of floating abstract journey cards */}
              <div className="relative space-y-4">
                {/* Floating Card 1: Today's Plan */}
                <div className="bg-white/90 backdrop-blur-sm p-5 rounded-3xl border border-cream-200 shadow-soft-lg transform -rotate-1 hover:rotate-0 transition-transform">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-sage-800 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-200">
                      Evening Plan
                    </span>
                    <span className="text-[11px] text-clay-700">30 min focus</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-clay-900">Botanical Sketching</div>
                      <div className="text-xs text-clay-700">15 min creative relaxation</div>
                    </div>
                  </div>
                </div>

                {/* Floating Card 2: Mind Flow */}
                <div className="bg-sand-50/95 backdrop-blur-sm p-5 rounded-3xl border border-cream-200 shadow-soft-lg transform translate-x-4 hover:translate-x-2 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4 text-terracotta-500" />
                      <span className="text-xs font-semibold text-clay-900">Sudoku & 2048</span>
                    </div>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                      Calm
                    </span>
                  </div>
                  <p className="text-xs text-clay-700 leading-relaxed">
                    "Felt deeply focused and relaxed after 8 minutes of steady puzzle flow."
                  </p>
                </div>

                {/* Floating Card 3: Milestone */}
                <div className="bg-white/90 backdrop-blur-sm p-5 rounded-3xl border border-cream-200 shadow-soft-lg transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-clay-900">Goal Milestone Cleared</div>
                      <div className="text-xs text-clay-700">Verilog FSM Simulation completed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Section: Explore, Grow, Reflect, Connect */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-cream-100/60 border-y border-cream-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sage-700">
              The SEERA Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-clay-900">
              A little space for everything that matters to you.
            </h2>
            <p className="text-sm sm:text-base text-clay-700">
              No clinical jargon, no forced streaks. A balanced sanctuary designed to nurture your natural curiosity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Explore */}
            <Card variant="interactive" className="p-6 space-y-4 bg-white" onClick={() => navigateTo('games')}>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-clay-900">Explore</h3>
              <p className="text-xs sm:text-sm text-clay-700 leading-relaxed">
                Engage in low-pressure mind games, puzzles, and creative hobbies designed to stimulate curiosity without exhaustion.
              </p>
              <div className="text-xs font-semibold text-sage-700 flex items-center gap-1 pt-2">
                <span>Play Sudoku & 2048</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Card>

            {/* Card 2: Grow */}
            <Card variant="interactive" className="p-6 space-y-4 bg-white" onClick={() => navigateTo('goals')}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-clay-900">Grow</h3>
              <p className="text-xs sm:text-sm text-clay-700 leading-relaxed">
                Break major ambitions into small, satisfying milestones. Master technical flashcards, track healthy daily habits.
              </p>
              <div className="text-xs font-semibold text-sage-700 flex items-center gap-1 pt-2">
                <span>Manage Milestones</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Card>

            {/* Card 3: Reflect */}
            <Card variant="interactive" className="p-6 space-y-4 bg-white" onClick={() => navigateTo('journal')}>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-clay-900">Reflect</h3>
              <p className="text-xs sm:text-sm text-clay-700 leading-relaxed">
                Write or talk it out using private voice notes with automatic speech-to-text. Uncover natural patterns without diagnoses.
              </p>
              <div className="text-xs font-semibold text-sage-700 flex items-center gap-1 pt-2">
                <span>Open Journal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Card>

            {/* Card 4: Connect */}
            <Card variant="interactive" className="p-6 space-y-4 bg-white" onClick={() => navigateTo('hobbies')}>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-clay-900">Connect</h3>
              <p className="text-xs sm:text-sm text-clay-700 leading-relaxed">
                Share sketches, photography, and music in an anonymous, non-toxic hobby space devoid of vanity follower counts.
              </p>
              <div className="text-xs font-semibold text-sage-700 flex items-center gap-1 pt-2">
                <span>View Hobby Hub</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Personalization Section */}
      <section id="about" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sage-700">
              Adaptive Routine Design
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-clay-900">
              Not everyone grows the same way.
            </h2>
            <p className="text-sm sm:text-base text-clay-700 leading-relaxed">
              SEERA doesn't force cookie-cutter schedules. It gently adapts daily suggestions around who you are and what is realistic for your lifestyle.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Your Interests', desc: 'Art, coding, music, literature' },
                { title: 'Your Goals', desc: 'Career, wellbeing, physical energy' },
                { title: 'Activity Styles', desc: 'Short 15m bursts or deep blocks' },
                { title: 'Available Time', desc: '15m to 90m+ daily allowance' },
                { title: 'Daily Routines', desc: 'Morning calm or evening unwind' },
                { title: 'Past Engagement', desc: 'Learns your baseline rhythm' },
              ].map((item, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-white border border-cream-200 shadow-soft">
                  <div className="text-xs font-bold text-clay-900">{item.title}</div>
                  <div className="text-[11px] text-clay-700 mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-sand-50 p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-4">
            <h3 className="font-serif text-lg font-bold text-clay-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sage-600" />
              <span>Why SEERA feels different</span>
            </h3>
            <blockquote className="italic text-xs sm:text-sm text-clay-800 leading-relaxed border-l-2 border-sage-500 pl-4 my-3">
              "People don't always ask for help when they're struggling. Sometimes, their behaviour changes first."
            </blockquote>
            <p className="text-xs text-clay-700 leading-relaxed">
              Instead of intimidating medical forms, SEERA observes changes in your normal activity cadence, hobby engagement, and reflection times. If a sustained change occurs, it offers gentle suggestions and optional human review.
            </p>
          </div>
        </div>
      </section>

      {/* 60-Day Journey Timeline Section */}
      <section id="timeline" className="py-16 sm:py-24 bg-cream-100/60 border-y border-cream-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sage-700">
              Longitudinal Growth
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-clay-900">
              The 60-Day Journey
            </h2>
            <p className="text-sm sm:text-base text-clay-700">
              Real habits take time. Here is what your natural progression looks like over 60 days.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { time: 'Day 1', label: 'Space Created', desc: 'Choose anonymous handle, pick priorities, and set daily time commitment.' },
              { time: 'Week 2', label: 'Rhythm Formed', desc: 'Complete first goal milestone and start gentle audio reflections.' },
              { time: 'Week 4', label: 'Creative Balance', desc: 'Harmonize learning with sketching, music, and mind puzzles.' },
              { time: 'Week 8', label: 'Baseline Stability', desc: 'System understands your natural energy peaks and resting patterns.' },
              { time: '60 Days', label: 'Retrospective', desc: 'Review what worked, what changed, and synthesize your achievements.' }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-cream-200 shadow-soft flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-terracotta-600 bg-terracotta-50 px-2 py-0.5 rounded-md">
                    {step.time}
                  </span>
                  <h4 className="font-bold text-sm text-clay-900 pt-1">{step.label}</h4>
                  <p className="text-xs text-clay-700 leading-relaxed">{step.desc}</p>
                </div>
                <div className="pt-2 text-[11px] font-semibold text-sage-700 flex items-center gap-1">
                  <span>Explore Phase</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Human Support Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-sage-50 via-white to-sand-50 rounded-3xl border border-sage-200/80 p-8 sm:p-12 shadow-soft-lg space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 p-2 bg-sage-100 text-sage-800 rounded-full text-xs font-semibold px-4">
            <HeartHandshake className="w-4 h-4 text-sage-700" />
            <span>Human-Centric Safety Architecture</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-clay-900">
            Sometimes, a little human support helps.
          </h2>

          <p className="font-serif italic text-lg sm:text-xl text-sage-800 font-semibold max-w-xl mx-auto">
            "AI notices. Humans understand. People decide."
          </p>

          <p className="text-xs sm:text-sm text-clay-700 max-w-2xl mx-auto leading-relaxed">
            SEERA never diagnoses or labels you. If your activity pattern shows a sustained deviation from your normal baseline, our platform facilitates optional human review with qualified counsellors, always under your direct permission.
          </p>

          <div className="pt-4 flex justify-center gap-4 flex-wrap">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigateTo('onboarding')}
            >
              Begin Your Journey Now
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigateTo('counsellor')}
            >
              Explore Counsellor Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cream-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sage-600 text-white flex items-center justify-center font-serif font-bold text-sm">
              S
            </div>
            <div>
              <span className="font-serif font-bold text-clay-900 text-sm block">SEERA</span>
              <span className="text-[10px] text-clay-700">Stories, Emotions, Exploration, Reflection & Aspirations</span>
            </div>
          </div>

          <div className="text-xs text-clay-700 text-center sm:text-right space-y-1">
            <p>Built with care for 2026 Hackathon • Non-Clinical Wellbeing Platform</p>
            <p className="text-[11px] text-sage-700">"You are more than your data."</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
