# MIND//MIND - Neon Red Cyber Arena Competition Platform

A high-performance, real-time technical trivia and coding competition platform built with a strictly enforced **Crimson Red, Jet Black, and Crisp White** cyberpunk aesthetic.

Features multi-team live competition architecture, interactive visual decoding, code bug hunting in a browser-based IDE, high-voltage buzzer rounds, and a spectator leaderboard dashboard.

---

## 🏆 Competition Architecture (3 Stages)

### 1. Stage 1: Visual Decoding (4 Puzzles)
- **Concept**: Decode live visual layouts, logic circuits, box model calculations, and pointer geometry.
- **Engine Modules**:
  - **CSS Flexbox Alignment**: Inspect dynamic items to determine `justify-content` and `align-items`.
  - **Logic Gate Circuit Decryption**: Trace binary signals through XOR, NOT, and AND gates to find output `Q`.
  - **CSS Box Model Computation**: Calculate total rendered width under standard box-sizing rules.
  - **Pointer & Memory Traces**: Step-by-step array and pointer mutations.
- **Scoring**: 100 Base PTS + dynamic time-based speed bonus (+10 PTS per remaining second).
- **Tactical Perks**: Chrono-Stasis (10s Freeze), 50/50 Data Purge, Diagnostic Hint.

---

### 2. Stage 2: Spot The Errors (8 Bugs)
- **Concept**: An interactive browser-based Cyber IDE simulating a live code editor with line numbers, code highlighting, and error tracing.
- **Two-Step Resolution**:
  1. **Pinpoint the Bug**: Click directly on the corrupted code line. Innocent lines trigger a rejection shake; clicking the exact flawed line locks target with status `TARGET ACQUIRED`.
  2. **Deploy Patch**: Select the correct code fix from 4 candidate patches.
- **Topics**: C++, Python, JavaScript closures, HTML form traps, CSS specificity conflicts, and algorithmic edge cases.
- **Scoring**: 150 Base PTS + dynamic patch speed bonus (+7 PTS per remaining second).

---

### 3. Stage 3: The Buzzer Finish (8 Blitz Questions)
- **Concept**: Rapid-fire, high-voltage arcade buzzer showdown.
- **Mechanics**:
  - Tap the physical glowing red arcade buzzer or hit **[SPACEBAR]**.
  - **Blitz Speed Multipliers**:
    - Buzzing within the first 4 seconds unlocks **3X Blitz Multiplier** (+300 PTS).
    - Buzzing after 4 seconds awards **2X Speed Multiplier** (+200 PTS).
  - **Lockout Countdown**: A strict 6-second countdown begins with synchronized audio ticks.
  - **Penalties**: Faulty buzz or timeout incurs a -100 PTS deduction.

---

## 📊 Live Spectator Dashboard (`dashboard.html`)

A macOS squircle-styled live leaderboard designed for stage projection or audience live-streaming.

- **Authentication Protected**:
  - **Username**: `mindquest`
  - **Password**: `saliljha`
  - macOS-inspired window with red, white, and graphite traffic lights, session persistence via `sessionStorage`, and an active session `LOGOUT` control.
- **Real-Time Leaderboard**:
  - Live top 3 podium standings.
  - Auto-refresh polling every 2.5 seconds with sub-millisecond in-memory backend reads.
  - Instant team search filter.
  - One-click JSON export.

---

## 🎨 Design System & Palette Constraints

Strictly limited to **Three Colors**:
1. **Red**: Neon Red (`#ff003c`), Crimson (`#ff2a5f`), Dark Crimson (`#800020`).
2. **Black**: Jet Black (`#050507`), Dark Charcoal (`#09090d`, `#101017`).
3. **White**: High-contrast Pure White (`#ffffff`), Dim Text Grays (`#f0f0f5`, `#888899`, `#444455`).

Zero green, zero cyan, zero yellow, and zero AI cartoon emojis.

---

## 🛠️ Repository Structure

```
mindmind/
├── index.html                 # Arena interface & player HUD
├── dashboard.html             # Spectator leaderboard with authentication
├── backend-mongoose-server.js # Production Express + MongoDB server
├── package.json               # Node.js project manifest & scripts
├── DEPLOYMENT_GUIDE.md        # Comprehensive multi-team deployment manual
├── README.md                  # System overview and instructions
├── css/
│   ├── style.css              # Theme variables & base typography
│   ├── components.css         # IDE, visual viewports, buzzer, modals
│   ├── animations.css         # CRT scanlines, pulse, and shake keyframes
│   └── dashboard.css          # Leaderboard layout & macOS squircle windowing
└── js/
    ├── audio.js               # Web Audio API procedural synthesizer
    ├── questions.js           # 4/8/8 technical question repository
    ├── store.js               # Tactical lifelines & HUD alert manager
    ├── app.js                 # Master state machine & telemetry sync
    ├── dashboard.js           # Leaderboard controller & auth engine
    ├── particles.js           # Ambient red node matrix & click stars
    └── rounds/
        ├── round1-visual.js   # Stage 1: Visual decoding
        ├── round2-bugs.js     # Stage 2: Bug hunting IDE
        └── round3-buzzer.js   # Stage 3: Arcade buzzer
```

---

## ⚡ Quick Start

### 1. Install & Run with Backend
```bash
npm install
npm start
```
- **Player Arena**: `http://localhost:8000`
- **Spectator Dashboard**: `http://localhost:8000/dashboard.html`
- **Health Check**: `http://localhost:8000/healthz`

### 2. Standalone Mode (Zero Dependencies)
You can also run the entire application using any static HTTP server or open `index.html` directly in any modern browser.

---

## 🎮 Keyboard Shortcuts

| Key | Context | Action |
| :--- | :--- | :--- |
| **[SPACEBAR]** | Stage 3 (Buzzer) | Buzz-in immediately |
| **[1] – [4]** | All Rounds | Select corresponding option or code patch |
| **[ENTER]** | Login / Forms | Submit credentials or start arena |
| **[ESC]** | Any Modal | Close active modal dialog |
