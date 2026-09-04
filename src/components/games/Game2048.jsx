import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../common/Button';
import { RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { mockGamesService } from '../../services/mockGames';

const SIZE = 4;

export const Game2048 = ({ onCompleteGame }) => {
  const [grid, setGrid] = useState(() => getInitialGrid());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(1480);
  const [gameOver, setGameOver] = useState(false);
  const [reached2048, setReached2048] = useState(false);

  function getInitialGrid() {
    let newGrid = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));
    newGrid = addRandomTile(newGrid);
    newGrid = addRandomTile(newGrid);
    return newGrid;
  }

  function addRandomTile(currentGrid) {
    const emptyCells = [];
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (currentGrid[r][c] === 0) {
          emptyCells.push({ r, c });
        }
      }
    }
    if (emptyCells.length === 0) return currentGrid;
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = currentGrid.map(row => [...row]);
    newGrid[randomCell.r][randomCell.c] = Math.random() < 0.9 ? 2 : 4;
    return newGrid;
  }

  const slideAndMergeRow = (row) => {
    let filtered = row.filter(val => val !== 0);
    let gainedScore = 0;
    for (let i = 0; i < filtered.length - 1; i++) {
      if (filtered[i] === filtered[i + 1]) {
        filtered[i] *= 2;
        gainedScore += filtered[i];
        filtered[i + 1] = 0;
      }
    }
    filtered = filtered.filter(val => val !== 0);
    while (filtered.length < SIZE) {
      filtered.push(0);
    }
    return { newRow: filtered, gainedScore };
  };

  const move = useCallback((direction) => {
    if (gameOver) return;

    let newGrid = grid.map(row => [...row]);
    let totalGained = 0;
    let changed = false;

    if (direction === 'left') {
      for (let r = 0; r < SIZE; r++) {
        const { newRow, gainedScore } = slideAndMergeRow(newGrid[r]);
        totalGained += gainedScore;
        if (JSON.stringify(newRow) !== JSON.stringify(newGrid[r])) changed = true;
        newGrid[r] = newRow;
      }
    } else if (direction === 'right') {
      for (let r = 0; r < SIZE; r++) {
        const reversed = [...newGrid[r]].reverse();
        const { newRow, gainedScore } = slideAndMergeRow(reversed);
        const unreversed = newRow.reverse();
        totalGained += gainedScore;
        if (JSON.stringify(unreversed) !== JSON.stringify(newGrid[r])) changed = true;
        newGrid[r] = unreversed;
      }
    } else if (direction === 'up') {
      for (let c = 0; c < SIZE; c++) {
        let col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]];
        const { newRow, gainedScore } = slideAndMergeRow(col);
        totalGained += gainedScore;
        for (let r = 0; r < SIZE; r++) {
          if (newGrid[r][c] !== newRow[r]) changed = true;
          newGrid[r][c] = newRow[r];
        }
      }
    } else if (direction === 'down') {
      for (let c = 0; c < SIZE; c++) {
        let col = [newGrid[3][c], newGrid[2][c], newGrid[1][c], newGrid[0][c]];
        const { newRow, gainedScore } = slideAndMergeRow(col);
        totalGained += gainedScore;
        const unreversed = newRow.reverse();
        for (let r = 0; r < SIZE; r++) {
          if (newGrid[r][c] !== unreversed[r]) changed = true;
          newGrid[r][c] = unreversed[r];
        }
      }
    }

    if (changed) {
      const gridWithNew = addRandomTile(newGrid);
      setGrid(gridWithNew);
      const nextScore = score + totalGained;
      setScore(nextScore);
      if (nextScore > bestScore) setBestScore(nextScore);

      // Check if 2048 reached
      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
          if (gridWithNew[r][c] >= 2048 && !reached2048) {
            setReached2048(true);
          }
        }
      }
    }
  }, [grid, score, bestScore, gameOver, reached2048]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        move('up');
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        move('down');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        move('left');
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        move('right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  const handleReset = () => {
    setGrid(getInitialGrid());
    setScore(0);
    setGameOver(false);
    setReached2048(false);
  };

  const handleFinishSession = () => {
    mockGamesService.incrementGameCount('game2048', 8);
    if (onCompleteGame) {
      onCompleteGame('2048 (Mind Flow)');
    }
  };

  const getTileStyle = (val) => {
    switch (val) {
      case 2: return 'bg-cream-100 text-clay-900 border border-cream-300';
      case 4: return 'bg-sand-100 text-clay-900 border border-sand-300';
      case 8: return 'bg-sage-100 text-sage-900 border border-sage-200';
      case 16: return 'bg-sage-200 text-sage-900 font-bold';
      case 32: return 'bg-sage-300 text-sage-950 font-bold';
      case 64: return 'bg-sage-400 text-white font-bold';
      case 128: return 'bg-sage-600 text-white font-bold text-xl sm:text-2xl';
      case 256: return 'bg-terracotta-300 text-white font-bold text-xl sm:text-2xl';
      case 512: return 'bg-terracotta-400 text-white font-bold text-xl sm:text-2xl';
      case 1024: return 'bg-terracotta-500 text-white font-bold text-lg sm:text-xl';
      case 2048: return 'bg-terracotta-600 text-white font-bold text-lg sm:text-xl ring-2 ring-terracotta-300';
      default: return 'bg-cream-50/70 border border-cream-200/50';
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Score Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-cream-200 shadow-soft">
        <div>
          <span className="text-xs text-clay-700 block">Current Flow Score</span>
          <span className="text-2xl font-bold font-serif text-clay-900">{score}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-clay-700 block">Personal Best</span>
            <span className="text-sm font-semibold text-sage-700">{bestScore}</span>
          </div>
          <Button variant="ghost" size="sm" icon={RotateCcw} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      {/* 2048 4x4 Board */}
      <div className="bg-sand-200 p-3 sm:p-4 rounded-3xl border border-cream-300 shadow-soft-lg aspect-square">
        <div className="grid grid-cols-4 grid-rows-4 gap-2 sm:gap-3 w-full h-full">
          {grid.map((row, r) =>
            row.map((val, c) => (
              <div
                key={`${r}-${c}`}
                className={`rounded-2xl flex items-center justify-center font-bold text-xl sm:text-3xl transition-all duration-100 select-none shadow-xs ${getTileStyle(val)}`}
              >
                {val !== 0 ? val : ''}
              </div>
            ))
          )}
        </div>
      </div>

      {/* On-screen D-Pad for Touch/Mobile */}
      <div className="bg-white p-4 rounded-2xl border border-cream-200 shadow-soft flex flex-col items-center gap-2">
        <span className="text-xs text-clay-700 mb-1">Use arrow keys or touch controls</span>
        <button
          onClick={() => move('up')}
          className="w-12 h-12 bg-cream-100 hover:bg-sage-100 active:bg-sage-200 rounded-xl flex items-center justify-center border border-cream-300"
          aria-label="Move Up"
        >
          <ArrowUp className="w-5 h-5 text-clay-800" />
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => move('left')}
            className="w-12 h-12 bg-cream-100 hover:bg-sage-100 active:bg-sage-200 rounded-xl flex items-center justify-center border border-cream-300"
            aria-label="Move Left"
          >
            <ArrowLeft className="w-5 h-5 text-clay-800" />
          </button>
          <button
            onClick={() => move('down')}
            className="w-12 h-12 bg-cream-100 hover:bg-sage-100 active:bg-sage-200 rounded-xl flex items-center justify-center border border-cream-300"
            aria-label="Move Down"
          >
            <ArrowDown className="w-5 h-5 text-clay-800" />
          </button>
          <button
            onClick={() => move('right')}
            className="w-12 h-12 bg-cream-100 hover:bg-sage-100 active:bg-sage-200 rounded-xl flex items-center justify-center border border-cream-300"
            aria-label="Move Right"
          >
            <ArrowRight className="w-5 h-5 text-clay-800" />
          </button>
        </div>
      </div>

      {/* Complete Session Button */}
      <div className="text-center pt-2">
        <Button variant="primary" size="md" onClick={handleFinishSession} className="w-full">
          Finish Session & Reflect
        </Button>
      </div>
    </div>
  );
};
