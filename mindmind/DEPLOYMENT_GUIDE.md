# 🚀 MIND//MIND Production Deployment & Multi-Team Competition Manual

A production guide for hosting the **MIND//MIND Cyber Arena** online for live multi-team coding and technical trivia competitions.

Supports **5 to 500+ teams playing concurrently** from any device with real-time scoring, spectator live-streaming, and MongoDB persistence.

---

## 🏗️ System Architecture

```
 ┌──────────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
 │   Team 1 Browser     │       │   Team 2 Browser     │  ...  │   Team N Browser     │
 │ (Laptop / Smartphone)│       │ (Laptop / Smartphone)│       │ (Laptop / Smartphone)│
 └──────────┬───────────┘       └──────────┬───────────┘       └──────────┬───────────┘
            │                              │                              │
            │  Opens Arena URL             │                              │
            │  Submits Telemetry           │                              │
            ▼                              ▼                              ▼
 ┌────────────────────────────────────────────────────────────────────────────────────┐
 │                  PRODUCTION NODE.JS + EXPRESS BACKEND SERVER                       │
 │                           (backend-mongoose-server.js)                             │
 │  • Serves static assets (HTML/CSS/JS) with zero overhead                           │
 │  • Fast in-memory cache vault for instantaneous sub-millisecond leaderboard reads   │
 │  • Health Check Route: /healthz / /api/health                                      │
 │  • Idempotent atomic upserts by Team ID                                            │
 └──────────────────────────────┬───────────────────────────────┬─────────────────────┘
                                │                               │
                                ▼                               ▼
 ┌──────────────────────────────────────────────┐  ┌──────────────────────────────────┐
 │          MONGODB ATLAS CLUSTER (Cloud)       │  │    LIVE SPECTATOR DASHBOARD      │
 │  Permanent storage for all team performance  │  │        (/dashboard.html)         │
 │  • Team ID, Name, Score, Stage, Timestamps   │  │  • Real-time podium & rankings   │
 │  • Schema validation via Mongoose            │  │  • Protected with Auth Modal     │
 └──────────────────────────────────────────────┘  │    (User: mindquest /            │
                                                   │     Pass: saliljha)              │
                                                   └──────────────────────────────────┘
```

---

## 🛠️ Step 1: Database Setup (MongoDB Atlas - 100% Free)

1. Sign up or log into [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Click **Create** -> Choose the **M0 Free Shared Cluster** (supports up to 500 concurrent connection pools).
3. In **Security Quickstart**:
   - Create a database user (e.g., Username: `arena_admin`, Password: `<YourSecurePassword>`).
   - Under **Network Access** / IP Access List, add `0.0.0.0/0` (**Allow Access from Anywhere**) so your cloud host can connect.
4. Click **Connect** -> **Drivers (Node.js)** and copy your connection string:
   ```
   mongodb+srv://arena_admin:<password>@cluster0.abcde.mongodb.net/mindmind?retryWrites=true&w=majority
   ```
   *(Save this as your `MONGO_URI`)*.

---

## 🌐 Step 2: Cloud Deployment (Choose Your Platform)

### Option A: Render.com (Recommended - Easiest & Free)

1. Push your project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "MIND//MIND Cyber Arena v3.7"
   git branch -M main
   # Push to your GitHub repo
   ```
2. In [Render Dashboard](https://dashboard.render.com), click **New +** -> **Web Service**.
3. Select your GitHub repository.
4. Fill in the build details:
   - **Name**: `mindmind-arena`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Click **Advanced** -> **Add Environment Variable**:
   - Key: `MONGO_URI`
   - Value: `mongodb+srv://arena_admin:<password>@cluster0.abcde.mongodb.net/mindmind?retryWrites=true&w=majority`
6. Click **Create Web Service**.
7. Render will build and deploy your app in ~60 seconds and give you a public URL:
   👉 **`https://mindmind-arena.onrender.com`**

---

### Option B: Railway.app (Instant 1-Click)

1. Create a project on [Railway.app](https://railway.app).
2. Deploy from your GitHub repo.
3. In service **Variables**, add `MONGO_URI`.
4. Generate a public domain under **Networking**.

---

### Option C: Local LAN / Campus Wi-Fi (No Internet Needed)

If your competition takes place in a closed lab or venue without internet:
1. Ensure Node.js is installed on the host laptop.
2. Run:
   ```bash
   npm install
   node backend-mongoose-server.js
   ```
3. Find your local IP address:
   - **macOS / Linux**: `ifconfig` or `ipconfig getifaddr en0` (e.g. `192.168.1.45`)
   - **Windows**: `ipconfig`
4. Tell teams on the same Wi-Fi to open:
   👉 **`http://192.168.1.45:8000`**
5. Even if MongoDB is offline, the backend's built-in **Memory Vault** stores, ranks, and syncs all team scores in real-time.

---

## 🎯 Step 3: Game Day Operations Workflow

### 1. Distribute Arena URL to Teams
Share the link with participants (e.g. `https://mindmind-arena.onrender.com`).
Teams can join on their laptop, tablet, or mobile phone.

### 2. Team Registration
Each team types:
- **TEAM ID**: e.g., `TM-01`, `ALPHA`, `TEAM-404` (must be unique per team).
- **TEAM NAME**: e.g., `Bitwise Brawlers`, `Syntax Saviors`.

### 3. Stage Progression & Rules
- **Round 1 (Visual Decoding)**: 4 visual puzzles (CSS Flexbox, Logic Circuits, Box Model, Pointer Geometry). 45s timer with speed bonuses.
- **Round 2 (Spot the Errors)**: 8 code bugs in a live interactive IDE. Pinpoint the flawed line, then deploy the correct patch.
- **Round 3 (Buzzer Showdown)**: 8 rapid-fire questions. Tap buzzer / spacebar within 4s for Blitz multipliers!

### 4. Live Leaderboard Projection
Open `https://your-domain/dashboard.html` on the stage projector or auditorium screen:
- **Authentication Prompt**:
  - **Username**: `mindquest`
  - **Password**: `saliljha`
- Once logged in, the dashboard streams live telemetry, dynamic top 3 podium standings, search filters, and automatic tie-breaker rankings.

### 5. Post-Match Admin Operations
From the Dashboard footer or modal:
- **Export Results**: Click **EXPORT** to download a complete `scores.json` report of all teams.
- **Reset for Next Heat**: Click **RESET** to clear all scores and prepare the arena for the next round.

---

## 🔍 Pre-Flight Health Checklist

Before the live event begins, verify your system:

| Check | Action | Expected Output |
| :--- | :--- | :--- |
| **Server Health** | Visit `/healthz` or `/api/health` | `{"status":"ONLINE","uptimeSeconds":...,"mongoConnected":true}` |
| **Arena Load** | Visit `/index.html` | Red/Black/White theme loads with particles |
| **Dashboard Auth** | Visit `/dashboard.html` | Prompts for `mindquest` / `saliljha` credentials |
| **Test Submission** | Play 1 test round as `TEST-01` | Score appears live on `/dashboard.html` within 2 seconds |
| **Score Reset** | Click **RESET** in dashboard | Clears test data back to 0 |
