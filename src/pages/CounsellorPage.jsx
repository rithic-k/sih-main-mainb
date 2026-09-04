import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageHeader } from '../components/common/PageHeader';
import { mockCounsellorService } from '../services/mockCounsellor';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from 'recharts';
import {
  Stethoscope, User, ShieldAlert, CheckCircle2, Clock,
  Video, Calendar, MessageSquare, AlertTriangle, ChevronRight,
  TrendingDown, TrendingUp, Sparkles, Filter, Check, Eye
} from 'lucide-react';

export const CounsellorPage = () => {
  const { navigateTo, activeCounsellorUser, setActiveCounsellorUser, showToast } = useApp();
  const [users, setUsers] = useState(() => mockCounsellorService.getUsers());
  const [selectedUserId, setSelectedUserId] = useState(activeCounsellorUser || 'user-C119');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'review_recommended' | 'change_detected' | 'stable'
  const [newNoteText, setNewNoteText] = useState('');

  const selectedUser = users.find(u => u.id === selectedUserId) || users[0];

  const filteredUsers = users.filter(u => {
    if (filterStatus === 'all') return true;
    return u.status === filterStatus;
  });

  const handleSelectUser = (user) => {
    setSelectedUserId(user.id);
    setActiveCounsellorUser(user.id);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const updated = mockCounsellorService.addNote(selectedUser.id, newNoteText.trim());
    setUsers(updated);
    setNewNoteText('');
    showToast('Clinical observation note saved.', 'success');
  };

  const handleToggleReviewed = () => {
    const updated = mockCounsellorService.toggleReviewed(selectedUser.id);
    setUsers(updated);
    showToast(`User marked as ${!selectedUser.isReviewed ? 'Reviewed' : 'Pending Review'}`, 'info');
  };

  const handleLaunchVideoCall = () => {
    navigateTo('videocall', { counsellorUser: selectedUser.id });
  };

  const getStatusBadge = (status, label) => {
    switch (status) {
      case 'review_recommended':
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">Human Review Recommended</span>;
      case 'change_detected':
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">Change Detected</span>;
      case 'stable':
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">Stable Baseline</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader
        title="Counsellor Longitudinal Portal"
        subtitle="Longitudinal pattern deviation review. AI notices patterns; qualified human counsellors evaluate context."
        badge="Accredited Counsellor Workspace"
        badgeColor="bg-rose-100 text-rose-800 border-rose-200"
      />

      {/* Main Grid: User List (4 cols) & User Longitudinal Detail (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 10 Fictional Anonymous Users */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-clay-900">
              Active Case Cohort ({users.length})
            </h3>
            <div className="flex gap-1 text-xs">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-2 py-0.5 rounded-lg ${filterStatus === 'all' ? 'bg-sage-600 text-white font-bold' : 'text-clay-700'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('review_recommended')}
                className={`px-2 py-0.5 rounded-lg ${filterStatus === 'review_recommended' ? 'bg-rose-600 text-white font-bold' : 'text-clay-700'}`}
              >
                Review
              </button>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto custom-scrollbar pr-1">
            {filteredUsers.map((u) => {
              const isSelected = u.id === selectedUser.id;
              return (
                <button
                  key={u.id}
                  onClick={() => handleSelectUser(u)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-sage-50/90 border-sage-600 shadow-soft'
                      : 'bg-white border-cream-200 hover:bg-cream-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${u.dotColor}`} />
                      <span className="font-serif font-bold text-sm text-clay-900">{u.code}</span>
                    </div>
                    {getStatusBadge(u.status, u.statusLabel)}
                  </div>

                  <div className="text-xs text-clay-700 flex items-center justify-between">
                    <span>{u.ageGroup}</span>
                    <span>Last active: {u.lastActive}</span>
                  </div>

                  <p className="text-[11px] text-clay-700 line-clamp-1 italic">
                    "{u.deviationSummary}"
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Longitudinal Deviation Details */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6 sm:p-8 bg-white space-y-6 border-cream-300 shadow-soft-lg">
            {/* Header with Quick Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-serif text-2xl font-bold text-clay-900">{selectedUser.code}</h2>
                  {getStatusBadge(selectedUser.status, selectedUser.statusLabel)}
                  <span className="text-xs text-clay-700 bg-cream-100 px-2 py-0.5 rounded font-medium">
                    {selectedUser.baselinePeriod}
                  </span>
                </div>
                <p className="text-xs text-clay-700">
                  Primary Goal: <strong>{selectedUser.primaryGoal}</strong> • Age Group: {selectedUser.ageGroup}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant={selectedUser.isReviewed ? 'subtle' : 'secondary'}
                  size="sm"
                  icon={Check}
                  onClick={handleToggleReviewed}
                >
                  {selectedUser.isReviewed ? 'Marked as Reviewed' : 'Mark Reviewed'}
                </Button>
                <Button
                  variant="terracotta"
                  size="sm"
                  icon={Video}
                  onClick={handleLaunchVideoCall}
                >
                  Start Video Session
                </Button>
              </div>
            </div>

            {/* AI Pattern Explanation Banner (Strictly Non-Clinical) */}
            <div className="p-4 bg-sand-50 rounded-2xl border border-cream-300 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-clay-900">
                <Sparkles className="w-4 h-4 text-sage-600" />
                <span>Longitudinal Baseline Analysis</span>
              </div>
              <p className="text-xs sm:text-sm text-clay-800 leading-relaxed font-medium">
                "{selectedUser.deviationSummary}"
              </p>
              <div className="text-[11px] text-clay-700">
                Note: Evaluated across continuous behavioral metrics (routine times, goal consistency, reflection cadence). No clinical psychiatric diagnoses are assigned.
              </div>
            </div>

            {/* Six Longitudinal Indicators Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-clay-700">
                Behavioral Deviation Indicators
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Goal Engagement', data: selectedUser.indicators.goalEngagement },
                  { label: 'Hobby Logging', data: selectedUser.indicators.hobbyEngagement },
                  { label: 'Reflection Score', data: selectedUser.indicators.reflectionTrend },
                  { label: 'Journal Frequency', data: selectedUser.indicators.journalFrequency },
                  { label: 'Late-Night Activity', data: selectedUser.indicators.lateNightActivity, isAlert: true },
                  { label: 'Rhythm Consistency', data: selectedUser.indicators.activityConsistency },
                ].map((ind, i) => (
                  <div key={i} className="p-3.5 bg-cream-50/70 rounded-2xl border border-cream-200 space-y-1">
                    <span className="text-[11px] font-bold text-clay-700 block truncate">{ind.label}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-serif font-bold text-clay-900">
                        {ind.data.score}%
                      </span>
                      <span className={`text-xs font-bold ${
                        ind.isAlert && ind.data.score > 50
                          ? 'text-rose-600'
                          : ind.data.trend === 'down'
                          ? 'text-amber-700'
                          : 'text-emerald-700'
                      }`}>
                        {ind.data.change}
                      </span>
                    </div>
                    <span className="text-[10px] text-clay-700 block">Baseline: {ind.data.baseline}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deviation Chart */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-clay-700">
                6-Week Engagement vs Baseline Deviation
              </h4>
              <div className="h-56 w-full bg-cream-50/40 p-2 rounded-2xl border border-cream-200">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedUser.weeklyHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFECE6" vertical={false} />
                    <XAxis dataKey="week" stroke="#759A77" fontSize={11} tickLine={false} />
                    <YAxis stroke="#759A77" fontSize={11} tickLine={false} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#FAF8F5', borderRadius: '0.75rem', border: '1px solid #DDD4C7', fontSize: '11px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                    <Line type="monotone" dataKey="baseline" name="Expected Personal Baseline %" stroke="#A65A36" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="currentEngagement" name="Actual Engagement %" stroke="#557B57" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Permitted Info & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Permitted Information */}
              <div className="p-4 bg-sand-50 rounded-2xl border border-cream-200 space-y-2 text-xs">
                <span className="font-bold text-clay-900 uppercase tracking-wider block">
                  Permitted Information Sharing
                </span>
                <div className="space-y-1.5 text-clay-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Aggregated Wellbeing & Goal Trends</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hobby Engagement Hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-clay-700 line-through">
                    <span className="w-3.5 h-3.5 rounded-full border border-clay-300 block text-center text-[10px]">✕</span>
                    <span>Raw Voice/Text Journal Contents (Private)</span>
                  </div>
                </div>
              </div>

              {/* Counsellor Notes Box */}
              <div className="p-4 bg-white rounded-2xl border border-cream-200 space-y-3">
                <span className="font-bold text-clay-900 uppercase tracking-wider text-xs block">
                  Counsellor Notes ({selectedUser.counsellorNotes?.length || 0})
                </span>
                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    placeholder="Add clinical observation notes..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="w-full p-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs text-clay-900 focus:outline-none"
                  />
                  <div className="flex justify-end">
                    <Button variant="subtle" size="sm" type="submit">
                      Save Note
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
