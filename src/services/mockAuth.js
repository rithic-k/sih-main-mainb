// mockAuth.js - Handles anonymous session, user role, and masked credentials
const STORAGE_KEY_AUTH = 'seera_auth_session';

export const maskPhoneNumber = (phone) => {
  if (!phone) return '+91 ******1234';
  const cleaned = phone.replace(/\s+/g, '');
  if (cleaned.length < 4) return '+91 ******1234';
  const lastFour = cleaned.slice(-4);
  const prefix = cleaned.startsWith('+') ? cleaned.slice(0, 3) : '+91';
  return `${prefix} ******${lastFour}`;
};

export const maskEmail = (email) => {
  if (!email) return 'm***t@domain.com';
  const [name, domain] = email.split('@');
  if (!domain) return email;
  const maskedName = name.length > 2 
    ? `${name[0]}***${name[name.length - 1]}`
    : `${name[0]}***`;
  return `${maskedName}@${domain}`;
};

export const defaultUserSession = {
  isAuthenticated: true,
  accountType: 'individual', // 'individual' | 'young_user' | 'parent' | 'counsellor'
  displayName: 'Moonlight27',
  avatarSeed: 'sage-sprout',
  email: 'moonlight27@example.com',
  phone: '+91 9876543210',
  countryCode: '+91',
  ageGroup: '18-24',
  language: 'English',
  timezone: 'Asia/Kolkata (IST)',
  location: 'Bengaluru, India',
  joinedDate: '2026-07-06',
  streakDays: 14,
  points: 420
};

export const mockAuthService = {
  getCurrentUser: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_AUTH);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading auth session from localStorage:', e);
    }
    // Initialize default
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(defaultUserSession));
    return defaultUserSession;
  },

  updateCurrentUser: (updates) => {
    const current = mockAuthService.getCurrentUser();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(updated));
    return updated;
  },

  switchAccountType: (newType) => {
    return mockAuthService.updateCurrentUser({ accountType: newType });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY_AUTH);
    return true;
  }
};
