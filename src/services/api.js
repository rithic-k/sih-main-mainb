// api.js - Centralized Full-Stack API Client for SEERA Phase 2
const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  try {
    const session = localStorage.getItem('seera_auth_session');
    if (session) {
      const user = JSON.parse(session);
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer demo_token_${user.id || 'moonlight27'}`
      };
    }
  } catch (e) {}
  return { 'Content-Type': 'application/json' };
};

export const api = {
  // Health
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (e) {
      return { status: 'offline_fallback', error: e.message };
    }
  },

  // Auth & Profile
  getCurrentUser: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  onboardUser: async (onboardingData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/onboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(onboardingData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  // Goals
  getGoals: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/goals`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        return data.goals;
      }
    } catch (e) {}
    return null;
  },

  createGoal: async (goalData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/goals`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(goalData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  toggleMilestone: async (goalId, milestoneId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/goals/${goalId}/milestones/${milestoneId}`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  // Journal & NLP
  getJournalEntries: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/journals`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        return data.entries;
      }
    } catch (e) {}
    return null;
  },

  addJournalEntry: async (entryData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/journals`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(entryData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  // Hobbies
  getHobbyPosts: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/hobbies/posts`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        return data.posts;
      }
    } catch (e) {}
    return null;
  },

  createHobbyPost: async (postData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/hobbies/posts`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(postData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  // Counsellor
  getCounsellorCohort: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/counsellor/cohort`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        return data.users;
      }
    } catch (e) {}
    return null;
  },

  addCounsellorNote: async (userId, text) => {
    try {
      const res = await fetch(`${API_BASE_URL}/counsellor/users/${userId}/notes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ text })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  // Safety
  getEmergencyHelplines: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/safety/helplines`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  }
};
