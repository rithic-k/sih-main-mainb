import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Sparkles, CheckCircle2, RotateCcw, Compass, Circle, Square, Triangle, Hexagon } from 'lucide-react';
import { mockGamesService } from '../../services/mockGames';

const SHAPES = [
  { id: 'circle', label: 'Circle', icon: Circle, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { id: 'square', label: 'Square', icon: Square, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { id: 'triangle', label: 'Triangle', icon: Triangle, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { id: 'hexagon', label: 'Hexagon', icon: Hexagon, color: 'text-terracotta-600 bg-terracotta-50 border-terracotta-200' }
];

const PATTERN_ROUNDS = [
  {
    sequence: ['circle', 'triangle', 'circle', 'triangle', 'circle'],
    correct: 'triangle',
    hint: 'Alternating cadence'
  },
  {
    sequence: ['square', 'square', 'circle', 'square', 'square'],
    correct: 'circle',
    hint: 'Two by one grouping'
  },
  {
    sequence: ['triangle', 'square', 'hexagon', 'triangle', 'square'],
    correct: 'hexagon',
    hint: 'Triad rotation'
  }
];

export const PatternGame = ({ onCompleteGame }) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const [selectedGuess, setSelectedGuess] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'try_again'
  const [score, setScore] = useState(0);

  const currentRound = PATTERN_ROUNDS[roundIdx];

  const handleGuess = (shapeId) => {
    setSelectedGuess(shapeId);
    if (shapeId === currentRound.correct) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('try_again');
    }
  };

  const handleNextRound = () => {
    setSelectedGuess(null);
    setFeedback(null);
    if (roundIdx < PATTERN_ROUNDS.length - 1) {
      setRoundIdx(roundIdx + 1);
    } else {
      mockGamesService.incrementGameCount('pattern', 5);
      if (onCompleteGame) onCompleteGame('Pattern Harmony');
    }
  };

  const getShapeComponent = (shapeId) => {
    const s = SHAPES.find(item => item.id === shapeId) || SHAPES[0];
    const Icon = s.icon;
    return (
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-2 shadow-xs ${s.color}`}>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-cream-200 shadow-soft flex items-center justify-between">
        <div className="text-xs text-clay-700">
          Pattern Round <strong>{roundIdx + 1} of {PATTERN_ROUNDS.length}</strong>
        </div>
        <div className="text-xs font-semibold text-sage-800 bg-sage-50 px-3 py-1 rounded-full border border-sage-200">
          Score: {score}
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft-lg space-y-6 text-center">
        <h4 className="text-sm font-semibold text-clay-900">What shape completes this harmony?</h4>

        {/* Sequence Display */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap py-4">
          {currentRound.sequence.map((shapeId, idx) => (
            <React.Fragment key={idx}>
              {getShapeComponent(shapeId)}
            </React.Fragment>
          ))}
          {/* Missing slot */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 border-dashed border-sage-400 bg-sage-50/50 flex items-center justify-center font-bold text-sage-700 text-xl animate-gentle-pulse">
            ?
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-4 gap-3 pt-4 border-t border-cream-100">
          {SHAPES.map(shape => {
            const Icon = shape.icon;
            const isSelected = selectedGuess === shape.id;
            return (
              <button
                key={shape.id}
                onClick={() => handleGuess(shape.id)}
                disabled={feedback === 'correct'}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                  isSelected ? 'border-sage-600 bg-sage-50 scale-105' : 'border-cream-200 bg-cream-50 hover:bg-cream-100'
                }`}
              >
                <Icon className="w-5 h-5 text-clay-800" />
                <span className="text-[11px] font-medium text-clay-700">{shape.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback message */}
        {feedback === 'correct' && (
          <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Harmonious pattern identified!</span>
          </div>
        )}

        {feedback === 'try_again' && (
          <div className="p-3 bg-amber-50 text-amber-900 rounded-xl text-xs font-medium animate-fadeIn">
            Gentle hint: Look at the rhythm in the sequence. Try another shape.
          </div>
        )}

        {feedback === 'correct' && (
          <Button variant="primary" size="md" onClick={handleNextRound} className="w-full">
            {roundIdx < PATTERN_ROUNDS.length - 1 ? 'Next Pattern' : 'Complete & Reflect'}
          </Button>
        )}
      </div>
    </div>
  );
};
