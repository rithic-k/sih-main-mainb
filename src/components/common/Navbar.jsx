import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useRoutine } from '../../context/RoutineContext';
import { Button } from './Button';
import { Avatar } from './Avatar';
import {
  Menu, X, Sparkles, HeartHandshake, Bell, Shield,
  UserCheck, Users, Stethoscope, Compass, LogOut
} from 'lucide-react';
import { maskPhoneNumber } from '../../services/mockAuth';

export const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { currentPage, navigateTo, activeUser, switchRole, setShowEmergencyModal } = useApp();
  const { breakReminderNotice, showBreakAlert, dismissBreakAlert } = useRoutine();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const isLanding = currentPage === 'landing';
  const isOnboarding = currentPage === 'onboarding';

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-cream-200/80">
      {/* Break Reminder Banner if triggered */}
      {showBreakAlert && !isLanding && !isOnboarding && (
        <div className="bg-sage-600 text-white text-xs px-4 py-2 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-sage-200 shrink-0" />
            <span>{breakReminderNotice}</span>
          </div>
          <button
            onClick={dismissBreakAlert}
            className="text-xs text-sage-100 hover:text-white underline ml-4"
          >
            Take 5-min Pause
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Brand Logo & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {!isLanding && !isOnboarding && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-xl text-clay-700 hover:text-clay-900 hover:bg-cream-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <button
              onClick={() => navigateTo(isLanding ? 'landing' : 'home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-sage-600 to-sage-700 text-white flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
                <span className="font-serif font-bold text-lg tracking-wider">S</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-clay-900 block leading-tight">
                  SEERA
                </span>
                <span className="text-[10px] text-sage-700 font-medium tracking-wide hidden sm:block">
                  Stories • Emotions • Exploration • Reflection • Aspirations
                </span>
              </div>
            </button>
          </div>

          {/* Center/Right Actions */}
          {isLanding ? (
            <div className="flex items-center gap-3 sm:gap-6">
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-clay-700">
                <a href="#how-it-works" className="hover:text-sage-700 transition-colors">How it works</a>
                <a href="#about" className="hover:text-sage-700 transition-colors">Philosophy</a>
                <a href="#timeline" className="hover:text-sage-700 transition-colors">60-Day Journey</a>
                <button
                  onClick={() => navigateTo('counsellor')}
                  className="hover:text-sage-700 transition-colors"
                >
                  Counsellor Portal
                </button>
              </nav>

              <div className="flex items-center gap-2 sm:gap-3">
                <Button
                  variant="subtle"
                  size="sm"
                  onClick={() => navigateTo('counsellor')}
                  className="hidden sm:inline-flex"
                >
                  I'm a Counsellor
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigateTo('onboarding')}
                >
                  Start Your Journey
                </Button>
              </div>
            </div>
          ) : isOnboarding ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-clay-700 bg-cream-100 px-3 py-1.5 rounded-full border border-cream-200">
                Setup Mode
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateTo('landing')}
              >
                Exit
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Emergency SOS Button */}
              <button
                onClick={() => setShowEmergencyModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-terracotta-700 bg-terracotta-50 hover:bg-terracotta-100 border border-terracotta-200 rounded-xl transition-all shadow-sm"
                title="Immediate Human Support"
              >
                <HeartHandshake className="w-4 h-4 text-terracotta-500" />
                <span className="hidden sm:inline">Need Support?</span>
              </button>

              {/* Role Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-cream-100 hover:bg-cream-200/80 border border-cream-200 rounded-xl text-xs font-semibold text-clay-800 transition-colors"
                >
                  <span className="capitalize">{activeUser.accountType.replace('_', ' ')}</span>
                  <span className="text-[10px] text-sage-700">▼</span>
                </button>

                {showRoleDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-soft-xl border border-cream-200 p-2 z-50 animate-fadeIn">
                    <div className="text-[11px] font-bold text-clay-700 px-3 py-1 uppercase tracking-wider">
                      Demo Role Switcher
                    </div>
                    <button
                      onClick={() => { switchRole('individual'); setShowRoleDropdown(false); }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs rounded-xl hover:bg-cream-100 text-clay-800"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-sage-600" />
                      <span>Individual User</span>
                    </button>
                    <button
                      onClick={() => { switchRole('young_user'); setShowRoleDropdown(false); }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs rounded-xl hover:bg-cream-100 text-clay-800"
                    >
                      <Compass className="w-3.5 h-3.5 text-blue-600" />
                      <span>Young User</span>
                    </button>
                    <button
                      onClick={() => { switchRole('parent'); setShowRoleDropdown(false); }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs rounded-xl hover:bg-cream-100 text-clay-800"
                    >
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      <span>Parent / Family</span>
                    </button>
                    <button
                      onClick={() => { switchRole('counsellor'); setShowRoleDropdown(false); }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs rounded-xl hover:bg-cream-100 text-clay-800"
                    >
                      <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
                      <span>Counsellor Portal</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Avatar Button */}
              <button
                onClick={() => navigateTo('profile')}
                className="flex items-center gap-2 p-1 pl-2 bg-white hover:bg-cream-50 border border-cream-200 rounded-full transition-all"
              >
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-clay-900 leading-tight">
                    {activeUser.displayName}
                  </div>
                  <div className="text-[10px] text-clay-700">
                    {maskPhoneNumber(activeUser.phone)}
                  </div>
                </div>
                <Avatar name={activeUser.displayName} size="sm" seed={activeUser.avatarSeed} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
