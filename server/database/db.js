import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'seera_database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Database Tables Schema
const initialSchema = {
  users: [],
  profiles: [],
  goals: [],
  goal_milestones: [],
  interests: [],
  preferences: [],
  game_sessions: [],
  game_reflections: [],
  journal_entries: [],
  voice_transcripts: [],
  hobby_posts: [],
  hobby_interactions: [],
  screen_time_logs: [],
  routine_activities: [],
  wellbeing_signals: [],
  personal_baselines: [],
  change_events: [],
  counsellor_notes: [],
  support_sessions: [],
  family_relationships: [],
  consent_settings: [],
  flashcard_progress: []
};

class Database {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Error reading database file, initializing clean schema:', e);
    }
    this.saveData(initialSchema);
    return JSON.parse(JSON.stringify(initialSchema));
  }

  saveData(data = this.data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
      console.error('Error persisting database:', e);
    }
  }

  getTable(tableName) {
    if (!this.data[tableName]) {
      this.data[tableName] = [];
    }
    return this.data[tableName];
  }

  find(tableName, queryFn) {
    const table = this.getTable(tableName);
    return table.filter(queryFn);
  }

  findOne(tableName, queryFn) {
    const table = this.getTable(tableName);
    return table.find(queryFn) || null;
  }

  insert(tableName, record) {
    const table = this.getTable(tableName);
    const newRecord = {
      id: record.id || `${tableName.slice(0, 3)}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...record
    };
    table.push(newRecord);
    this.saveData();
    return newRecord;
  }

  update(tableName, queryFn, updates) {
    const table = this.getTable(tableName);
    let updatedCount = 0;
    const modified = table.map(item => {
      if (queryFn(item)) {
        updatedCount++;
        return {
          ...item,
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
      return item;
    });
    this.data[tableName] = modified;
    if (updatedCount > 0) {
      this.saveData();
    }
    return updatedCount;
  }

  delete(tableName, queryFn) {
    const table = this.getTable(tableName);
    const initialLen = table.length;
    this.data[tableName] = table.filter(item => !queryFn(item));
    const deletedCount = initialLen - this.data[tableName].length;
    if (deletedCount > 0) {
      this.saveData();
    }
    return deletedCount;
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(initialSchema));
    this.saveData();
    return true;
  }
}

export const db = new Database();
