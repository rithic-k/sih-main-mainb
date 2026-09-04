import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RoutineProvider } from './context/RoutineContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { Toast } from './components/common/Toast';
import { EmergencyModal } from './components/common/EmergencyModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DailyPlanPage } from './pages/DailyPlanPage';
import { GoalsPage } from './pages/GoalsPage';
import { MindGamesPage } from './pages/MindGamesPage';
import { JournalPage } from './pages/JournalPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { HobbyHubPage } from './pages/HobbyHubPage';
import { ScreenTimePage } from './pages/ScreenTimePage';
import { JourneyPage } from './pages/JourneyPage';
import { ProfilePage } from './pages/ProfilePage';
import { CounsellorPage } from './pages/CounsellorPage';
import { VideoCallPage } from './pages/VideoCallPage';
import { FamilyModePage } from './pages/FamilyModePage';
import { SafetyPage } from './pages/SafetyPage';

const AppContent = () => {
  const { currentPage, toast, showEmergencyModal, setShowEmergencyModal } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isFullLayout = currentPage !== 'landing' && currentPage !== 'onboarding';

  const renderActivePage = () => {
    switch (currentPage) {
      case 'landing': return <LandingPage />;
      case 'onboarding': return <OnboardingPage />;
      case 'home': return <DashboardPage />;
      case 'plan': return <DailyPlanPage />;
      case 'goals': return <GoalsPage />;
      case 'games': return <MindGamesPage />;
      case 'journal': return <JournalPage />;
      case 'flashcards': return <FlashcardsPage />;
      case 'hobbies': return <HobbyHubPage />;
      case 'routine': return <ScreenTimePage />;
      case 'journey': return <JourneyPage />;
      case 'profile': return <ProfilePage />;
      case 'counsellor': return <CounsellorPage />;
      case 'videocall': return <VideoCallPage />;
      case 'family': return <FamilyModePage />;
      case 'safety': return <SafetyPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-clay-900 font-sans">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex">
        {isFullLayout && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        <main className={`flex-1 transition-all duration-300 ${isFullLayout ? 'lg:pl-64' : ''}`}>
          {renderActivePage()}
        </main>
      </div>

      {/* Global Notifications & Emergency Dialogue */}
      {toast && <Toast message={toast.message} type={toast.type} />}
      <EmergencyModal
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <RoutineProvider>
        <AppContent />
      </RoutineProvider>
    </AppProvider>
  );
}
