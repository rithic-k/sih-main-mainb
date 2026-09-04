import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageHeader } from '../components/common/PageHeader';
import { Avatar } from '../components/common/Avatar';
import { PrivacyNotice } from '../components/common/PrivacyNotice';
import { maskPhoneNumber, maskEmail } from '../services/mockAuth';
import { mockUserService, ALL_INTERESTS, ALL_GOALS } from '../services/mockUser';
import {
  User, ShieldCheck, Lock, Download, Trash2, Edit3,
  Phone, Mail, Globe, Clock, Sparkles, CheckCircle2, AlertTriangle
} from 'lucide-react';

export const ProfilePage = () => {
  const {
    activeUser, updateProfile,
    userPrefs, updatePreferences,
    privacySettings, updatePrivacy,
    showToast, navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'privacy'

  const handleToggleConsent = (key) => {
    const updated = updatePrivacy({ [key]: !privacySettings[key] });
    showToast('Privacy preferences updated 🌱', 'info');
  };

  const handleExportData = () => {
    const jsonStr = mockUserService.exportUserData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SEERA_Archive_${activeUser.displayName}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showToast('Personal growth archive downloaded (JSON)', 'success');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo local data and return to welcome screen?')) {
      mockUserService.resetAllData();
      showToast('All local data cleared', 'info');
      navigateTo('landing');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader
        title="Profile & Privacy Centre"
        subtitle="Full transparency over your identity, masked contact data, and analytical consent."
        badge="Self-Sovereign Identity"
      />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-cream-200 pb-3">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'profile'
              ? 'bg-sage-600 text-white shadow-soft'
              : 'bg-cream-100 text-clay-700 hover:bg-cream-200'
          }`}
        >
          My Profile Summary
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'privacy'
              ? 'bg-sage-600 text-white shadow-soft'
              : 'bg-cream-100 text-clay-700 hover:bg-cream-200'
          }`}
        >
          Privacy Centre & Controls
        </button>
      </div>

      {activeTab === 'profile' ? (
        <div className="space-y-6">
          {/* Profile Card with Masked Info */}
          <Card className="p-6 sm:p-8 bg-white space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <Avatar name={activeUser.displayName} size="xl" seed={activeUser.avatarSeed} />
              <div className="text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-serif text-2xl font-bold text-clay-900">{activeUser.displayName}</h3>
                  <span className="text-[10px] bg-sage-100 text-sage-800 font-bold px-2 py-0.5 rounded-full uppercase">
                    {activeUser.accountType.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-clay-700">Member since {activeUser.joinedDate} • 14-day consistency streak</p>
                <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-3 text-xs text-clay-700">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-sage-600" />
                    <strong className="font-mono">{maskPhoneNumber(activeUser.phone)}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-sage-600" />
                    <span>{maskEmail(activeUser.email)}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-sage-600" />
                    <span>{activeUser.location}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Preferences Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cream-100 text-xs">
              <div className="p-4 bg-sand-50 rounded-2xl space-y-1.5 border border-cream-200">
                <span className="font-bold text-clay-900 uppercase tracking-wider block">Primary Focus Goal</span>
                <span className="text-sm font-serif font-bold text-sage-800 capitalize">
                  {userPrefs.primaryGoal?.replace('_', ' ')}
                </span>
                <p className="text-clay-700">{userPrefs.dailyTime} daily allocation during {userPrefs.preferredTime}</p>
              </div>

              <div className="p-4 bg-sand-50 rounded-2xl space-y-1.5 border border-cream-200">
                <span className="font-bold text-clay-900 uppercase tracking-wider block">Preferred Activity Style</span>
                <span className="text-sm font-serif font-bold text-clay-900">
                  {userPrefs.activityStyle}
                </span>
                <p className="text-clay-700">Preferred: {userPrefs.preferredActivities?.join(', ')}</p>
              </div>
            </div>

            {/* Selected Interests Chips */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-clay-700 uppercase tracking-wider block">
                Selected Curious Interests ({userPrefs.interests?.length || 0})
              </span>
              <div className="flex flex-wrap gap-2">
                {(userPrefs.interests || []).map(id => {
                  const item = ALL_INTERESTS.find(i => i.id === id);
                  return (
                    <span key={id} className="text-xs bg-cream-100 text-clay-800 px-3 py-1.5 rounded-full font-medium border border-cream-200">
                      {item ? item.label : id}
                    </span>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      ) : (
        /* PRIVACY CENTRE TAB */
        <div className="space-y-6">
          <PrivacyNotice />

          {/* Granular Consent Settings */}
          <Card className="p-6 sm:p-8 bg-white space-y-4">
            <h3 className="font-serif font-bold text-xl text-clay-900">
              Granular Consent & Sharing Controls
            </h3>
            <p className="text-xs sm:text-sm text-clay-700 leading-relaxed">
              Toggle any permission at any moment. Changes take effect immediately.
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  key: 'wellbeingAnalysis',
                  title: 'Longitudinal Pattern Analysis',
                  desc: 'Detects sustained deviations in habit timing and self-reported reflection metrics.',
                  val: privacySettings.wellbeingAnalysis
                },
                {
                  key: 'counsellorSupport',
                  title: 'Counsellor Review Permissions',
                  desc: 'Allows licensed counsellors to review aggregated activity deviation graphs upon human alert.',
                  val: privacySettings.counsellorSupport
                },
                {
                  key: 'voiceJournaling',
                  title: 'Voice Recording & Audio Transcription',
                  desc: 'Allows browser speech recognition. Raw audio files remain solely in client memory.',
                  val: privacySettings.voiceJournaling
                },
                {
                  key: 'familyVisibility',
                  title: 'Family / Guardian High-Level Overview',
                  desc: 'For young users: Shares general goal milestones without exposing private journal contents.',
                  val: privacySettings.familyVisibility
                },
                {
                  key: 'locationPermission',
                  title: 'Regional Emergency Support Matching',
                  desc: 'Matches local toll-free crisis lines based on city/country.',
                  val: privacySettings.locationPermission
                }
              ].map(item => (
                <div
                  key={item.key}
                  className="p-4 rounded-2xl bg-sand-50/70 border border-cream-200 flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="text-sm font-bold text-clay-900">{item.title}</div>
                    <div className="text-xs text-clay-700 mt-0.5 leading-relaxed">{item.desc}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleConsent(item.key)}
                    className={`w-12 h-6 rounded-full transition-colors relative shrink-0 mt-1 ${
                      item.val ? 'bg-sage-600' : 'bg-cream-300'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        item.val ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Data Export & Reset Actions */}
          <Card className="p-6 bg-white space-y-4 border-cream-200">
            <h3 className="font-serif font-bold text-lg text-clay-900">
              Data Sovereignty & Account Tools
            </h3>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="outline"
                size="md"
                icon={Download}
                onClick={handleExportData}
              >
                Export All My Data (JSON)
              </Button>
              <Button
                variant="danger"
                size="md"
                icon={Trash2}
                onClick={handleResetData}
              >
                Clear Local Demo Data
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
