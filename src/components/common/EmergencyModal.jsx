import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { HeartHandshake, Phone, MessageSquare, AlertTriangle, Shield, CheckCircle, ExternalLink } from 'lucide-react';
import { EMERGENCY_HELPLINES, SAFETY_PRINCIPLES } from '../../services/mockSafety';

export const EmergencyModal = ({ isOpen, onClose }) => {
  const [trustedContactNotified, setTrustedContactNotified] = useState(false);

  const handleNotifyTrusted = () => {
    setTrustedContactNotified(true);
    setTimeout(() => {
      // Simulate confirmation
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Immediate Human Support"
      subtitle="We are here with you. Confidential & free help is always available."
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Empathetic banner */}
        <div className="bg-sage-50 border border-sage-200/80 rounded-2xl p-5 flex items-start gap-3.5">
          <div className="p-2.5 bg-sage-600 text-white rounded-xl shrink-0 mt-0.5 shadow-sm">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-clay-900">
              {SAFETY_PRINCIPLES.header}
            </h4>
            <p className="text-xs sm:text-sm text-clay-700 mt-1 leading-relaxed">
              {SAFETY_PRINCIPLES.subtext}
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="p-4 bg-sand-100 rounded-xl border border-cream-200 text-xs text-clay-700 flex items-start gap-2">
          <Shield className="w-4 h-4 text-sage-700 shrink-0 mt-0.5" />
          <p>{SAFETY_PRINCIPLES.notice}</p>
        </div>

        {/* 24/7 Verified Helplines */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-clay-700 mb-3 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-terracotta-500" />
            <span>24/7 Free & Confidential Helplines</span>
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EMERGENCY_HELPLINES.slice(0, 4).map((line, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-cream-200 hover:border-sage-300 shadow-soft transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-clay-900">{line.name}</span>
                  {line.tollFree && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">Toll Free</span>
                  )}
                </div>
                <div className="text-base font-bold text-sage-800 my-1 font-mono tracking-wide">
                  {line.number}
                </div>
                <p className="text-[11px] text-clay-700 line-clamp-2 leading-relaxed">
                  {line.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted Contact Simulation */}
        <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h5 className="text-xs font-bold text-clay-900">Reach your designated support contact</h5>
            <p className="text-xs text-clay-700 mt-0.5">Send a gentle predefined message requesting a quick call or coffee.</p>
          </div>
          {trustedContactNotified ? (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Notification Sent</span>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              icon={MessageSquare}
              onClick={handleNotifyTrusted}
            >
              Ping Support Contact
            </Button>
          )}
        </div>

        <div className="flex justify-end pt-2 border-t border-cream-100">
          <Button variant="secondary" size="md" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
