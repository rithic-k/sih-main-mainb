import React from 'react';

export const Tabs = ({ tabs, activeTab, onTabChange, className = '' }) => {
  return (
    <div className={`flex items-center gap-1.5 p-1.5 bg-cream-100 rounded-2xl border border-cream-200/80 overflow-x-auto custom-scrollbar ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'bg-white text-clay-900 shadow-sm font-semibold'
                : 'text-clay-700 hover:text-clay-900 hover:bg-cream-200/60'
            }`}
          >
            {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-sage-600' : 'text-clay-700'}`} />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-sage-100 text-sage-800 font-semibold' : 'bg-cream-200 text-clay-700'}`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
