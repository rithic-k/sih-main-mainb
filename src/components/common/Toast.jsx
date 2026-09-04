import React from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

export const Toast = ({ message, type = 'info' }) => {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    error: <AlertCircle className="w-4 h-4 text-rose-600" />,
    info: <Info className="w-4 h-4 text-sage-700" />,
    sparkle: <Sparkles className="w-4 h-4 text-amber-600" />
  };

  const bgStyles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    error: 'bg-rose-50 border-rose-200 text-rose-900',
    info: 'bg-sage-50 border-sage-200 text-sage-900',
    sparkle: 'bg-amber-50 border-amber-200 text-amber-900'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border shadow-soft-lg ${bgStyles[type] || bgStyles.info} text-sm font-medium`}>
        {icons[type] || icons.info}
        <span>{message}</span>
      </div>
    </div>
  );
};
