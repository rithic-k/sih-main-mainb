import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  label = '',
  showPercentage = true,
  color = 'sage', // 'sage' | 'terracotta' | 'blue' | 'amber'
  height = 'h-2.5',
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const colorStyles = {
    sage: 'bg-sage-600',
    terracotta: 'bg-terracotta-500',
    blue: 'bg-blue-600',
    amber: 'bg-amber-500'
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-medium text-clay-700 mb-1.5">
          {label && <span>{label}</span>}
          {showPercentage && <span>{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-cream-200/80 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${height} ${colorStyles[color] || colorStyles.sage} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
