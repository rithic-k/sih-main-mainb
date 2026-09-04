import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageHeader } from '../components/common/PageHeader';
import { ProgressBar } from '../components/common/ProgressBar';
import { mockFlashcardsService } from '../services/mockFlashcards';
import {
  Layers, RotateCw, CheckCircle2, XCircle, Sparkles, HelpCircle,
  Flame, Award, ArrowRight, ArrowLeft, BookOpen, ChevronRight
} from 'lucide-react';

export const FlashcardsPage = () => {
  const { showToast } = useApp();
  const decks = mockFlashcardsService.getDecks();
  const [selectedDeckId, setSelectedDeckId] = useState(decks[0].id);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [progress, setProgress] = useState(() => mockFlashcardsService.getProgress());

  const activeDeck = decks.find(d => d.id === selectedDeckId) || decks[0];
  const currentCard = activeDeck.cards[currentCardIndex] || activeDeck.cards[0];
  const isCardMastered = (progress.masteredCards || []).includes(currentCard.id);

  const handleSelectDeck = (deckId) => {
    setSelectedDeckId(deckId);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = (isCorrect) => {
    const updated = mockFlashcardsService.markCardResult(currentCard.id, isCorrect);
    setProgress(updated);
    if (isCorrect) {
      showToast('Mastered concept! Streak continued 🔥', 'success');
    }

    setIsFlipped(false);
    setShowHint(false);
    if (currentCardIndex < activeDeck.cards.length - 1) {
      setCurrentCardIndex(c => c + 1);
    } else {
      setCurrentCardIndex(0);
      showToast(`Finished deck: ${activeDeck.title}!`, 'success');
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy': return 'bg-emerald-100 text-emerald-800';
      case 'Medium': return 'bg-amber-100 text-amber-800';
      case 'Hard': return 'bg-rose-100 text-rose-800';
      default: return 'bg-cream-100 text-clay-700';
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader
        title="Goal-Oriented Flashcards"
        subtitle="Reinforce key concepts, communication tools, and technical foundations."
        badge="Active Recall"
      />

      {/* Stats Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-cream-200 shadow-soft">
          <span className="text-xs text-clay-700 block">Current Streak</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Flame className="w-5 h-5 text-terracotta-500" />
            <span className="text-xl font-bold font-serif text-clay-900">{progress.currentStreak} in a row</span>
          </div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-cream-200 shadow-soft">
          <span className="text-xs text-clay-700 block">Mastery Accuracy</span>
          <span className="text-xl font-bold font-serif text-sage-700 mt-0.5 block">{progress.accuracyRate}%</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-cream-200 shadow-soft">
          <span className="text-xs text-clay-700 block">Cards Mastered</span>
          <span className="text-xl font-bold font-serif text-clay-900 mt-0.5 block">{progress.masteredCards.length} Cards</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-cream-200 shadow-soft">
          <span className="text-xs text-clay-700 block">Total Reviews</span>
          <span className="text-xl font-bold font-serif text-clay-900 mt-0.5 block">{progress.totalReviewed}</span>
        </div>
      </div>

      {/* Deck Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {decks.map((deck) => (
          <button
            key={deck.id}
            onClick={() => handleSelectDeck(deck.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
              selectedDeckId === deck.id
                ? 'bg-sage-600 text-white border-sage-600 shadow-soft'
                : 'bg-white border-cream-200 text-clay-700 hover:bg-cream-100'
            }`}
          >
            <span>{deck.title}</span>
            <span className="ml-1.5 opacity-70">({deck.totalCards})</span>
          </button>
        ))}
      </div>

      {/* Flashcard Area */}
      <div className="space-y-6">
        {/* Card Progress */}
        <div className="flex items-center justify-between text-xs text-clay-700">
          <span>Card {currentCardIndex + 1} of {activeDeck.cards.length}</span>
          <span className={`px-2 py-0.5 rounded font-bold ${getDifficultyColor(currentCard.difficulty)}`}>
            {currentCard.difficulty}
          </span>
        </div>

        {/* 3D Flip Card */}
        <div
          onClick={handleFlip}
          className="perspective-1000 w-full min-h-[320px] sm:min-h-[360px] cursor-pointer"
        >
          <div
            className={`relative w-full h-full min-h-[320px] sm:min-h-[360px] rounded-3xl transition-transform duration-500 transform-style-3d shadow-soft-lg border-2 ${
              isFlipped ? 'rotate-y-180 border-sage-400 bg-sage-50/70' : 'border-cream-300 bg-white'
            }`}
          >
            {/* FRONT SIDE */}
            <div className={`absolute inset-0 p-8 flex flex-col justify-between backface-hidden ${isFlipped ? 'hidden' : 'flex'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sage-800 bg-sage-100 px-3 py-1 rounded-full">
                  Question
                </span>
                <span className="text-xs text-clay-700 flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Tap to reveal answer</span>
                </span>
              </div>

              <div className="my-auto text-center px-4 space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-clay-900 leading-snug">
                  {currentCard.question}
                </h3>
                {showHint && (
                  <p className="text-xs text-terracotta-700 bg-terracotta-50 p-2.5 rounded-xl inline-block">
                    💡 Hint: {currentCard.hint}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-cream-100 text-xs text-clay-700">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setShowHint(!showHint); }}
                  className="text-sage-700 hover:text-sage-900 font-semibold flex items-center gap-1"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                </button>
                <span>{isCardMastered ? '★ Mastered Concept' : 'Learning Phase'}</span>
              </div>
            </div>

            {/* BACK SIDE */}
            <div className={`absolute inset-0 p-8 flex flex-col justify-between backface-hidden rotate-y-180 ${isFlipped ? 'flex' : 'hidden'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Key Concept Explanation
                </span>
                <span className="text-xs text-clay-700">Tap to flip back</span>
              </div>

              <div className="my-auto text-left px-2 space-y-3">
                <p className="text-sm sm:text-base text-clay-900 leading-relaxed font-medium">
                  {currentCard.answer}
                </p>
              </div>

              <div className="pt-4 border-t border-cream-200 text-xs text-clay-700">
                {activeDeck.title} • {currentCard.difficulty}
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <Button
            variant="secondary"
            size="lg"
            icon={XCircle}
            onClick={() => handleNextCard(false)}
            className="flex-1 text-rose-700 border-rose-200 hover:bg-rose-50"
          >
            Review Again
          </Button>
          <Button
            variant="primary"
            size="lg"
            icon={CheckCircle2}
            onClick={() => handleNextCard(true)}
            className="flex-1 bg-emerald-700 hover:bg-emerald-800"
          >
            Got It!
          </Button>
        </div>
      </div>
    </div>
  );
};
