import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageHeader } from '../components/common/PageHeader';
import { SudokuGame } from '../components/games/SudokuGame';
import { Game2048 } from '../components/games/Game2048';
import { PatternGame } from '../components/games/PatternGame';
import { MemoryGame } from '../components/games/MemoryGame';
import { GameReflectionModal } from '../components/games/GameReflectionModal';
import { mockGamesService } from '../services/mockGames';
import {
  Gamepad2, Sparkles, Grid3X3, Layers, Compass, Brain,
  Heart, CheckCircle2, RotateCcw, Clock, Award
} from 'lucide-react';

export const MindGamesPage = () => {
  const [activeGame, setActiveGame] = useState(null); // 'sudoku' | '2048' | 'pattern' | 'memory' | null
  const [isReflectionModalOpen, setIsReflectionModalOpen] = useState(false);
  const [lastPlayedTitle, setLastPlayedTitle] = useState('Mindful Activity');
  const [reflections, setReflections] = useState(() => mockGamesService.getReflections());
  const stats = mockGamesService.getStats();

  const handleGameComplete = (gameTitle) => {
    setLastPlayedTitle(gameTitle);
    setIsReflectionModalOpen(true);
  };

  const handleCloseReflection = () => {
    setIsReflectionModalOpen(false);
    setReflections(mockGamesService.getReflections());
  };

  const gamesCatalog = [
    {
      id: 'sudoku',
      title: 'Gentle Sudoku',
      category: 'Focus & Logic',
      duration: '8-12 min',
      description: 'Classic number harmony with notes mode and undo. Calms active thoughts through steady deductive reasoning.',
      icon: Grid3X3,
      badge: 'Playable',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: '2048',
      title: '2048 Mind Flow',
      category: 'Rhythm & Sliding',
      duration: '5-10 min',
      description: 'Slide and merge gentle number tiles in a 4x4 matrix. Non-competitive flow state with arrow and touch controls.',
      icon: Layers,
      badge: 'Playable',
      color: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: 'pattern',
      title: 'Pattern Prediction',
      category: 'Visual Harmony',
      duration: '4-6 min',
      description: 'Identify the next harmonious geometric shape in a peaceful color sequence.',
      icon: Compass,
      badge: 'Playable',
      color: 'bg-blue-50 text-blue-800 border-blue-200'
    },
    {
      id: 'memory',
      title: 'Memory Match',
      category: 'Working Memory',
      duration: '3-5 min',
      description: 'Match calm nature symbols at your own unhurried pace. Zero stress or penalty clocks.',
      icon: Brain,
      badge: 'Playable',
      color: 'bg-purple-50 text-purple-800 border-purple-200'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader
        title="Mind Games & Calm Flow"
        subtitle="Low-pressure mental exercises designed for stillness and gentle cognitive stimulation."
        badge="Zero-Pressure Games"
        actions={
          activeGame && (
            <Button
              variant="secondary"
              size="md"
              icon={RotateCcw}
              onClick={() => setActiveGame(null)}
            >
              Back to Game Hub
            </Button>
          )
        }
      />

      {/* Active Game Screen */}
      {activeGame ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-sand-100 p-4 rounded-2xl border border-cream-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sage-800">
                Active Session
              </span>
              <span className="font-serif font-bold text-clay-900">
                {gamesCatalog.find(g => g.id === activeGame)?.title}
              </span>
            </div>
            <Button
              variant="subtle"
              size="sm"
              onClick={() => handleGameComplete(gamesCatalog.find(g => g.id === activeGame)?.title)}
            >
              Finish & Reflect Now
            </Button>
          </div>

          {activeGame === 'sudoku' && <SudokuGame onCompleteGame={handleGameComplete} />}
          {activeGame === '2048' && <Game2048 onCompleteGame={handleGameComplete} />}
          {activeGame === 'pattern' && <PatternGame onCompleteGame={handleGameComplete} />}
          {activeGame === 'memory' && <MemoryGame onCompleteGame={handleGameComplete} />}
        </div>
      ) : (
        /* Game Hub Cards Grid */
        <div className="space-y-8">
          {/* Gentle Stats overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-cream-200 shadow-soft">
              <span className="text-xs text-clay-700 block">Total Mindful Play</span>
              <span className="text-xl font-bold font-serif text-clay-900">{stats.totalPlayTimeMinutes} mins</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-cream-200 shadow-soft">
              <span className="text-xs text-clay-700 block">Calm Streak</span>
              <span className="text-xl font-bold font-serif text-sage-700">{stats.calmStreakDays} days</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-cream-200 shadow-soft">
              <span className="text-xs text-clay-700 block">Reflections Logged</span>
              <span className="text-xl font-bold font-serif text-terracotta-600">{stats.reflectionsCompleted}</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-cream-200 shadow-soft">
              <span className="text-xs text-clay-700 block">Atmosphere</span>
              <span className="text-sm font-bold text-emerald-700">Gentle & Unranked</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gamesCatalog.map((game) => {
              const Icon = game.icon;
              return (
                <Card
                  key={game.id}
                  variant="interactive"
                  className="p-6 space-y-4 bg-white flex flex-col justify-between"
                  onClick={() => setActiveGame(game.id)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl border ${game.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-sage-800 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-200">
                        {game.duration}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-clay-700">
                        {game.category}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-clay-900 mt-0.5">
                        {game.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-clay-700 mt-1 leading-relaxed">
                        {game.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-cream-100 flex items-center justify-between">
                    <span className="text-xs text-clay-700">5-question reflection after finish</span>
                    <Button variant="primary" size="sm">
                      Play Now
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Past Reflection History */}
          <div className="space-y-4 pt-6">
            <h3 className="font-serif font-bold text-xl text-clay-900">
              Recent Post-Activity Reflections
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reflections.slice(0, 4).map((ref) => (
                <Card key={ref.id} className="p-5 space-y-3 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-clay-900">{ref.gameTitle}</span>
                    <span className="text-[10px] text-clay-700">
                      {new Date(ref.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-clay-700 bg-cream-50 p-3 rounded-xl">
                    <div>Feeling: <strong>{ref.answers?.q1_feeling}</strong></div>
                    <div>Focus Level: <strong>{ref.answers?.q2_focus}/10</strong></div>
                  </div>
                  {ref.answers?.q5_current_state && (
                    <p className="text-xs italic text-clay-700">
                      "{ref.answers.q5_current_state}"
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Post-Game 5-Question Reflection Modal */}
      <GameReflectionModal
        isOpen={isReflectionModalOpen}
        onClose={handleCloseReflection}
        gameTitle={lastPlayedTitle}
      />
    </div>
  );
};
