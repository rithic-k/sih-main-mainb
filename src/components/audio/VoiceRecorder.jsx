import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../common/Button';
import { Mic, Square, Play, Pause, RotateCcw, Check, Sparkles, Volume2, Edit3, AlertCircle } from 'lucide-react';
import { mockJournalService } from '../../services/mockJournal';

export const VoiceRecorder = ({ onSaveVoiceEntry }) => {
  const [recordState, setRecordState] = useState('idle'); // 'idle' | 'recording' | 'paused' | 'recorded' | 'playing'
  const [seconds, setSeconds] = useState(0);
  const [audioTranscript, setAudioTranscript] = useState('');
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [speechApiSupported, setSpeechApiSupported] = useState(false);

  const recognitionRef = useRef(null);

  // Simulated animated bars
  const [waveBars, setWaveBars] = useState([12, 24, 40, 18, 32, 48, 20, 14, 38, 52, 28, 16, 44, 30, 22]);

  useEffect(() => {
    // Check Web Speech Recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechApiSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript.trim()) {
          setAudioTranscript(currentTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition notice:', event.error);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    let timer = null;
    if (recordState === 'recording') {
      timer = setInterval(() => {
        setSeconds(s => s + 1);
        setWaveBars(prev => prev.map(() => Math.floor(Math.random() * 40) + 10));
      }, 1000);
    } else if (recordState === 'playing') {
      timer = setInterval(() => {
        setPlaybackProgress(p => {
          if (p >= 100) {
            setRecordState('recorded');
            return 0;
          }
          return p + 5;
        });
      }, 200);
    }
    return () => clearInterval(timer);
  }, [recordState]);

  const handleStartRecord = () => {
    setRecordState('recording');
    setSeconds(0);
    setAudioTranscript('');
    setIsEditingTranscript(false);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Recognition start exception:', e);
      }
    }
  };

  const handlePauseRecord = () => {
    setRecordState('paused');
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
  };

  const handleResumeRecord = () => {
    setRecordState('recording');
    if (recognitionRef.current) {
      try { recognitionRef.current.start(); } catch (e) {}
    }
  };

  const handleStopRecord = () => {
    setRecordState('recorded');
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    // If no real speech was detected via mic, provide fallback realistic transcript
    setTimeout(() => {
      setAudioTranscript(prev => {
        if (!prev || !prev.trim()) {
          return mockJournalService.getRandomVoiceTranscript();
        }
        return prev;
      });
    }, 200);
  };

  const handleTogglePlay = () => {
    if (recordState === 'playing') {
      setRecordState('recorded');
    } else {
      setRecordState('playing');
      setPlaybackProgress(0);
    }
  };

  const handleReset = () => {
    setRecordState('idle');
    setSeconds(0);
    setAudioTranscript('');
    setPlaybackProgress(0);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSave = () => {
    if (!audioTranscript.trim()) return;
    onSaveVoiceEntry({
      mode: 'voice',
      content: audioTranscript,
      audioDuration: formatTime(seconds || 45),
      tags: ['Voice Note', 'Reflection']
    });
    handleReset();
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft-lg space-y-6">
      {/* Visual Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sage-800 bg-sage-50 px-3 py-1 rounded-full border border-sage-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{speechApiSupported ? 'Live Browser Speech-to-Text Enabled' : 'Simulated Audio Reflection'}</span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-clay-900">
          Talk it out gently
        </h3>
        <p className="text-xs sm:text-sm text-clay-700 max-w-md mx-auto">
          Speak your thoughts naturally into your microphone. SEERA transcribes your voice in real time and allows editing before saving.
        </p>
      </div>

      {/* Mic Animation & Waveform Visualizer */}
      <div className="bg-sand-50/80 rounded-2xl p-6 sm:p-8 border border-cream-200 flex flex-col items-center justify-center space-y-5">
        <div className="relative">
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all ${
              recordState === 'recording'
                ? 'bg-rose-500 text-white ring-8 ring-rose-100 shadow-lg scale-105'
                : recordState === 'playing'
                ? 'bg-sage-600 text-white ring-8 ring-sage-100 shadow-lg'
                : 'bg-cream-100 text-clay-800 border-2 border-cream-300'
            }`}
          >
            {recordState === 'recording' ? (
              <Mic className="w-10 h-10 animate-pulse" />
            ) : recordState === 'playing' ? (
              <Volume2 className="w-10 h-10 animate-bounce-short" />
            ) : (
              <Mic className="w-10 h-10 text-clay-700" />
            )}
          </div>
          {recordState === 'recording' && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
            </span>
          )}
        </div>

        {/* Audio Wave Bars */}
        <div className="flex items-center gap-1.5 h-12">
          {waveBars.map((height, idx) => (
            <div
              key={idx}
              className={`w-1.5 rounded-full transition-all duration-200 ${
                recordState === 'recording'
                  ? 'bg-rose-500'
                  : recordState === 'playing'
                  ? 'bg-sage-600'
                  : 'bg-cream-300'
              }`}
              style={{ height: recordState === 'idle' ? '8px' : `${height}px` }}
            />
          ))}
        </div>

        {/* Timer status */}
        <div className="text-sm font-mono font-bold text-clay-800">
          {recordState === 'idle' ? '00:00 — Tap Record to Begin' : formatTime(seconds)}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {recordState === 'idle' && (
          <Button variant="terracotta" size="lg" icon={Mic} onClick={handleStartRecord}>
            Start Voice Recording
          </Button>
        )}

        {recordState === 'recording' && (
          <>
            <Button variant="secondary" size="md" icon={Pause} onClick={handlePauseRecord}>
              Pause
            </Button>
            <Button variant="danger" size="md" icon={Square} onClick={handleStopRecord}>
              Stop & Review Transcript
            </Button>
          </>
        )}

        {recordState === 'paused' && (
          <>
            <Button variant="primary" size="md" icon={Mic} onClick={handleResumeRecord}>
              Resume
            </Button>
            <Button variant="danger" size="md" icon={Square} onClick={handleStopRecord}>
              Stop & Review Transcript
            </Button>
          </>
        )}

        {(recordState === 'recorded' || recordState === 'playing') && (
          <>
            <Button
              variant="secondary"
              size="md"
              icon={recordState === 'playing' ? Pause : Play}
              onClick={handleTogglePlay}
            >
              {recordState === 'playing' ? 'Pause Replay' : 'Replay Audio'}
            </Button>
            <Button variant="ghost" size="md" icon={RotateCcw} onClick={handleReset}>
              Re-record
            </Button>
          </>
        )}
      </div>

      {/* Live Transcript & Editor Box */}
      {(recordState === 'recorded' || recordState === 'playing' || audioTranscript) && (
        <div className="space-y-3 bg-cream-50 p-5 rounded-2xl border border-cream-200 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-clay-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sage-600" />
              <span>Transcribed Speech (Editable before saving)</span>
            </span>
            <button
              onClick={() => setIsEditingTranscript(!isEditingTranscript)}
              className="text-xs text-sage-700 hover:text-sage-900 font-medium flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>{isEditingTranscript ? 'Done Editing' : 'Edit Text'}</span>
            </button>
          </div>

          {isEditingTranscript ? (
            <textarea
              rows={4}
              value={audioTranscript}
              onChange={(e) => setAudioTranscript(e.target.value)}
              className="w-full p-3 bg-white border border-cream-300 rounded-xl text-xs sm:text-sm text-clay-900 focus:outline-none focus:ring-2 focus:ring-sage-500 leading-relaxed"
            />
          ) : (
            <p className="text-xs sm:text-sm text-clay-800 leading-relaxed italic bg-white/70 p-3 rounded-xl border border-cream-200">
              "{audioTranscript}"
            </p>
          )}

          <div className="flex justify-end pt-2">
            <Button variant="primary" size="md" icon={Check} onClick={handleSave}>
              Save to Journal
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
