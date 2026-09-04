import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageHeader } from '../components/common/PageHeader';
import { Tabs } from '../components/common/Tabs';
import { VoiceRecorder } from '../components/audio/VoiceRecorder';
import { mockJournalService, JOURNAL_PROMPTS } from '../services/mockJournal';
import {
  BookOpen, Mic, PenTool, Sparkles, Calendar, Clock,
  Trash2, ShieldCheck, Heart, ArrowRight, CheckCircle2, MessageSquare
} from 'lucide-react';

export const JournalPage = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState('write'); // 'write' | 'voice' | 'insights'
  const [entries, setEntries] = useState(() => mockJournalService.getEntries());
  const [insights, setInsights] = useState(() => mockJournalService.getReflectionInsights());

  // Written entry form state
  const [entryTitle, setEntryTitle] = useState('');
  const [entryContent, setEntryContent] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(JOURNAL_PROMPTS[0].text);
  const [tagsInput, setTagsInput] = useState('Reflection, Evening');

  const handleCreateWrittenEntry = (e) => {
    e.preventDefault();
    if (!entryContent.trim()) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const newEntry = mockJournalService.addEntry({
      title: entryTitle.trim() || 'Evening Reflection',
      content: entryContent.trim(),
      mode: 'text',
      tags: tags.length > 0 ? tags : ['Reflection'],
      promptUsed: selectedPrompt
    });

    setEntries(mockJournalService.getEntries());
    setInsights(mockJournalService.getReflectionInsights());
    showToast('Reflection saved to your confidential space 🌱', 'success');

    // Reset
    setEntryTitle('');
    setEntryContent('');
  };

  const handleSaveVoiceEntry = (voiceData) => {
    mockJournalService.addEntry({
      title: 'Voice Reflection & Speech-to-Text',
      content: voiceData.content,
      mode: 'voice',
      audioDuration: voiceData.audioDuration,
      tags: voiceData.tags || ['Voice Note', 'Reflection']
    });

    setEntries(mockJournalService.getEntries());
    setInsights(mockJournalService.getReflectionInsights());
    showToast('Voice reflection transcribed and saved 🌱', 'success');
  };

  const handleDeleteEntry = (id) => {
    if (window.confirm('Delete this reflection entry?')) {
      const updated = mockJournalService.deleteEntry(id);
      setEntries(updated);
      setInsights(mockJournalService.getReflectionInsights());
      showToast('Entry removed', 'info');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader
        title="Reflection & Journal"
        subtitle="Your private sanctuary to write or talk out your thoughts. Confidential & calm."
        badge="Self-Reflection"
      />

      {/* Mode Switcher Tabs */}
      <Tabs
        tabs={[
          { id: 'write', label: 'Write it Out', icon: PenTool },
          { id: 'voice', label: 'Talk it Out (Voice Mic)', icon: Mic },
          { id: 'insights', label: 'Reflection Insights', icon: Sparkles }
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* TAB 1: Write it Out */}
      {activeTab === 'write' && (
        <div className="space-y-6">
          {/* Prompt Selector */}
          <Card className="p-5 bg-sand-50/80 border-cream-200">
            <div className="flex items-center gap-2 text-xs font-bold text-clay-900 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sage-600" />
              <span>Inspirational Prompts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {JOURNAL_PROMPTS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPrompt(p.text)}
                  className={`p-3 rounded-xl border text-xs text-left transition-all ${
                    selectedPrompt === p.text
                      ? 'border-sage-600 bg-white text-clay-900 shadow-xs font-medium'
                      : 'border-cream-200 bg-white/60 hover:bg-white text-clay-700'
                  }`}
                >
                  <span className="font-bold text-sage-800 block mb-0.5">{p.label}</span>
                  <span>"{p.text}"</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Journal Editor */}
          <Card className="p-6 sm:p-8 bg-white shadow-soft-lg space-y-4">
            <form onSubmit={handleCreateWrittenEntry} className="space-y-4">
              <div className="text-xs text-clay-700 italic border-l-2 border-sage-500 pl-3">
                Current prompt: "{selectedPrompt}"
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Reflection Title (Optional)"
                  value={entryTitle}
                  onChange={(e) => setEntryTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-cream-50 border border-cream-200 rounded-xl text-base font-serif font-bold text-clay-900 focus:outline-none focus:ring-2 focus:ring-sage-500 placeholder:text-clay-700 placeholder:font-normal"
                />
              </div>

              <div>
                <textarea
                  rows={6}
                  placeholder="What is on your mind today? Write as freely as you wish..."
                  value={entryContent}
                  onChange={(e) => setEntryContent(e.target.value)}
                  className="w-full p-4 bg-cream-50/70 border border-cream-200 rounded-2xl text-sm text-clay-900 focus:outline-none focus:ring-2 focus:ring-sage-500 leading-relaxed custom-scrollbar placeholder:text-clay-700"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <input
                  type="text"
                  placeholder="Tags (comma separated, e.g. Learning, Stillness)"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="px-3.5 py-2 bg-cream-50 border border-cream-200 rounded-xl text-xs text-clay-800 focus:outline-none sm:w-64"
                />
                <Button variant="primary" size="md" type="submit" icon={CheckCircle2}>
                  Save Reflection
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* TAB 2: Talk it Out (Realistic Voice Recorder) */}
      {activeTab === 'voice' && (
        <VoiceRecorder onSaveVoiceEntry={handleSaveVoiceEntry} />
      )}

      {/* TAB 3: Reflection Insights (Non-Clinical) */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <Card variant="accent" className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-sage-600 text-white rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-clay-900">Pattern Observation</h3>
                <span className="text-xs text-sage-800">Based on {insights.totalReflections} logged reflections</span>
              </div>
            </div>

            <p className="text-sm text-clay-800 leading-relaxed font-medium bg-white/80 p-4 rounded-2xl border border-sage-200">
              "{insights.summaryObservation}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 bg-white rounded-xl border border-cream-200">
                <span className="text-xs font-bold text-clay-700 uppercase tracking-wider block mb-1">
                  Frequent Focus Topics
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {insights.topThemes.map((t, idx) => (
                    <span key={idx} className="text-xs bg-sage-100 text-sage-800 px-2.5 py-1 rounded-full font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-cream-200">
                <span className="text-xs font-bold text-clay-700 uppercase tracking-wider block mb-1">
                  Reflection Modality
                </span>
                <div className="text-sm font-bold text-clay-900">{insights.voiceToTextRatio}</div>
                <div className="text-[11px] text-clay-700 mt-1">Both written and spoken expressions are supported.</div>
              </div>
            </div>

            <div className="p-3 bg-sand-100 rounded-xl text-xs text-clay-700 border border-cream-200">
              <strong>Non-Clinical Note:</strong> {insights.nonClinicalNote}
            </div>
          </Card>
        </div>
      )}

      {/* Past Entries Archive */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-xl text-clay-900">
            Past Reflections ({entries.length})
          </h3>
          <span className="text-xs text-clay-700">Confidential & stored locally</span>
        </div>

        <div className="space-y-3">
          {entries.map((entry) => (
            <Card key={entry.id} className="p-5 sm:p-6 bg-white space-y-3 hover:border-sage-300">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      entry.mode === 'voice' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {entry.mode === 'voice' ? 'Voice Reflection' : 'Written'}
                    </span>
                    {entry.audioDuration && (
                      <span className="text-xs text-clay-700 font-mono">
                        Duration: {entry.audioDuration}
                      </span>
                    )}
                    <span className="text-xs text-clay-700 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{entry.date} at {entry.time}</span>
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-clay-900">{entry.title}</h4>
                </div>

                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="p-1.5 text-clay-700 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                  title="Delete reflection"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-clay-800 leading-relaxed">
                {entry.content}
              </p>

              {entry.promptUsed && (
                <div className="text-[11px] text-clay-700 italic">
                  Prompt: "{entry.promptUsed}"
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-1">
                {entry.tags.map((tag, i) => (
                  <span key={i} className="text-[11px] bg-cream-100 text-clay-700 px-2.5 py-0.5 rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
