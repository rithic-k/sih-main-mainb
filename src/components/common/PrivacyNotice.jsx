import React from 'react';
import { ShieldCheck, Lock, Info, Eye } from 'lucide-react';

export const PrivacyNotice = ({ className = '', compact = false }) => {
  if (compact) {
    return (
      <div className={`flex items-center gap-2 text-xs text-clay-700 bg-sand-100/80 px-3.5 py-2 rounded-xl border border-cream-200 ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-sage-600 shrink-0" />
        <span><strong>You are more than your data.</strong> Private, anonymous, and you control every insight.</span>
      </div>
    );
  }

  return (
    <div className={`p-4 sm:p-5 bg-sand-50 rounded-2xl border border-cream-200/90 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="p-2 bg-sage-100 text-sage-800 rounded-xl shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="text-xs sm:text-sm text-clay-700 space-y-1">
          <p className="font-semibold text-clay-900 flex items-center gap-1.5">
            <span>You are more than your data.</span>
          </p>
          <p className="text-xs leading-relaxed text-clay-700">
            SEERA analyzes activity timing, goal consistency, and self-reported reflections to help identify natural personal patterns over time. Your raw journal entries, voice notes, and phone number remain confidential and are never shared without your explicit consent.
          </p>
        </div>
      </div>
    </div>
  );
};
