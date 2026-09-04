// safetyEngine.js - Immediate Crisis Escalation & Verified Helpline Routing

export const EMERGENCY_HELPLINES = [
  {
    country: 'India',
    region: 'National 24/7',
    name: 'Tele-MANAS (Govt of India)',
    number: '14416 / 1800-891-4416',
    desc: 'Free, confidential 24/7 mental health and emotional support in multiple Indian languages.',
    tollFree: true
  },
  {
    country: 'India',
    region: 'National 24/7',
    name: 'KIRAN Helpline',
    number: '1800-599-0019',
    desc: 'Ministry of Social Justice 24/7 toll-free helpline providing psychological support & first aid.',
    tollFree: true
  },
  {
    country: 'India',
    region: 'National 24/7',
    name: 'Vandrevala Foundation',
    number: '+91 9999 666 555',
    desc: 'Free, compassionate 24/7 counseling via phone call and WhatsApp.',
    tollFree: false
  },
  {
    country: 'India',
    region: 'National',
    name: 'AASRA Crisis Support',
    number: '+91 98204 66726',
    desc: '24/7 distress helpline with trained volunteers.',
    tollFree: false
  },
  {
    country: 'United States & Canada',
    region: 'National 24/7',
    name: '988 Suicide & Crisis Lifeline',
    number: '988 (Call or Text)',
    desc: 'Free and confidential 24/7 crisis support.',
    tollFree: true
  },
  {
    country: 'United Kingdom',
    region: 'National 24/7',
    name: 'Samaritans UK',
    number: '116 123',
    desc: 'Free 24/7 support line.',
    tollFree: true
  }
];

export const safetyEngine = {
  getEmergencyResources: () => {
    return {
      message: "I'm really glad you reached out. You don't have to carry this alone.",
      helplines: EMERGENCY_HELPLINES,
      notice: "SEERA is a personal growth platform and cannot provide emergency medical intervention. Human support is the safest and most effective step."
    };
  }
};
