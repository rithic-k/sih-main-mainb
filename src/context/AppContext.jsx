import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAuthService } from '../services/mockAuth';
import { mockUserService } from '../services/mockUser';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' | 'onboarding' | 'home' | 'plan' | 'goals' | 'games' | 'journal' | 'flashcards' | 'hobbies' | 'routine' | 'journey' | 'profile' | 'counsellor' | 'videocall' | 'family' | 'safety'
  const [activeUser, setActiveUser] = useState(() => mockAuthService.getCurrentUser());
  const [userPrefs, setUserPrefs] = useState(() => mockUserService.getPreferences());
  const [privacySettings, setPrivacySettings] = useState(() => mockUserService.getPrivacySettings());
  const [activeCounsellorUser, setActiveCounsellorUser] = useState('user-C119');
  const [toast, setToast] = useState(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  // Sync when page changes or session switches
  const navigateTo = (page, params = {}) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (params.counsellorUser) {
      setActiveCounsellorUser(params.counsellorUser);
    }
    setCurrentPage(page);
  };

  const showToast = (message, type = 'info', duration = 3500) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  const updateProfile = (updates) => {
    const updated = mockAuthService.updateCurrentUser(updates);
    setActiveUser(updated);
    return updated;
  };

  const updatePreferences = (updates) => {
    const updated = mockUserService.updatePreferences(updates);
    setUserPrefs(updated);
    return updated;
  };

  const updatePrivacy = (updates) => {
    const updated = mockUserService.updatePrivacySettings(updates);
    setPrivacySettings(updated);
    return updated;
  };

  const switchRole = (newRole) => {
    const updated = mockAuthService.switchAccountType(newRole);
    setActiveUser(updated);
    if (newRole === 'counsellor') {
      navigateTo('counsellor');
    } else if (newRole === 'parent') {
      navigateTo('family');
    } else {
      navigateTo('home');
    }
    showToast(`Switched view to ${newRole.replace('_', ' ').toUpperCase()}`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        activeUser,
        updateProfile,
        userPrefs,
        updatePreferences,
        privacySettings,
        updatePrivacy,
        activeCounsellorUser,
        setActiveCounsellorUser,
        toast,
        showToast,
        showEmergencyModal,
        setShowEmergencyModal,
        switchRole
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
