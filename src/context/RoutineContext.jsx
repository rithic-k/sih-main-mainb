import React, { createContext, useContext, useState, useEffect } from 'react';

const RoutineContext = createContext();

export const RoutineProvider = ({ children }) => {
  const [focusSeconds, setFocusSeconds] = useState(1500); // default 25 min
  const [isFocusRunning, setIsFocusRunning] = useState(false);
  const [activePreset, setActivePreset] = useState(25);
  const [dailyProductiveMinutes, setDailyProductiveMinutes] = useState(52);
  const [dailyEntertainmentMinutes, setDailyEntertainmentMinutes] = useState(28);
  const [lateNightMinutes, setLateNightMinutes] = useState(0);
  const [breakReminderNotice, setBreakReminderNotice] = useState(
    "You've been focused for 52 minutes. A short break might help."
  );
  const [showBreakAlert, setShowBreakAlert] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isFocusRunning && focusSeconds > 0) {
      interval = setInterval(() => {
        setFocusSeconds(prev => prev - 1);
      }, 1000);
    } else if (focusSeconds === 0 && isFocusRunning) {
      setIsFocusRunning(false);
      setShowBreakAlert(true);
    }
    return () => clearInterval(interval);
  }, [isFocusRunning, focusSeconds]);

  const startFocusTimer = (minutes = activePreset) => {
    setActivePreset(minutes);
    setFocusSeconds(minutes * 60);
    setIsFocusRunning(true);
    setShowBreakAlert(false);
  };

  const pauseFocusTimer = () => {
    setIsFocusRunning(false);
  };

  const resetFocusTimer = () => {
    setIsFocusRunning(false);
    setFocusSeconds(activePreset * 60);
  };

  const dismissBreakAlert = () => {
    setShowBreakAlert(false);
  };

  const formatTimer = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <RoutineContext.Provider
      value={{
        focusSeconds,
        isFocusRunning,
        activePreset,
        startFocusTimer,
        pauseFocusTimer,
        resetFocusTimer,
        formatTimer,
        dailyProductiveMinutes,
        dailyEntertainmentMinutes,
        lateNightMinutes,
        breakReminderNotice,
        showBreakAlert,
        setShowBreakAlert,
        dismissBreakAlert
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

export const useRoutine = () => useContext(RoutineContext);
