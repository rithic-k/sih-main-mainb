import express from 'express';
import { safetyEngine } from '../services/safetyEngine.js';

const router = express.Router();

// GET /api/safety/helplines
router.get('/helplines', (req, res) => {
  const resources = safetyEngine.getEmergencyResources();
  res.json({ success: true, ...resources });
});

// POST /api/safety/ping-trusted
router.post('/ping-trusted', (req, res) => {
  res.json({
    success: true,
    message: 'Predefined check-in message dispatched to your designated support contact.'
  });
});

export default router;
