import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageHeader } from '../components/common/PageHeader';
import { EMERGENCY_HELPLINES, SAFETY_PRINCIPLES } from '../services/mockSafety';
import {
  HeartHandshake, Phone, Shield, MessageSquare, AlertTriangle,
  ExternalLink, CheckCircle2, Heart, ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SafetyPage = () => {
  const { showToast } = useApp();
  const [trustedNotified, setTrustedNotified] = useState(false);

  const handlePingTrusted = () => {
    setTrustedNotified(true);
    showToast('Ping sent to your designated trusted contact 🌱', 'success');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader
        title="Immediate Safety & Crisis Care"
        subtitle="24/7 free, confidential human support. You are never alone."
        badge="Human Support Center"
        badgeColor="bg-terracotta-100 text-terracotta-800 border-terracotta-200"
      />

      {/* Main Empathetic Hero Box */}
      <div className="bg-gradient-to-br from-terracotta-50 via-white to-sand-50 p-8 sm:p-10 rounded-3xl border border-terracotta-200 shadow-soft-lg space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center shadow-soft">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-clay-900">
          {SAFETY_PRINCIPLES.header}
        </h2>
        <p className="text-sm sm:text-base text-clay-700 max-w-2xl leading-relaxed">
          {SAFETY_PRINCIPLES.subtext}
        </p>

        <div className="p-4 bg-sand-100 rounded-2xl border border-cream-200 text-xs text-clay-700 flex items-start gap-2.5">
          <Shield className="w-4 h-4 text-sage-700 shrink-0 mt-0.5" />
          <p>{SAFETY_PRINCIPLES.notice}</p>
        </div>
      </div>

      {/* 24/7 Verified Helplines Directory */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-xl text-clay-900">
          Free & Confidential 24/7 Helplines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EMERGENCY_HELPLINES.map((line, idx) => (
            <Card key={idx} className="p-6 bg-white space-y-3 border-cream-200 hover:border-terracotta-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-clay-900">{line.name}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  {line.country} • {line.region}
                </span>
              </div>
              <div className="font-mono text-xl font-bold text-terracotta-600 tracking-wide">
                {line.number}
              </div>
              <p className="text-xs text-clay-700 leading-relaxed">
                {line.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Trusted Contact Alert Section */}
      <Card className="p-6 bg-white space-y-4 border-cream-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-lg text-clay-900">
              Reach Your Personal Designated Contact
            </h4>
            <p className="text-xs text-clay-700">
              Quickly send an automated, gentle check-in request to a trusted family member or friend.
            </p>
          </div>

          {trustedNotified ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Contact Notified</span>
            </div>
          ) : (
            <Button
              variant="terracotta"
              size="md"
              icon={MessageSquare}
              onClick={handlePingTrusted}
            >
              Alert Designated Contact
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
