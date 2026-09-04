import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  ALL_INTERESTS, ALL_GOALS
} from '../services/mockUser';
import { maskPhoneNumber } from '../services/mockAuth';
import {
  UserCheck, Compass, Users, Stethoscope, Shield, ArrowRight, ArrowLeft,
  CheckCircle2, Sparkles, Phone, Lock, Heart, Check, Palette, Music, BookOpen,
  Cpu, Activity, Utensils, Camera, PenTool, Gamepad2, Leaf, Film, Scissors
} from 'lucide-react';

const ICON_MAP = {
  Palette, Music, BookOpen, Cpu, Activity, Utensils,
  Camera, PenTool, Gamepad2, Leaf, Film, Scissors,
  Compass, Sparkles
};

export const OnboardingPage = () => {
  const { navigateTo, updateProfile, updatePreferences, updatePrivacy, showToast } = useApp();
  const [step, setStep] = useState(1); // 1 to 7

  // Form State
  const [accountType, setAccountType] = useState('individual');
  const [displayName, setDisplayName] = useState('Moonlight27');
  const [email, setEmail] = useState('moonlight27@example.com');
  const [countryCode, setCountryCode] = useState('+91');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [ageGroup, setAgeGroup] = useState('18-24');
  const [language, setLanguage] = useState('English');
  const [location, setLocation] = useState('Bengaluru, India');
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST)');

  // Interests & Goals State
  const [selectedInterests, setSelectedInterests] = useState(['technology', 'art', 'music', 'reading', 'games']);
  const [selectedGoals, setSelectedGoals] = useState(['career', 'emotional_wellbeing', 'hobbies']);
  const [primaryGoal, setPrimaryGoal] = useState('career');

  // Preferences State
  const [preferredActivities, setPreferredActivities] = useState(['Learning', 'Creative activities', 'Games', 'Reflection']);
  const [activityStyle, setActivityStyle] = useState('Short and easy');
  const [dailyTime, setDailyTime] = useState('30 min');
  const [preferredTime, setPreferredTime] = useState('Evening');

  // Privacy State
  const [consentWellbeing, setConsentWellbeing] = useState(true);
  const [consentCounsellor, setConsentCounsellor] = useState(true);
  const [consentVoice, setConsentVoice] = useState(true);
  const [consentLocation, setConsentLocation] = useState(false);
  const [consentFamily, setConsentFamily] = useState(false);

  // Validation Error
  const [phoneError, setPhoneError] = useState('');

  const handleNext = () => {
    // Step 2 Phone validation for India
    if (step === 2) {
      const cleanPhone = mobileNumber.replace(/\D/g, '');
      if (countryCode === '+91' && cleanPhone.length !== 10) {
        setPhoneError('Please enter a valid 10-digit Indian mobile number.');
        return;
      }
      if (cleanPhone.length < 7) {
        setPhoneError('Please enter a valid mobile number.');
        return;
      }
      setPhoneError('');
    }

    if (step < 7) {
      setStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Finalize Onboarding
      updateProfile({
        accountType,
        displayName: displayName.trim() || 'Moonlight27',
        email,
        phone: `${countryCode} ${mobileNumber}`,
        countryCode,
        ageGroup,
        language,
        location,
        timezone
      });

      updatePreferences({
        interests: selectedInterests,
        goals: selectedGoals,
        primaryGoal,
        preferredActivities,
        activityStyle,
        dailyTime,
        preferredTime,
        isOnboardingCompleted: true
      });

      updatePrivacy({
        wellbeingAnalysis: consentWellbeing,
        counsellorSupport: consentCounsellor,
        voiceJournaling: consentVoice,
        locationPermission: consentLocation,
        familyVisibility: consentFamily
      });

      showToast('Welcome to SEERA! Your personalized space is ready 🌱', 'success');
      navigateTo('home');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('landing');
    }
  };

  const toggleInterest = (id) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleGoal = (id) => {
    setSelectedGoals(prev => {
      const next = prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id];
      if (!next.includes(primaryGoal) && next.length > 0) {
        setPrimaryGoal(next[0]);
      }
      return next;
    });
  };

  const toggleActivity = (act) => {
    setPreferredActivities(prev =>
      prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Progress Bar & Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-clay-700">
            <span>Step {step} of 7</span>
            <span>
              {step === 1 && 'Account Type'}
              {step === 2 && 'Personal Details & Phone'}
              {step === 3 && 'Curious Interests'}
              {step === 4 && 'Your Goals'}
              {step === 5 && 'Daily Preferences'}
              {step === 6 && 'Privacy & Consent'}
              {step === 7 && 'Your Space Summary'}
            </span>
          </div>
          <ProgressBar value={step} max={7} showPercentage={false} />
        </div>

        {/* STEP 1: Account Type */}
        {step === 1 && (
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="font-serif text-2xl font-bold text-clay-900">How would you like to use SEERA?</h2>
              <p className="text-xs sm:text-sm text-clay-700">Choose the mode that best describes your role in the platform.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { id: 'individual', title: 'Individual', desc: 'Personal growth, hobbies, goal tracking & reflections.', icon: UserCheck },
                { id: 'young_user', title: 'Young User', desc: 'Focus on school projects, creative hobbies, and mindful games.', icon: Compass },
                { id: 'parent', title: 'Parent / Guardian', desc: 'Support high-level wellbeing trends without invading private journals.', icon: Users },
                { id: 'counsellor', title: 'Counsellor', desc: 'Longitudinal baseline deviation reviews and compassionate care.', icon: Stethoscope },
              ].map(item => {
                const Icon = item.icon;
                const isSelected = accountType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAccountType(item.id)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'border-sage-600 bg-sage-50 shadow-soft'
                        : 'border-cream-200 bg-white hover:bg-cream-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-sage-600 text-white' : 'bg-cream-100 text-clay-800'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-sage-700" />}
                    </div>
                    <div>
                      <div className="font-serif font-bold text-base text-clay-900">{item.title}</div>
                      <div className="text-xs text-clay-700 mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        )}

        {/* STEP 2: Personal Details & REQUIRED Phone */}
        {step === 2 && (
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-clay-900">Your Identity & Security</h2>
              <p className="text-xs sm:text-sm text-clay-700">Choose an anonymous display name and configure your contact info.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-1.5">
                  Anonymous Display Name *
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Moonlight27, CedarBreeze"
                  className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-sm font-medium text-clay-900 focus:ring-2 focus:ring-sage-500 focus:outline-none"
                  required
                />
                <span className="text-[11px] text-clay-700 mt-1 block">Your real name is never exposed publicly.</span>
              </div>

              {/* Mobile Number REQUIRED */}
              <div>
                <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Mobile Number (Required) *</span>
                  <span className="text-[11px] text-sage-700 font-normal lowercase">Stored securely in local state</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-3 bg-cream-50 border border-cream-300 rounded-xl text-sm font-semibold text-clay-900 focus:ring-2 focus:ring-sage-500 focus:outline-none"
                  >
                    <option value="+91">+91 (India)</option>
                    <option value="+1">+1 (US/CA)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (AU)</option>
                    <option value="+65">+65 (SG)</option>
                    <option value="+971">+971 (UAE)</option>
                  </select>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder={countryCode === '+91' ? '10-digit mobile number' : 'Mobile number'}
                    className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-sm font-mono text-clay-900 focus:ring-2 focus:ring-sage-500 focus:outline-none"
                    required
                  />
                </div>
                {phoneError && (
                  <p className="text-xs text-rose-600 font-medium mt-1">{phoneError}</p>
                )}

                {/* Privacy explanation for mobile number */}
                <div className="mt-2 p-3 bg-sand-100 rounded-xl border border-cream-200 text-xs text-clay-700 leading-relaxed flex items-start gap-2">
                  <Lock className="w-3.5 h-3.5 text-sage-600 shrink-0 mt-0.5" />
                  <span>
                    Your mobile number is private and is used for account security and, where applicable, human support or safety communication according to your consent.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-sm text-clay-900 focus:ring-2 focus:ring-sage-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-1.5">
                    Age Group
                  </label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-sm text-clay-900 focus:ring-2 focus:ring-sage-500 focus:outline-none"
                  >
                    <option value="Under 18">Young User (Under 18)</option>
                    <option value="18-24">18-24 (University / Early Career)</option>
                    <option value="25-34">25-34 (Professional)</option>
                    <option value="35-49">35-49</option>
                    <option value="50+">50+</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* STEP 3: Interests */}
        {step === 3 && (
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-clay-900">What sparks your curiosity?</h2>
              <p className="text-xs sm:text-sm text-clay-700">Select all topics and creative hobbies you enjoy or wish to explore.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {ALL_INTERESTS.map(item => {
                const isSelected = selectedInterests.includes(item.id);
                const Icon = ICON_MAP[item.icon] || Sparkles;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? 'border-sage-600 bg-sage-50 text-sage-900 font-semibold shadow-xs'
                        : 'border-cream-200 bg-white hover:bg-cream-50 text-clay-800'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-sage-600 text-white' : 'bg-cream-100 text-clay-700'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        )}

        {/* STEP 4: Goals */}
        {step === 4 && (
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-clay-900">What matters most to you right now?</h2>
              <p className="text-xs sm:text-sm text-clay-700">Select your active focus areas, then pick one as your primary goal.</p>
            </div>

            <div className="space-y-2.5">
              {ALL_GOALS.map(goal => {
                const isSelected = selectedGoals.includes(goal.id);
                const isPrimary = primaryGoal === goal.id;
                return (
                  <div
                    key={goal.id}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                      isSelected ? 'border-sage-500 bg-sage-50/50' : 'border-cream-200 bg-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleGoal(goal.id)}
                      className="flex-1 text-left flex items-start gap-3"
                    >
                      <div className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sage-600 border-sage-600 text-white' : 'border-cream-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-clay-900">{goal.label}</div>
                        <div className="text-xs text-clay-700">{goal.desc}</div>
                      </div>
                    </button>

                    {isSelected && (
                      <button
                        type="button"
                        onClick={() => setPrimaryGoal(goal.id)}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                          isPrimary
                            ? 'bg-sage-700 text-white font-bold'
                            : 'bg-cream-100 text-clay-700 hover:bg-cream-200'
                        }`}
                      >
                        {isPrimary ? 'Primary Goal ★' : 'Set as Primary'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* STEP 5: Activity Preferences */}
        {step === 5 && (
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-clay-900">Your Activity Rhythms</h2>
              <p className="text-xs sm:text-sm text-clay-700">Tell us how and when you prefer to engage.</p>
            </div>

            <div className="space-y-5">
              {/* Preferred activities */}
              <div>
                <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-2">
                  Preferred Activities
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Learning', 'Creative activities', 'Movement', 'Games', 'Reflection', 'Social activities', 'Reading', 'Music', 'Outdoor activities'].map(act => {
                    const isSelected = preferredActivities.includes(act);
                    return (
                      <button
                        key={act}
                        type="button"
                        onClick={() => toggleActivity(act)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-sage-600 text-white border-sage-600'
                            : 'bg-cream-50 text-clay-700 border-cream-200 hover:bg-cream-100'
                        }`}
                      >
                        {act}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Activity Style */}
              <div>
                <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-2">
                  Preferred Activity Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Short and easy', 'Focused sessions', 'Creative', 'Challenge-based', 'Relaxing', 'Social'].map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setActivityStyle(style)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        activityStyle === style
                          ? 'border-sage-600 bg-sage-50 text-sage-900 font-bold'
                          : 'border-cream-200 bg-white hover:bg-cream-50 text-clay-700'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Daily time commitment */}
              <div>
                <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-2">
                  How much time can you realistically spend each day?
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {['15 min', '30 min', '45 min', '60 min', '90+ min'].map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setDailyTime(time)}
                      className={`py-2 rounded-xl border text-xs font-bold text-center transition-all ${
                        dailyTime === time
                          ? 'border-terracotta-500 bg-terracotta-50 text-terracotta-800'
                          : 'border-cream-200 bg-white hover:bg-cream-50 text-clay-700'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred time */}
              <div>
                <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-2">
                  Preferred Time of Day
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['Morning', 'Afternoon', 'Evening', 'Flexible'].map(tod => (
                    <button
                      key={tod}
                      type="button"
                      onClick={() => setPreferredTime(tod)}
                      className={`py-2 rounded-xl border text-xs font-medium text-center transition-all ${
                        preferredTime === tod
                          ? 'border-sage-600 bg-sage-50 text-sage-900 font-bold'
                          : 'border-cream-200 bg-white hover:bg-cream-50 text-clay-700'
                      }`}
                    >
                      {tod}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* STEP 6: Privacy & Consent ("You are more than your data") */}
        {step === 6 && (
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sage-800 bg-sage-100 px-3 py-1 rounded-full mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Privacy First Protocol</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-clay-900">You are more than your data.</h2>
              <p className="text-xs sm:text-sm text-clay-700 leading-relaxed">
                SEERA observes routine timing and self-reflections to detect meaningful sustained changes. You maintain granular control over how your data is utilized.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'wellbeing',
                  title: 'Wellbeing Pattern Analysis',
                  desc: 'Allow system to notice changes in habit consistency, hobby time, and reflection rhythm.',
                  state: consentWellbeing,
                  setter: setConsentWellbeing
                },
                {
                  id: 'counsellor',
                  title: 'Optional Counsellor Review Support',
                  desc: 'If a sustained deviation occurs, allow an accredited counsellor to review high-level indicators.',
                  state: consentCounsellor,
                  setter: setConsentCounsellor
                },
                {
                  id: 'voice',
                  title: 'Private Voice Journaling & Transcription',
                  desc: 'Enable browser mic for speech-to-text voice reflections. Audio stays strictly local.',
                  state: consentVoice,
                  setter: setConsentVoice
                },
                {
                  id: 'family',
                  title: 'Family & Guardian High-Level Visibility',
                  desc: 'For young users: Share general goal milestones without exposing private journal contents.',
                  state: consentFamily,
                  setter: setConsentFamily
                }
              ].map(item => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-cream-200 flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="text-sm font-bold text-clay-900">{item.title}</div>
                    <div className="text-xs text-clay-700 mt-0.5 leading-relaxed">{item.desc}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => item.setter(!item.state)}
                    className={`w-12 h-6 rounded-full transition-colors relative shrink-0 mt-1 ${
                      item.state ? 'bg-sage-600' : 'bg-cream-300'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        item.state ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* STEP 7: Summary & Verification */}
        {step === 7 && (
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-sage-100 text-sage-700 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-clay-900">Your Space is Ready</h2>
              <p className="text-xs sm:text-sm text-clay-700">Review your customized setup before launching your journey.</p>
            </div>

            <div className="bg-sand-50 rounded-2xl p-5 border border-cream-200 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between pb-2 border-b border-cream-200">
                <span className="text-clay-700">Anonymous Profile:</span>
                <span className="font-bold text-clay-900">{displayName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-cream-200">
                <span className="text-clay-700">Masked Phone:</span>
                <span className="font-mono font-bold text-sage-800">
                  {maskPhoneNumber(`${countryCode} ${mobileNumber}`)}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-cream-200">
                <span className="text-clay-700">Primary Goal:</span>
                <span className="font-bold text-clay-900 capitalize">{primaryGoal.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-cream-200">
                <span className="text-clay-700">Daily Commitment:</span>
                <span className="font-bold text-clay-900">{dailyTime} ({preferredTime})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-clay-700">Interests Selected:</span>
                <span className="font-semibold text-sage-700">{selectedInterests.length} Topics</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Personalized adaptive plan generated. Ready to explore!</span>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="ghost"
            size="md"
            icon={ArrowLeft}
            onClick={handleBack}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>

          <Button
            variant="primary"
            size="lg"
            icon={step === 7 ? CheckCircle2 : ArrowRight}
            iconPosition="right"
            onClick={handleNext}
          >
            {step === 7 ? 'Enter SEERA' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};
