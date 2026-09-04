import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { Leaf, Sun, Feather, TreePine, Sparkles, Heart, Compass, Flower2, RotateCcw, CheckCircle2 } from 'lucide-react';
import { mockGamesService } from '../../services/mockGames';

const CARD_ICONS = [
  { id: 'leaf', icon: Leaf, label: 'Leaf', color: 'text-emerald-600' },
  { id: 'sun', icon: Sun, label: 'Sun', color: 'text-amber-500' },
  { id: 'feather', icon: Feather, label: 'Feather', color: 'text-blue-500' },
  { id: 'tree', icon: TreePine, label: 'Pine Tree', color: 'text-sage-700' },
  { id: 'sparkles', icon: Sparkles, label: 'Sparkles', color: 'text-purple-500' },
  { id: 'flower', icon: Flower2, label: 'Flower', color: 'text-rose-500' }
];

export const MemoryGame = ({ onCompleteGame }) => {
  const [cards, setCards] = useState(() => generateShuffledDeck());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [turns, setTurns] = useState(0);

  function generateShuffledDeck() {
    const deck = [];
    CARD_ICONS.forEach((item, index) => {
      deck.push({ uid: `${item.id}-a`, cardId: item.id, icon: item.icon, color: item.color });
      deck.push({ uid: `${item.id}-b`, cardId: item.id, icon: item.icon, color: item.color });
    });
    return deck.sort(() => Math.random() - 0.5);
  }

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2) return;
    if (flippedIndices.includes(index)) return;
    if (matchedIds.includes(cards[index].cardId)) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setTurns(t => t + 1);
      const card1 = cards[newFlipped[0]];
      const card2 = cards[newFlipped[1]];

      if (card1.cardId === card2.cardId) {
        const nextMatched = [...matchedIds, card1.cardId];
        setMatchedIds(nextMatched);
        setFlippedIndices([]);

        if (nextMatched.length === CARD_ICONS.length) {
          mockGamesService.incrementGameCount('memory', 6);
          setTimeout(() => {
            if (onCompleteGame) onCompleteGame('Memory Match (Nature Flow)');
          }, 800);
        }
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1100);
      }
    }
  };

  const handleReset = () => {
    setCards(generateShuffledDeck());
    setFlippedIndices([]);
    setMatchedIds([]);
    setTurns(0);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-cream-200 shadow-soft flex items-center justify-between">
        <div className="text-xs text-clay-700">
          Pairs Found: <strong>{matchedIds.length} / {CARD_ICONS.length}</strong>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-clay-700">Turns: {turns}</span>
          <Button variant="ghost" size="sm" icon={RotateCcw} onClick={handleReset}>
            Shuffle
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-cream-200 shadow-soft-lg">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 aspect-[4/3]">
          {cards.map((card, idx) => {
            const isFlipped = flippedIndices.includes(idx) || matchedIds.includes(card.cardId);
            const isMatched = matchedIds.includes(card.cardId);
            const Icon = card.icon;

            return (
              <button
                key={card.uid}
                onClick={() => handleCardClick(idx)}
                className={`rounded-2xl flex items-center justify-center transition-all duration-300 transform perspective-1000 ${
                  isMatched
                    ? 'bg-emerald-50 border-2 border-emerald-300 text-emerald-700 opacity-90 scale-95'
                    : isFlipped
                    ? 'bg-cream-50 border-2 border-sage-500 shadow-soft'
                    : 'bg-sand-100 hover:bg-sand-200 border border-cream-300 text-clay-700'
                }`}
              >
                {isFlipped ? (
                  <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${card.color} animate-scaleIn`} />
                ) : (
                  <span className="font-serif text-xs text-clay-700 opacity-60">✦</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {matchedIds.length === CARD_ICONS.length && (
        <div className="p-4 bg-emerald-50 text-emerald-900 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All nature pairs matched mindfully!</span>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onCompleteGame && onCompleteGame('Memory Match (Nature Flow)')}
          >
            Reflect
          </Button>
        </div>
      )}
    </div>
  );
};
