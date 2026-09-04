import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home, Calendar, Target, Gamepad2, BookOpen, Layers,
  Palette, Clock, Award, User, ShieldCheck, Stethoscope,
  HeartHandshake, Users, Sparkles
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { currentPage, navigateTo, activeUser, setShowEmergencyModal } = useApp();

  const navItems = [
    { id: 'home', label: 'Home Dashboard', icon: Home },
    { id: 'plan', label: 'Daily Plan', icon: Calendar },
    { id: 'goals', label: 'Goals & Milestones', icon: Target },
    { id: 'games', label: 'Mind Games', icon: Gamepad2, badge: 'Play' },
    { id: 'journal', label: 'Reflection & Journal', icon: BookOpen },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'hobbies', label: 'Hobby Hub', icon: Palette },
    { id: 'routine', label: 'Screen Time & Timer', icon: Clock },
    { id: 'journey', label: 'My Journey (60 Days)', icon: Award, highlight: true },
    { id: 'profile', label: 'Profile & Privacy', icon: User },
  ];

  const specialistItems = [
    { id: 'counsellor', label: 'Counsellor Portal', icon: Stethoscope },
    { id: 'family', label: 'Family & Guardian Mode', icon: Users },
    { id: 'safety', label: 'Crisis & Safety Center', icon: HeartHandshake }
  ];

  const handleNav = (id) => {
    navigateTo(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-clay-900/30 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-16 sm:top-20 bottom-0 left-0 z-40 w-64 bg-[#FAF8F5] border-r border-cream-200/80 p-4 overflow-y-auto custom-scrollbar transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-soft-xl' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Main Navigation */}
          <div>
            <div className="text-[11px] font-bold text-clay-700 uppercase tracking-wider px-3 mb-2">
              My Space
            </div>
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-sage-600 text-white shadow-soft font-semibold'
                        : 'text-clay-700 hover:text-clay-900 hover:bg-cream-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sage-600'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-sage-100 text-sage-800'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.highlight && !isActive && (
                      <span className="w-2 h-2 rounded-full bg-terracotta-500 animate-gentle-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Specialist & Safety Navigation */}
          <div className="pt-4 border-t border-cream-200/70">
            <div className="text-[11px] font-bold text-clay-700 uppercase tracking-wider px-3 mb-2">
              Portals & Care
            </div>
            <div className="space-y-1">
              {specialistItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-sage-600 text-white shadow-soft font-semibold'
                        : 'text-clay-700 hover:text-clay-900 hover:bg-cream-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-terracotta-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calm Non-Clinical Prompt Card */}
          <div className="p-4 rounded-2xl bg-sand-100 border border-cream-200 text-xs text-clay-700 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-clay-900">
              <Sparkles className="w-3.5 h-3.5 text-sage-600" />
              <span>Gentle Reminder</span>
            </div>
            <p className="leading-relaxed">
              Growth is not linear. Take your time, enjoy small moments, and listen to what your mind needs.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
