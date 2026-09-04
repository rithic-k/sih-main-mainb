import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { POST_GAME_QUESTIONS, mockGamesService } from '../../services/mockGames';
import { Sparkles, CheckCircle2, Heart, Smile } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GameReflectionModal = ({ isOpen, onClose, gameTitle = 'Mindful Game' }) => {
  const { showToast } = useApp();
  const [answers, setAnswers] = useState({
    q1_feeling: 'Calming & grounding',
    q2_focus: 7,
    q3_enjoyment: 'Really enjoyed it',
    q4_difficulty: 'Just right / sweet spot',
    q5_current_state: ''
  });
  const [selectedTag, setSelectedTag] = useState('Relaxed');

  const handleSelectOption = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSliderChange = (val) => {
    setAnswers(prev => ({ ...prev, q2_focus: parseInt(val, 10) }));
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setAnswers(prev => ({ ...prev, q5_current_state: tag }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalState = answers.q5_current_state || selectedTag || 'Reflective';
    mockGamesService.saveReflection(gameTitle, {
      ...answers,
      q5_current_state: finalState
    });
    showToast('Reflection logged in your personal growth archive 🌱', 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Take a moment to reflect"
      subtitle={`Completed session: ${gameTitle}. Notice how your mind feels right now.`}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Q1: Feeling */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-semibold text-clay-900 block">
            1. How did that activity feel?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {POST_GAME_QUESTIONS[0].options.map(opt => (
              <button
                type="button"
                key={opt}
                onClick={() => handleSelectOption('q1_feeling', opt)}
                className={`p-2.5 text-xs rounded-xl border text-left transition-all ${
                  answers.q1_feeling === opt
                    ? 'border-sage-600 bg-sage-50 text-sage-900 font-semibold'
                    : 'border-cream-200 bg-cream-50/50 hover:bg-cream-100 text-clay-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Q2: Focus Slider */}
        <div className="space-y-2 bg-sand-50 p-4 rounded-2xl border border-cream-200">
          <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-clay-900">
            <span>2. How focused did you feel?</span>
            <span className="text-sage-800 font-bold bg-sage-100 px-2 py-0.5 rounded-md">
              {answers.q2_focus} / 10
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={answers.q2_focus}
            onChange={(e) => handleSliderChange(e.target.value)}
            className="w-full accent-sage-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-clay-700">
            <span>Easily distracted</span>
            <span>Deeply in the zone</span>
          </div>
        </div>

        {/* Q3: Enjoyment */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-semibold text-clay-900 block">
            3. Did you enjoy this session?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {POST_GAME_QUESTIONS[2].options.map(opt => (
              <button
                type="button"
                key={opt}
                onClick={() => handleSelectOption('q3_enjoyment', opt)}
                className={`p-2 text-xs rounded-xl border text-center transition-all ${
                  answers.q3_enjoyment === opt
                    ? 'border-sage-600 bg-sage-50 text-sage-900 font-semibold'
                    : 'border-cream-200 bg-cream-50 hover:bg-cream-100 text-clay-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Q4: Difficulty */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-semibold text-clay-900 block">
            4. How difficult was it?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {POST_GAME_QUESTIONS[3].options.map(opt => (
              <button
                type="button"
                key={opt}
                onClick={() => handleSelectOption('q4_difficulty', opt)}
                className={`p-2 text-xs rounded-xl border text-center transition-all ${
                  answers.q4_difficulty === opt
                    ? 'border-sage-600 bg-sage-50 text-sage-900 font-semibold'
                    : 'border-cream-200 bg-cream-50 hover:bg-cream-100 text-clay-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Q5: Current State */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-semibold text-clay-900 block">
            5. How are you feeling now?
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {POST_GAME_QUESTIONS[4].quickTags.map(tag => (
              <button
                type="button"
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                  selectedTag === tag
                    ? 'bg-sage-600 text-white border-sage-600 font-medium'
                    : 'bg-cream-100 text-clay-700 border-cream-200 hover:bg-cream-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Optional thought or personal note..."
            value={answers.q5_current_state}
            onChange={(e) => setAnswers(prev => ({ ...prev, q5_current_state: e.target.value }))}
            className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-200 rounded-xl text-xs text-clay-900 focus:outline-none focus:ring-2 focus:ring-sage-500"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-3 border-t border-cream-100">
          <Button variant="ghost" size="md" onClick={onClose}>
            Skip for now
          </Button>
          <Button variant="primary" size="md" type="submit" icon={CheckCircle2}>
            Save Reflection
          </Button>
        </div>
      </form>
    </Modal>
  );
};
