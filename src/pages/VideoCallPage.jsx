import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import {
  Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff,
  MessageSquare, Shield, Users, Sparkles, Send, HeartHandshake,
  AlertTriangle, CheckCircle2, ChevronRight
} from 'lucide-react';
import { mockCounsellorService } from '../services/mockCounsellor';
import { EMERGENCY_HELPLINES } from '../services/mockSafety';

export const VideoCallPage = () => {
  const { navigateTo, activeCounsellorUser, showToast, setShowEmergencyModal } = useApp();
  const user = mockCounsellorService.getUserById(activeCounsellorUser || 'user-C119');

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showSafetyDrawer, setShowSafetyDrawer] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 'm1', sender: 'counsellor', name: 'Dr. Anita Sharma', time: '16:01', text: `Hello ${user.code}. I am glad we could connect today. How has your week been feeling?` }
  ]);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      name: user.code,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: messageInput.trim()
    };
    setChatMessages(prev => [...prev, newMsg]);
    setMessageInput('');

    // Simulated counsellor response
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'counsellor',
          name: 'Dr. Anita Sharma',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Thank you for sharing that. Let us take it one step at a time.'
        }
      ]);
    }, 1500);
  };

  const handleEndCall = () => {
    showToast('Video session concluded and logged.', 'info');
    navigateTo('counsellor');
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between bg-clay-900 text-white rounded-3xl overflow-hidden border border-clay-800 shadow-soft-xl max-w-7xl mx-auto my-4">
      {/* Top Header */}
      <div className="bg-clay-800/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-clay-700">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <h3 className="font-serif font-bold text-base text-white">
              Confidential Support Session • {user.code}
            </h3>
            <span className="text-xs text-cream-300">Dr. Anita Sharma, Accredited Clinical Psychologist</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSafetyDrawer(!showSafetyDrawer)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-terracotta-600/80 hover:bg-terracotta-600 text-xs font-semibold text-white transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Crisis Protocol</span>
          </button>
          <button
            onClick={() => setShowChat(!showChat)}
            className="p-2 rounded-xl bg-clay-700 hover:bg-clay-600 text-cream-200 transition-colors"
            title="Toggle Session Chat"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Video & Chat Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 sm:p-6 overflow-hidden">
        {/* Video Feeds (8 or 12 cols) */}
        <div className={`${showChat ? 'lg:col-span-8' : 'lg:col-span-12'} grid grid-cols-1 sm:grid-cols-2 gap-4 h-full min-h-[380px]`}>
          {/* Counsellor Video Box */}
          <div className="relative rounded-2xl bg-clay-800 border border-clay-700 overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-inner">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-sage-700 to-sage-600 border-2 border-sage-400 flex items-center justify-center font-serif text-3xl font-bold text-white shadow-soft mb-3">
              AS
            </div>
            <div className="font-serif font-bold text-base text-white">Dr. Anita Sharma</div>
            <div className="text-xs text-sage-300 mt-0.5">Licensed Counsellor</div>
            <span className="absolute bottom-4 left-4 text-xs font-mono bg-clay-900/80 px-2.5 py-1 rounded-lg border border-clay-700">
              Counsellor Feed (Live)
            </span>
          </div>

          {/* User Video Box */}
          <div className="relative rounded-2xl bg-clay-800 border border-clay-700 overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-inner">
            {isVideoOff ? (
              <div className="text-center space-y-2">
                <div className="w-20 h-20 rounded-full bg-clay-700 flex items-center justify-center mx-auto text-clay-400">
                  <VideoOff className="w-8 h-8" />
                </div>
                <div className="text-xs text-clay-400">Camera is paused</div>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-terracotta-600 to-amber-600 border-2 border-terracotta-300 flex items-center justify-center font-serif text-2xl font-bold text-white shadow-soft mx-auto">
                  {user.code.slice(0, 4)}
                </div>
                <div className="font-serif font-bold text-base text-white">{user.code}</div>
                <div className="text-xs text-cream-300">Anonymous Participant</div>
              </div>
            )}
            <span className="absolute bottom-4 left-4 text-xs font-mono bg-clay-900/80 px-2.5 py-1 rounded-lg border border-clay-700">
              {user.code} (Client)
            </span>
          </div>
        </div>

        {/* Side Chat Panel (4 cols) */}
        {showChat && (
          <div className="lg:col-span-4 bg-clay-800/90 rounded-2xl border border-clay-700 p-4 flex flex-col justify-between h-[420px] lg:h-auto">
            <div className="space-y-1 pb-3 border-b border-clay-700">
              <span className="text-xs font-bold text-sage-400 uppercase tracking-wider">Session In-Call Chat</span>
              <p className="text-[11px] text-cream-300">Encrypted in-session notes & links</p>
            </div>

            {/* Messages list */}
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 py-3 pr-1">
              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-xl text-xs space-y-1 ${
                    msg.sender === 'user'
                      ? 'bg-sage-700/60 text-white ml-6 border border-sage-600'
                      : 'bg-clay-700/80 text-cream-100 mr-6 border border-clay-600'
                  }`}
                >
                  <div className="flex justify-between text-[10px] text-cream-300">
                    <span className="font-bold">{msg.name}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-clay-700">
              <input
                type="text"
                placeholder="Type in-call message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-clay-900 border border-clay-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-sage-500"
              />
              <button
                type="submit"
                className="p-2 bg-sage-600 hover:bg-sage-500 text-white rounded-xl"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Safety Resources Drawer if open */}
      {showSafetyDrawer && (
        <div className="bg-clay-800 border-t border-clay-700 p-4 animate-fadeIn">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-terracotta-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Emergency Crisis Protocol Contacts</span>
            </h4>
            <button
              onClick={() => setShowSafetyDrawer(false)}
              className="text-xs text-cream-300 hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {EMERGENCY_HELPLINES.slice(0, 3).map((line, i) => (
              <div key={i} className="p-3 bg-clay-900/80 rounded-xl border border-clay-700">
                <div className="font-bold text-white">{line.name}</div>
                <div className="font-mono text-terracotta-400 font-bold">{line.number}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div className="bg-clay-800/90 px-6 py-4 flex items-center justify-center gap-4 border-t border-clay-700">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-3.5 rounded-full transition-all ${
            isMuted ? 'bg-rose-600 text-white' : 'bg-clay-700 text-white hover:bg-clay-600'
          }`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`p-3.5 rounded-full transition-all ${
            isVideoOff ? 'bg-rose-600 text-white' : 'bg-clay-700 text-white hover:bg-clay-600'
          }`}
          title={isVideoOff ? 'Start Camera' : 'Stop Camera'}
        >
          {isVideoOff ? <VideoOff className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
        </button>

        <button
          onClick={handleEndCall}
          className="p-3.5 px-6 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-2 shadow-soft transition-all"
          title="End Session"
        >
          <PhoneOff className="w-5 h-5" />
          <span className="text-xs">End Session</span>
        </button>
      </div>
    </div>
  );
};
