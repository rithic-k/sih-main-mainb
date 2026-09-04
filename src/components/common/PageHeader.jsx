import React from 'react';

export const PageHeader = ({
  title,
  subtitle,
  badge,
  badgeColor = 'bg-sage-100 text-sage-800 border-sage-200',
  actions,
  className = ''
}) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-cream-200/70 ${className}`}>
      <div>
        {badge && (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border mb-2.5 ${badgeColor}`}>
            {badge}
          </span>
        )}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-clay-900 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-clay-700 mt-1 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
};
