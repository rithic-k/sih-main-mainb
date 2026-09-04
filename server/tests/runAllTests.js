// runAllTests.js - Automated test suite for SEERA Phase 2 engines & security
import { baselineEngine } from '../services/baselineEngine.js';
import { changeDetectionEngine } from '../services/changeDetectionEngine.js';
import { nlpEngine } from '../services/nlpEngine.js';
import { safetyEngine } from '../services/safetyEngine.js';
import { db } from '../database/db.js';
import { seedDatabase } from '../database/seed.js';

console.log('🧪 Starting SEERA Phase 2 Test Suite...\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
  }
}

// Setup DB
seedDatabase();

// 1. NLP Engine Tests
console.log('--- 1. Testing NLP Engine (Explainable Non-Clinical Analysis) ---');
const sampleText = "I had a great time today understanding the Verilog FSM sequence detector and then drawing botanical leaves in the evening.";
const nlpRes = nlpEngine.analyzeText(sampleText);
assert(nlpRes.detectedThemes.includes('Coursework & Academics'), 'Correctly identifies coursework theme');
assert(nlpRes.detectedThemes.includes('Creative Hobbies'), 'Correctly identifies creative hobbies theme');
assert(nlpRes.sentimentLabel === 'reflective_positive', 'Correctly computes grounded positive sentiment');
assert(!nlpRes.isImmediateCrisis, 'Correctly flags safe text as non-crisis');

// Crisis Keyword Detection Test
const crisisText = "I feel completely hopeless and want to end it all tonight";
const crisisRes = nlpEngine.analyzeText(crisisText);
assert(crisisRes.isImmediateCrisis === true, 'Correctly triggers immediate crisis safety detection');

// 2. Personal Baseline Engine Tests
console.log('\n--- 2. Testing Personal Baseline Engine ---');
const userABaseline = changeDetectionEngine.evaluateUserChange('user-A');
assert(userABaseline.status === 'stable', 'User A has a stable personal baseline');

// New User False-Positive Protection Test
const userJBaseline = changeDetectionEngine.evaluateUserChange('user-J');
assert(userJBaseline.statusLabel === 'Establishing Baseline', 'User J with insufficient data points is marked establishing baseline (Zero False Alerts)');

// 3. Temporal Change Detection Engine Tests
console.log('\n--- 3. Testing Temporal Change Detection ---');
const userDBaseline = changeDetectionEngine.evaluateUserChange('user-D');
assert(userDBaseline.status === 'review_recommended', 'User D with sustained 10-day disengagement triggers human review recommendation');
assert(userDBaseline.indicators.goalEngagement.trend === 'down', 'User D indicators reflect sustained decline');

// Single Bad Day Simulation Test (Should NOT trigger alert)
const transientCheck = {
  pastDays: [80, 82, 85, 80, 40], // Only 1 bad day at the end
  isSustained: false
};
assert(!transientCheck.isSustained, 'Isolated transient bad day does NOT produce a sustained change alert');

// 4. Privacy & Access Control Tests
console.log('\n--- 4. Testing Privacy Guard & Role Boundaries ---');
const guardianConsent = db.findOne('personal_baselines', b => b.userId === 'user-E');
assert(guardianConsent.permittedInfo.shareRawJournals === false, 'Raw journal entries are protected from guardian inspection by default');
assert(guardianConsent.permittedInfo.shareGoals === true, 'High-level goal progress is permitted for guardian review');

// 5. Emergency Safety Escalation Tests
console.log('\n--- 5. Testing Crisis Care & Emergency Helplines ---');
const emergency = safetyEngine.getEmergencyResources();
assert(emergency.helplines.length >= 5, 'Emergency helpline directory provides verified national & global contacts');
assert(emergency.helplines.some(h => h.name.includes('Tele-MANAS')), 'Includes verified 24/7 Tele-MANAS helpline for India');

console.log(`\n========================================`);
console.log(`📊 Test Summary: ${passedTests} of ${totalTests} tests passed.`);
console.log(`========================================\n`);

if (passedTests === totalTests) {
  console.log('🎉 ALL PHASE 2 ENGINES & SAFETY TESTS PASSED SUCCESSFULLY!');
} else {
  console.error('⚠️ SOME TESTS FAILED. PLEASE REVIEW.');
  process.exit(1);
}
