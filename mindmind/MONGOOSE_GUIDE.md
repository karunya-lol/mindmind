# 📡 Mongoose / MongoDB Integration Guide for MIND//MIND

This guide explains how to connect Mongoose with the **MIND//MIND Cyber Arena** to store and query scores by **`teamId`**.

---

## 1. Mongoose Schema Definition

Share this schema with your friend to add into their backend:

```javascript
const mongoose = require('mongoose');

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
  credits: {
    type: Number,
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
module.exports = Score;
```

---

## 2. How Your Friend Can Fetch a Particular Team's Score

### By Team ID:
```javascript
// Query single team by Team ID (e.g. "TM-101")
async function getTeamScore(teamId) {
  const team = await Score.findOne({ teamId: teamId.toUpperCase() });
  if (!team) {
    console.log(`Team ${teamId} not found`);
    return null;
  }
  console.log(`Team: ${team.teamId} (${team.teamName}) -> Score: ${team.score} PTS`);
  return team;
}

// Example usage:
getTeamScore('TM-101');
```

### Fetch Top 10 Teams (Leaderboard):
```javascript
async function getTopLeaderboard(limit = 10) {
  const topTeams = await Score.find()
    .sort({ score: -1 })
    .limit(limit);
  return topTeams;
}
```

---

## 3. How the Frontend Sends Data

When any team finishes the arena run, the website automatically:
1. **Saves locally** into `localStorage` under `mindmind_team_scores`.
2. **Dispatches an automatic HTTP POST** to `/api/scores` with this JSON payload:

```json
{
  "teamId": "TM-101",
  "teamName": "Cyber Ghosts",
  "score": 2420,
  "credits": 240,
  "rank": "CYBER ARCHITECT (SUPREME)",
  "stagesCleared": 3,
  "timestamp": "2026-10-08T14:45:00.000Z"
}
```

---

## 4. Running the Ready-Made Backend Server

A ready-to-run backend server has already been created in this folder: [`backend-mongoose-server.js`](file:///Users/karunya/Downloads/mindmind/backend-mongoose-server.js).

To start it:
```bash
# 1. Install dependencies
npm install express mongoose cors

# 2. Run the server (default MongoDB: mongodb://127.0.0.1:27017/mindmind)
node backend-mongoose-server.js
```

### Available Endpoints:
* `POST /api/scores` — Auto-saves/updates team score.
* `GET /api/scores/:teamId` — **Fetches that specific team's score!** (e.g. `http://localhost:8000/api/scores/TM-101`)
* `GET /api/scores` — Fetches all teams sorted by score descending.

---

## 5. Standalone / No Backend Mode (Zero-Config)
If your friend is not running MongoDB yet:
* The website still works **100% offline**.
* On the final screen, you can click:
  * **`📋 COPY FOR MONGOOSE`**: Copies the exact JSON document to clipboard to paste directly into MongoDB Compass.
  * **`📥 EXPORT ALL (.JSON)`**: Downloads the complete teams database as a `.json` file for `mongoimport`.
  * **`🏆 TEAMS` (top bar)**: Live in-browser search to query any team by **Team ID**!
