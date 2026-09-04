import express from 'express';
import { db } from '../database/db.js';
import { generateToken, authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Masking helpers
const maskPhone = (phone) => {
  if (!phone) return '+91 ******1234';
  const clean = phone.replace(/\s+/g, '');
  const lastFour = clean.slice(-4);
  const prefix = clean.startsWith('+') ? clean.slice(0, 3) : '+91';
  return `${prefix} ******${lastFour}`;
};

const maskEmail = (email) => {
  if (!email) return 'm***t@domain.com';
  const [name, domain] = email.split('@');
  if (!domain) return email;
  const maskedName = name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : `${name[0]}***`;
  return `${maskedName}@${domain}`;
};

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  const user = db.findOne('users', u => u.id === req.user.id) || db.getTable('users')[0];
  const profile = db.findOne('profiles', p => p.userId === user.id) || { streakDays: 14, points: 420 };
  const pref = db.findOne('preferences', p => p.userId === user.id);

  res.json({
    success: true,
    user: {
      ...user,
      maskedPhone: maskPhone(user.phone),
      maskedEmail: maskEmail(user.email),
      profile,
      preferences: pref
    }
  });
});

// POST /api/auth/onboard
router.post('/onboard', (req, res) => {
  const {
    accountType, displayName, email, phone, countryCode,
    ageGroup, language, location, timezone,
    interests, goals, primaryGoal, preferredActivities,
    activityStyle, dailyTime, preferredTime,
    consentWellbeing, consentCounsellor, consentVoice, consentFamily
  } = req.body;

  const userId = `user-${Date.now()}`;
  const newUser = db.insert('users', {
    id: userId,
    accountType: accountType || 'individual',
    displayName: displayName || 'Moonlight27',
    email: email || 'user@seera.test',
    phone: phone || '+91 9876543210',
    countryCode: countryCode || '+91',
    ageGroup: ageGroup || '18-24',
    language: language || 'English',
    timezone: timezone || 'Asia/Kolkata (IST)',
    location: location || 'Bengaluru, India',
    joinedDate: new Date().toISOString().split('T')[0]
  });

  db.insert('profiles', {
    userId,
    avatarSeed: 'sage-sprout',
    streakDays: 1,
    points: 100
  });

  db.insert('preferences', {
    userId,
    interests: interests || ['technology', 'art'],
    goals: goals || ['career', 'emotional_wellbeing'],
    primaryGoal: primaryGoal || 'career',
    preferredActivities: preferredActivities || ['Learning', 'Games'],
    activityStyle: activityStyle || 'Short and easy',
    dailyTime: dailyTime || '30 min',
    preferredTime: preferredTime || 'Evening',
    isOnboardingCompleted: true
  });

  db.insert('consent_settings', {
    userId,
    wellbeingAnalysis: !!consentWellbeing,
    counsellorSupport: !!consentCounsellor,
    voiceJournaling: !!consentVoice,
    familyVisibility: !!consentFamily
  });

  const token = generateToken({ id: userId, accountType: newUser.accountType, displayName: newUser.displayName });

  res.json({
    success: true,
    token,
    user: {
      ...newUser,
      maskedPhone: maskPhone(newUser.phone),
      maskedEmail: maskEmail(newUser.email)
    }
  });
});

// POST /api/auth/switch-role
router.post('/switch-role', authMiddleware, (req, res) => {
  const { role } = req.body;
  if (!['individual', 'young_user', 'parent', 'counsellor'].includes(role)) {
    return res.status(400).json({ success: false, error: 'Invalid role' });
  }

  db.update('users', u => u.id === req.user.id, { accountType: role });
  const updatedUser = db.findOne('users', u => u.id === req.user.id);
  const token = generateToken({ id: updatedUser.id, accountType: role, displayName: updatedUser.displayName });

  res.json({
    success: true,
    token,
    user: updatedUser
  });
});

export default router;
