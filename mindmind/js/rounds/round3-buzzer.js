/**
 * Round 3: The Buzzer Finish (High-Stakes Blitz Showdown)
 * Features physical buzzer trigger, Spacebar shortcut, blitz multipliers, countdown lockouts, and intense neon audio
 */

class Round3Buzzer {
  constructor(game) {
    this.game = game;
    this.questions = (typeof window !== 'undefined' && window.QUESTION_DATABASE) ? window.QUESTION_DATABASE.round3 : (typeof QUESTION_DATABASE !== 'undefined' ? QUESTION_DATABASE.round3 : []);
    this.currentIndex = 0;
    this.state = 'IDLE'; // IDLE, READING, BUZZED, ANSWERED, TIMEOUT
    this.readTimer = 12; // 12 seconds to buzz
    this.readInterval = null;
    this.buzzTimer = 6;  // 6 seconds to answer once buzzed
    this.buzzInterval = null;
    this.buzzedAtRemainingTime = 0;
    this.answered = false;
    this.isFrozen = false;
    this.spaceListenerAttached = false;
  }

  start() {
    if (typeof getShuffledQuestions === 'function') {
      this.questions = getShuffledQuestions('round3', 8);
    } else if (typeof window !== 'undefined' && window.QUESTION_DATABASE && window.QUESTION_DATABASE.round3) {
      this.questions = [...window.QUESTION_DATABASE.round3].slice(0, 8);
    } else {
      this.questions = [...QUESTION_DATABASE.round3].slice(0, 8);
    }
    this.currentIndex = 0;
    this.attachKeyListeners();
    this.loadQuestion(this.currentIndex);
  }

  attachKeyListeners() {
    if (this.spaceListenerAttached) return;
    this.spaceListenerAttached = true;

    window.addEventListener('keydown', (e) => {
      // Only active if Round 3 view is current
      if (this.game.currentRound !== 3) return;

      // Spacebar buzzes in
      if (e.code === 'Space' && this.state === 'READING') {
        e.preventDefault();
        this.triggerBuzzer();
        return;
      }

      // Hotkeys 1-4 for options when buzzed
      if (this.state === 'BUZZED' && !this.answered) {
        if (['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4'].includes(e.code)) {
          const num = parseInt(e.key, 10);
          if (num >= 1 && num <= 4) {
            e.preventDefault();
            this.handleSelectAnswer(num - 1);
          }
        }
      }
    });
  }

  loadQuestion(index) {
    if (!this.questions || this.questions.length === 0) {
      this.questions = (typeof QUESTION_DATABASE !== 'undefined' ? QUESTION_DATABASE.round3 : []) || [];
    }
    if (index >= this.questions.length) {
      this.finishRound();
      return;
    }

    this.currentIndex = index;
    this.state = 'READING';
    this.answered = false;
    this.isFrozen = false;
    this.readTimer = 12;
    this.buzzTimer = 6;

    this.render();
    this.startReadCountdown();
  }

  startReadCountdown() {
    clearInterval(this.readInterval);
    clearInterval(this.buzzInterval);

    const timerVal = document.getElementById('round-timer-val');
    if (timerVal) timerVal.textContent = this.readTimer;

    this.readInterval = setInterval(() => {
      if (this.isFrozen) return;

      this.readTimer--;
      if (timerVal) {
        timerVal.textContent = this.readTimer;
        if (this.readTimer <= 4) {
          timerVal.classList.add('urgent-pulse');
          if (window.soundEngine) window.soundEngine.playTick(false);
        }
      }

      if (this.readTimer <= 0) {
        clearInterval(this.readInterval);
        this.handleReadTimeout();
      }
    }, 1000);
  }

  handleReadTimeout() {
    if (this.state !== 'READING') return;
    this.state = 'TIMEOUT';
    this.answered = true;
    if (window.soundEngine) window.soundEngine.playError();

    const q = this.questions[this.currentIndex];
    this.showFeedback(false, "TIME EXPIRED (0 PTS)", `Buzzer window closed before buzz-in. Correct answer: ${q.options[q.correctIndex]}`);
  }

  triggerBuzzer() {
    if (this.state !== 'READING' || this.answered) return;

    this.state = 'BUZZED';
    this.buzzedAtRemainingTime = this.readTimer;
    clearInterval(this.readInterval);

    // Audio SFX
    if (window.soundEngine) window.soundEngine.playBuzzer();

    // Visual shockwave on screen
    document.body.classList.add('screen-buzzer-flash');
    setTimeout(() => document.body.classList.remove('screen-buzzer-flash'), 400);

    const buzzerBtn = document.getElementById('master-buzzer-btn');
    if (buzzerBtn) {
      buzzerBtn.classList.add('buzzer-locked');
      buzzerBtn.innerHTML = `
        <span class="buzzer-status-text">BUZZER LOCKED</span>
        <span class="buzzer-subtext">ANSWER WINDOW ACTIVE</span>
      `;
    }

    // Enable Options Grid
    const optionsGrid = document.getElementById('buzzer-options-grid');
    if (optionsGrid) {
      optionsGrid.classList.remove('options-locked');
    }

    // Determine Multiplier
    const isBlitz = this.buzzedAtRemainingTime >= 8;
    const multiplierBadge = document.getElementById('buzzer-multiplier-badge');
    if (multiplierBadge) {
      multiplierBadge.textContent = isBlitz ? "3X BLITZ MULTIPLIER" : "2X SPEED MULTIPLIER";
      multiplierBadge.classList.add(isBlitz ? 'blitz-3x' : 'blitz-2x');
    }

    // Start strict 6-second buzz answer countdown
    this.startBuzzCountdown();
  }

  startBuzzCountdown() {
    const buzzTimerEl = document.getElementById('buzzer-rush-timer');
    if (buzzTimerEl) buzzTimerEl.textContent = `${this.buzzTimer}s`;

    this.buzzInterval = setInterval(() => {
      if (this.isFrozen) return;

      this.buzzTimer--;
      if (buzzTimerEl) {
        buzzTimerEl.textContent = `${this.buzzTimer}s`;
        if (this.buzzTimer <= 3) {
          buzzTimerEl.classList.add('critical-rush');
          if (window.soundEngine) window.soundEngine.playTick(true);
        }
      }

      if (this.buzzTimer <= 0) {
        clearInterval(this.buzzInterval);
        this.handleBuzzTimeout();
      }
    }, 1000);
  }

  handleBuzzTimeout() {
    if (this.answered) return;
    this.answered = true;
    this.state = 'TIMEOUT';
    if (window.soundEngine) window.soundEngine.playError();

    const q = this.questions[this.currentIndex];

    // Penalty for buzzing and not answering
    this.game.deductScore(100);
    if (window.armoryStore) window.armoryStore.showFloatingHUDNotification("-100 PTS: Buzzer timeout.");

    this.showFeedback(false, "BUZZER TIMEOUT! -100 PTS", `Time expired after buzzing in. Correct answer: ${q.options[q.correctIndex]}`);
  }

  handleSelectAnswer(optionIndex) {
    if (this.state !== 'BUZZED' || this.answered) return;

    this.answered = true;
    clearInterval(this.buzzInterval);
    clearInterval(this.readInterval);

    const q = this.questions[this.currentIndex];
    const isCorrect = optionIndex === q.correctIndex;
    const selectedBtn = document.getElementById(`buzz-opt-${optionIndex}`);
    const correctBtn = document.getElementById(`buzz-opt-${q.correctIndex}`);

    // Time-based points:
    // Reflex speed bonus: buzzedAtRemainingTime * 25 (out of 12s)
    // Answer speed bonus: buzzTimer * 20 (out of 6s)
    const reflexBonus = Math.max(0, this.buzzedAtRemainingTime) * 25;
    const answerBonus = Math.max(0, this.buzzTimer) * 20;
    const totalPts = 150 + reflexBonus + answerBonus;

    if (isCorrect) {
      if (selectedBtn) selectedBtn.classList.add('btn-correct');
      if (window.soundEngine) window.soundEngine.playSuccess();

      this.game.addScore(totalPts);
      this.showFeedback(true, `CORRECT! +${totalPts} PTS`, `+150 Base • +${reflexBonus} Buzzer Reflex • +${answerBonus} Answer Speed\n\n${q.explanation}`);
    } else {
      if (selectedBtn) selectedBtn.classList.add('btn-wrong');
      if (correctBtn) correctBtn.classList.add('btn-correct');
      if (window.soundEngine) window.soundEngine.playError();

      this.game.deductScore(100);
      if (window.armoryStore) window.armoryStore.showFloatingHUDNotification("-100 PTS: Incorrect answer.");

      this.showFeedback(false, "INCORRECT! -100 PTS", q.explanation);
    }
  }

  render() {
    const container = document.getElementById('round-view-container');
    if (!container) return;

    const q = this.questions[this.currentIndex];

    container.innerHTML = `
      <div class="challenge-wrapper buzzer-round-theme glass-panel">
        <div class="challenge-header">
          <div class="challenge-meta">
            <span class="cyber-badge category-badge">${q.category}</span>
            <span class="cyber-badge step-badge">BUZZER ${this.currentIndex + 1} / ${this.questions.length}</span>
            <span id="buzzer-multiplier-badge" class="cyber-badge multiplier-badge">3X BLITZ (300 PTS)</span>
          </div>
          <h2 class="challenge-title buzzer-prompt-text">${q.question}</h2>
          <p class="challenge-instruction">Press <strong>[SPACEBAR]</strong> or tap <strong>BUZZ IN</strong> to unlock options.</p>
        </div>

        <!-- The Grand Physical Neon Buzzer -->
        <div class="buzzer-chamber">
          <div class="buzzer-ring">
            <button id="master-buzzer-btn" class="cyber-arcade-buzzer" onclick="window.game.round3.triggerBuzzer()">
              <div class="buzzer-core">
                <span class="buzzer-main-label">BUZZ IN</span>
                <span class="buzzer-hotkey-hint">[SPACEBAR]</span>
              </div>
            </button>
          </div>
          <div class="buzzer-rush-timer-container">
            <span class="rush-label">LOCKOUT TIMER:</span>
            <span id="buzzer-rush-timer" class="rush-time">6s</span>
          </div>
        </div>

        <!-- Hint Container -->
        <div id="buzzer-hint-container" class="cyber-hint-card ${this.showingHint ? '' : 'hidden'}">
          <div class="hint-header">
            <strong>DIAGNOSTIC HINT:</strong>
          </div>
          <div class="hint-body">${q.hint || "Analyze the core specification parameters closely."}</div>
        </div>

        <!-- Options Grid (Initially Locked Until Buzzer Hit) -->
        <div class="options-grid options-locked" id="buzzer-options-grid">
          ${q.options.map((opt, idx) => `
            <button class="cyber-option-btn buzzer-option-btn" id="buzz-opt-${idx}" onclick="window.game.round3.handleSelectAnswer(${idx})">
              <span class="opt-prefix">KEY ${idx + 1}</span>
              <span class="opt-text">${this.escapeHTML(opt)}</span>
            </button>
          `).join('')}
        </div>

        <!-- Post-Answer Feedback Banner -->
        <div id="buzzer-feedback-card" class="feedback-card hidden"></div>
      </div>
    `;

    this.game.updateRoundHUD("ROUND 3: BUZZER FINISH", `${this.currentIndex + 1}/${this.questions.length}`);
  }

  showFeedback(isSuccess, headline, explanation) {
    const card = document.getElementById('buzzer-feedback-card');
    if (!card) return;

    card.className = `feedback-card ${isSuccess ? 'feedback-success' : 'feedback-error'}`;
    card.innerHTML = `
      <div class="feedback-header">
        <span class="feedback-status-pill ${isSuccess ? 'pill-success' : 'pill-error'}">${isSuccess ? 'CORRECT' : 'PENALTY'}</span>
        <h3 class="feedback-title">${headline}</h3>
      </div>
      <p class="feedback-explanation">${explanation}</p>
      <div class="feedback-actions">
        <button class="neon-btn btn-primary" onclick="window.game.round3.nextQuestion()">
          ${this.currentIndex + 1 < this.questions.length ? 'NEXT QUESTION' : 'FINALIZE SCORE'}
        </button>
      </div>
    `;
    card.classList.remove('hidden');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  nextQuestion() {
    this.loadQuestion(this.currentIndex + 1);
  }

  apply5050() {
    if (this.state !== 'BUZZED' || this.answered) {
      window.armoryStore.showFloatingHUDNotification("Buzz in first to unlock options.");
      return;
    }
    const q = this.questions[this.currentIndex];
    const wrong = [0, 1, 2, 3].filter(i => i !== q.correctIndex);
    wrong.sort(() => 0.5 - Math.random());
    const purged = wrong.slice(0, 2);

    purged.forEach(idx => {
      const btn = document.getElementById(`buzz-opt-${idx}`);
      if (btn) {
        btn.classList.add('purged-option');
        btn.disabled = true;
      }
    });
    window.armoryStore.showFloatingHUDNotification("50/50 Purge: 2 wrong options eliminated.");
  }

  applyHint() {
    this.showingHint = true;
    const hintBox = document.getElementById('buzzer-hint-container');
    if (hintBox) hintBox.classList.remove('hidden');
    window.armoryStore.showFloatingHUDNotification("Diagnostic Hint Activated.");
  }

  applyFreeze() {
    this.isFrozen = true;
    const timerBox = document.getElementById('hud-timer-badge');
    if (timerBox) timerBox.classList.add('timer-frozen');

    setTimeout(() => {
      this.isFrozen = false;
      if (timerBox) timerBox.classList.remove('timer-frozen');
    }, 10000);

    window.armoryStore.showFloatingHUDNotification("Timer Freeze: 10s added.");
  }

  finishRound() {
    clearInterval(this.readInterval);
    clearInterval(this.buzzInterval);
    this.game.showGameFinishScreen();
  }

  escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

if (typeof window !== 'undefined') {
  window.Round3Buzzer = Round3Buzzer;
}
