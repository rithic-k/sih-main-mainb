import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { seedDatabase } from './database/seed.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import journalRoutes from './routes/journalRoutes.js';
import hobbyRoutes from './routes/hobbyRoutes.js';
import routineRoutes from './routes/routineRoutes.js';
import journeyRoutes from './routes/journeyRoutes.js';
import counsellorRoutes from './routes/counsellorRoutes.js';
import familyRoutes from './routes/familyRoutes.js';
import privacyRoutes from './routes/privacyRoutes.js';
import safetyRoutes from './routes/safetyRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize & Seed Database
seedDatabase();

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/hobbies', hobbyRoutes);
app.use('/api/routine', routineRoutes);
app.use('/api/journey', journeyRoutes);
app.use('/api/counsellor', counsellorRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/privacy', privacyRoutes);
app.use('/api/safety', safetyRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    system: 'SEERA Full-Stack Core API',
    timestamp: new Date().toISOString(),
    principle: 'AI notices. Humans understand. People decide.'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error occurred in SEERA backend engine.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🌿 SEERA Backend API running on http://localhost:${PORT}`);
});

export default app;
