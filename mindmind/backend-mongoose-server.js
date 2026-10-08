/**
 * MINDMIND Cyber Arena - Mongoose Backend Server
 * Connects MongoDB with the frontend to store and query team scores
 * 
 * Install dependencies:
 *   npm install express mongoose cors
 * 
 * Run server:
 *   node backend-mongoose-server.js
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mindmind';

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ==========================================
// MONGOOSE SCHEMA & MODEL
// ==========================================
const scoreSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  teamName: {
    type: String,
    default: 'CYBER_OPERATOR'
  },
  score: {
    type: Number,
    required: true,
    default: 0
  },
  rank: {
    type: String,
    default: 'CADET'
  },
  stagesCleared: {
    type: Number,
    default: 3
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Score = mongoose.model('Score', scoreSchema);

let isMongoConnected = false;
const inMemoryScores = new Map();

// ==========================================
// API ROUTES FOR MULTI-TEAM REAL-TIME ARENA
// ==========================================

/**
 * Health Check Endpoint for Cloud Deployments (Render, AWS, Railway, Docker)
 */
app.get(['/healthz', '/api/health'], (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    service: 'MINDMIND Cyber Arena Backend',
    uptimeSeconds: Math.floor(process.uptime()),
    mongoConnected: isMongoConnected,
    cachedTeamsCount: inMemoryScores.size,
    timestamp: new Date().toISOString()
  });
});

/**
 * 1. POST /api/scores
 * Saves or updates a team's score upon completing any stage or the final arena run
 */
app.post('/api/scores', async (req, res) => {
  try {
    const { teamId, teamName, score, rank, stagesCleared } = req.body;
    if (!teamId || typeof teamId !== 'string') {
      return res.status(400).json({ error: 'Valid teamId is required' });
    }

    // Sanitize and normalize inputs
    const cleanId = String(teamId).trim().toUpperCase().replace(/[^\w\-_]/g, '').slice(0, 32);
    if (!cleanId) {
      return res.status(400).json({ error: 'teamId contains invalid characters' });
    }

    const cleanName = String(teamName || 'CYBER_OPERATOR').trim().replace(/[<>]/g, '').slice(0, 40);
    const parsedScore = Math.max(-5000, Math.min(1000000, parseInt(score, 10) || 0));
    const parsedStages = Math.max(0, Math.min(3, parseInt(stagesCleared, 10) || 0));
    const cleanRank = String(rank || 'OPERATIVE').trim().slice(0, 30);

    const cleanRecord = {
      teamId: cleanId,
      teamName: cleanName,
      score: parsedScore,
      rank: cleanRank,
      stagesCleared: parsedStages,
      timestamp: new Date().toISOString()
    };

    // Store in in-memory map for instantaneous real-time querying
    inMemoryScores.set(cleanId, cleanRecord);

    // If MongoDB is connected, persist permanently via Mongoose
    if (isMongoConnected) {
      try {
        await Score.findOneAndUpdate(
          { teamId: cleanId },
          cleanRecord,
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        console.log(`[MongoDB] Persisted score for ${cleanId} -> ${cleanRecord.score} PTS`);
      } catch (mongoErr) {
        console.warn(`[MongoDB] Warning: Failed to persist to Mongo, saved in memory:`, mongoErr.message);
      }
    } else {
      console.log(`[Memory Vault] Saved score for ${cleanId} -> ${cleanRecord.score} PTS`);
    }

    res.status(200).json({ success: true, record: cleanRecord });
  } catch (err) {
    console.error('Error saving score:', err);
    res.status(500).json({ error: 'Database error saving team score' });
  }
});

/**
 * 2. GET /api/scores/:teamId
 * Fetches score for a PARTICULAR TEAM (e.g. /api/scores/TM-101)
 */
app.get('/api/scores/:teamId', async (req, res) => {
  try {
    const targetTeamId = String(req.params.teamId).trim().toUpperCase();

    if (isMongoConnected) {
      const teamRecord = await Score.findOne({ teamId: targetTeamId }).lean();
      if (teamRecord) {
        return res.status(200).json({ success: true, team: teamRecord });
      }
    }

    if (inMemoryScores.has(targetTeamId)) {
      return res.status(200).json({ success: true, team: inMemoryScores.get(targetTeamId) });
    }

    return res.status(404).json({ error: `Team ${targetTeamId} not found` });
  } catch (err) {
    console.error('Error fetching team:', err);
    res.status(500).json({ error: 'Database error fetching team score' });
  }
});

/**
 * 3. GET /api/scores
 * Fetches all teams sorted by score descending (Real-time Live Leaderboard)
 * Tie-breaker: earlier timestamp wins!
 */
app.get('/api/scores', async (req, res) => {
  try {
    let leaderboard = [];

    if (isMongoConnected) {
      leaderboard = await Score.find().sort({ score: -1, timestamp: 1 }).lean();
    }

    if (!leaderboard || leaderboard.length === 0) {
      leaderboard = Array.from(inMemoryScores.values()).sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(a.timestamp) - new Date(b.timestamp);
      });
    }

    res.status(200).json({ count: leaderboard.length, leaderboard });
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Database error fetching leaderboard' });
  }
});

/**
 * 4. POST /api/scores/reset
 * Clears all team scores for a fresh arena competition match
 */
app.post('/api/scores/reset', async (req, res) => {
  try {
    inMemoryScores.clear();
    if (isMongoConnected) {
      await Score.deleteMany({});
    }
    console.log('[Arena Server] All leaderboard records reset for fresh competition.');
    res.status(200).json({ success: true, message: 'Arena scores reset successfully' });
  } catch (err) {
    console.error('Error resetting scores:', err);
    res.status(500).json({ error: 'Database error resetting scores' });
  }
});

// Dedicated Spectator & Live Leaderboard Dashboard Route
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Resilient MongoDB Connection Listeners
mongoose.connection.on('connected', () => {
  isMongoConnected = true;
  console.log('[MongoDB] Connected successfully');
});
mongoose.connection.on('error', (err) => {
  console.warn('[MongoDB] Connection error:', err.message);
});
mongoose.connection.on('disconnected', () => {
  isMongoConnected = false;
  console.warn('[MongoDB] Disconnected. In-memory caching active.');
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`[Arena Server] Running on http://localhost:${PORT}`);
  console.log(`[Arena Server] Live Dashboard available at http://localhost:${PORT}/dashboard.html`);
});

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    isMongoConnected = true;
    console.log(`[MongoDB] Database connected at ${MONGO_URI}`);
  })
  .catch((err) => {
    isMongoConnected = false;
    console.warn(`[MongoDB] Initial connection bypassed: ${err.message}`);
    console.log(`[Arena Server] In-memory real-time sync active (zero-dependency mode).`);
  });

// Graceful Process Termination
const handleShutdown = async (signal) => {
  console.log(`\n[Arena Server] Received ${signal}. Gracefully shutting down...`);
  server.close(async () => {
    if (isMongoConnected) {
      try {
        await mongoose.connection.close();
        console.log('[MongoDB] Connection closed.');
      } catch(e) {}
    }
    console.log('[Arena Server] Terminated cleanly.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

module.exports = app;
