import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { RotateCcw, Sparkles, CheckCircle2, Award, Eraser, Edit3, HelpCircle } from 'lucide-react';
import { mockGamesService } from '../../services/mockGames';

// Valid 9x9 Sudoku sample boards with different clue levels
const PUZZLE_EASY = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const SOLUTION_EASY = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

export const SudokuGame = ({ onCompleteGame }) => {
  const [initialBoard, setInitialBoard] = useState(PUZZLE_EASY);
  const [board, setBoard] = useState(() => JSON.parse(JSON.stringify(PUZZLE_EASY)));
  const [selectedCell, setSelectedCell] = useState([0, 2]); // [row, col]
  const [notesMode, setNotesMode] = useState(false);
  const [notes, setNotes] = useState({});
  const [history, setHistory] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Check if solved
  const checkCompletion = (currentBoard) => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (currentBoard[r][c] !== SOLUTION_EASY[r][c]) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCellClick = (r, c) => {
    setSelectedCell([r, c]);
  };

  const handleNumberInput = (num) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    if (initialBoard[r][c] !== 0) return; // Cannot edit initial clues

    if (notesMode) {
      const key = `${r}-${c}`;
      const cellNotes = notes[key] || [];
      const updated = cellNotes.includes(num)
        ? cellNotes.filter(n => n !== num)
        : [...cellNotes, num];
      setNotes({ ...notes, [key]: updated });
      return;
    }

    const prevVal = board[r][c];
    if (prevVal === num) return;

    setHistory([...history, { r, c, prevVal }]);
    const nextBoard = board.map((row, rowIdx) =>
      row.map((cell, colIdx) => (rowIdx === r && colIdx === c ? num : cell))
    );
    setBoard(nextBoard);

    if (checkCompletion(nextBoard)) {
      setIsCompleted(true);
      mockGamesService.incrementGameCount('sudoku', 10);
      if (onCompleteGame) {
        onCompleteGame('Sudoku (Calm Focus)');
      }
    }
  };

  const handleErase = () => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    if (initialBoard[r][c] !== 0) return;

    const prevVal = board[r][c];
    setHistory([...history, { r, c, prevVal }]);
    const nextBoard = board.map((row, rowIdx) =>
      row.map((cell, colIdx) => (rowIdx === r && colIdx === c ? 0 : cell))
    );
    setBoard(nextBoard);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory(history.slice(0, -1));
    const nextBoard = board.map((row, rowIdx) =>
      row.map((cell, colIdx) => (rowIdx === last.r && colIdx === last.c ? last.prevVal : cell))
    );
    setBoard(nextBoard);
  };

  const handleAutoHint = () => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    if (initialBoard[r][c] !== 0) return;
    const correctVal = SOLUTION_EASY[r][c];
    handleNumberInput(correctVal);
  };

  const handleReset = () => {
    setBoard(JSON.parse(JSON.stringify(PUZZLE_EASY)));
    setHistory([]);
    setNotes({});
    setIsCompleted(false);
  };

  const handleFillDemoSolution = () => {
    // Fill almost all except one cell for quick testing
    const demo = JSON.parse(JSON.stringify(SOLUTION_EASY));
    demo[0][2] = 0;
    setBoard(demo);
    setSelectedCell([0, 2]);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-cream-200 shadow-soft">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-sage-800 bg-sage-50 px-3 py-1 rounded-full border border-sage-200">
            Gentle Level
          </span>
          <span className="text-xs text-clay-700">No timers • Zero pressure</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" icon={RotateCcw} onClick={handleReset}>
            Reset
          </Button>
          <Button variant="subtle" size="sm" onClick={handleFillDemoSolution}>
            Demo Quick-Fill
          </Button>
        </div>
      </div>

      {/* Sudoku Grid */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-cream-200 shadow-soft-lg flex justify-center">
        <div className="grid grid-cols-9 gap-0.5 sm:gap-1 bg-clay-700 p-1 sm:p-1.5 rounded-2xl max-w-[420px] w-full aspect-square">
          {board.map((row, r) =>
            row.map((val, c) => {
              const isInitial = initialBoard[r][c] !== 0;
              const isSelected = selectedCell && selectedCell[0] === r && selectedCell[1] === c;
              const isSameRowCol = selectedCell && (selectedCell[0] === r || selectedCell[1] === c);
              const isSameVal = selectedCell && val !== 0 && board[selectedCell[0]][selectedCell[1]] === val;
              const cellNotes = notes[`${r}-${c}`] || [];

              // 3x3 block borders
              const borderRight = (c === 2 || c === 5) ? 'mr-1 sm:mr-1.5' : '';
              const borderBottom = (r === 2 || r === 5) ? 'mb-1 sm:mb-1.5' : '';

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`relative flex items-center justify-center font-medium rounded-lg text-sm sm:text-lg transition-all select-none ${borderRight} ${borderBottom} ${
                    isSelected
                      ? 'bg-sage-200 text-sage-900 ring-2 ring-sage-600 z-10 font-bold'
                      : isSameVal
                      ? 'bg-sage-100 text-sage-900'
                      : isSameRowCol
                      ? 'bg-cream-100 text-clay-900'
                      : 'bg-cream-50 hover:bg-cream-100 text-clay-800'
                  } ${isInitial ? 'font-bold text-clay-900' : 'text-sage-700'}`}
                >
                  {val !== 0 ? (
                    val
                  ) : cellNotes.length > 0 ? (
                    <div className="grid grid-cols-3 gap-0 text-[8px] text-clay-700 leading-none p-0.5">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                        <span key={n}>{cellNotes.includes(n) ? n : ''}</span>
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Control Pad */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-cream-200 shadow-soft space-y-4">
        {/* Action Toggles */}
        <div className="flex items-center justify-between gap-2 border-b border-cream-100 pb-3">
          <Button
            variant={notesMode ? 'primary' : 'secondary'}
            size="sm"
            icon={Edit3}
            onClick={() => setNotesMode(!notesMode)}
          >
            Notes Mode {notesMode ? 'ON' : 'OFF'}
          </Button>
          <Button variant="secondary" size="sm" icon={Eraser} onClick={handleErase}>
            Erase
          </Button>
          <Button variant="secondary" size="sm" icon={RotateCcw} onClick={handleUndo} disabled={history.length === 0}>
            Undo
          </Button>
          <Button variant="subtle" size="sm" icon={HelpCircle} onClick={handleAutoHint}>
            Hint
          </Button>
        </div>

        {/* 1-9 Number Buttons */}
        <div className="grid grid-cols-9 gap-1.5 sm:gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              className="h-11 sm:h-12 bg-cream-100 hover:bg-sage-100 active:bg-sage-200 text-clay-900 font-bold text-base sm:text-lg rounded-xl border border-cream-200 transition-all flex items-center justify-center shadow-xs"
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Success banner if completed */}
      {isCompleted && (
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <div>
              <h4 className="font-bold text-emerald-900 text-sm">Gentle Flow Complete!</h4>
              <p className="text-xs text-emerald-700">Great focus. Taking a moment to pause and reflect.</p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onCompleteGame && onCompleteGame('Sudoku (Gentle)')}
          >
            Reflect on Session
          </Button>
        </div>
      )}
    </div>
  );
};
