/**
 * Round 2: Spot The Errors (Cyber Bug Hunter)
 * Interactive Cyber Terminal / IDE with clickable code lines, syntax diagnostics, and patch deployment
 */

class Round2Bugs {
  constructor(game) {
    this.game = game;
    this.questions = (typeof window !== 'undefined' && window.QUESTION_DATABASE) ? window.QUESTION_DATABASE.round2 : (typeof QUESTION_DATABASE !== 'undefined' ? QUESTION_DATABASE.round2 : []);
    this.currentIndex = 0;
    this.selectedLineIndex = null;
    this.lineConfirmed = false;
    this.answered = false;
    this.timer = 50;
    this.timerInterval = null;
    this.isFrozen = false;
    this.showingHint = false;
  }

  start() {
    if (typeof getShuffledQuestions === 'function') {
      this.questions = getShuffledQuestions('round2', 8);
    } else if (typeof window !== 'undefined' && window.QUESTION_DATABASE && window.QUESTION_DATABASE.round2) {
      this.questions = [...window.QUESTION_DATABASE.round2].slice(0, 8);
    } else {
      this.questions = [...QUESTION_DATABASE.round2].slice(0, 8);
    }
    this.currentIndex = 0;
    this.attachKeyListeners();
    this.loadBug(this.currentIndex);
  }

  attachKeyListeners() {
    if (this.keyListenerAttached) return;
    this.keyListenerAttached = true;

    window.addEventListener('keydown', (e) => {
      if (this.game.currentRound !== 2 || this.answered) return;
      if (this.lineConfirmed) {
        if (['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4'].includes(e.code)) {
          const num = parseInt(e.key, 10);
          if (num >= 1 && num <= 4) {
            e.preventDefault();
            this.handleSelectPatch(num - 1);
          }
        }
      }
    });
  }

  loadBug(index) {
    if (!this.questions || this.questions.length === 0) {
      this.questions = (typeof QUESTION_DATABASE !== 'undefined' ? QUESTION_DATABASE.round2 : []) || [];
    }
    if (index >= this.questions.length) {
      this.finishRound();
      return;
    }

    this.currentIndex = index;
    this.selectedLineIndex = null;
    this.lineConfirmed = false;
    this.answered = false;
    this.timer = 50;
    this.isFrozen = false;
    this.showingHint = false;

    this.render();
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timerInterval);
    const timerDisplay = document.getElementById('round-timer-val');
    if (timerDisplay) timerDisplay.textContent = this.timer;

    this.timerInterval = setInterval(() => {
      if (this.isFrozen) return;

      this.timer--;
      if (timerDisplay) {
        timerDisplay.textContent = this.timer;
        if (this.timer <= 10) {
          timerDisplay.classList.add('urgent-pulse');
          if (window.soundEngine) window.soundEngine.playTick(true);
        } else {
          timerDisplay.classList.remove('urgent-pulse');
        }
      }

      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
        this.handleTimeout();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    const timerDisplay = document.getElementById('round-timer-val');
    if (timerDisplay) timerDisplay.classList.remove('urgent-pulse');
  }

  freezeTimer(seconds = 10) {
    this.isFrozen = true;
    const timerBox = document.getElementById('hud-timer-badge');
    if (timerBox) timerBox.classList.add('timer-frozen');

    setTimeout(() => {
      this.isFrozen = false;
      if (timerBox) timerBox.classList.remove('timer-frozen');
    }, seconds * 1000);
  }

  handleTimeout() {
    if (this.answered) return;
    this.answered = true;
    if (window.soundEngine) window.soundEngine.playError();

    const q = this.questions[this.currentIndex];
    this.showFeedback(false, "TIME EXPIRED! Inspection time ended.", q.errorExplanation);
  }

  render() {
    const container = document.getElementById('round-view-container');
    if (!container) return;

    const q = this.questions[this.currentIndex];

    container.innerHTML = `
      <div class="challenge-wrapper glass-panel">
        <div class="challenge-header">
          <div class="challenge-meta">
            <span class="cyber-badge category-badge">${q.category}</span>
            <span class="cyber-badge step-badge">BUG ${this.currentIndex + 1} / ${this.questions.length}</span>
            <span class="cyber-badge points-badge">+100 PTS LOCK • +300 PTS PATCH</span>
          </div>
          <h2 class="challenge-title">${q.title}</h2>
          <div class="scenario-callout">
            <span class="callout-text"><strong>PROBLEM:</strong> ${q.scenario}</span>
          </div>
          <p class="challenge-instruction">Click the buggy line to select a fix.</p>
        </div>

        <!-- Cyber IDE Terminal Window -->
        <div class="cyber-ide-container glass-panel">
          <div class="ide-titlebar">
            <div class="ide-controls">
              <span class="dot dot-red"></span>
              <span class="dot dot-white"></span>
              <span class="dot dot-dim"></span>
            </div>
            <span class="ide-filename">bug_trace_${q.id}.source</span>
            <span class="ide-status" id="ide-status-badge">AWAITING LINE SELECTION</span>
          </div>
          
          <div class="ide-editor-body" id="ide-lines-container">
            ${q.codeLines.map((line, idx) => `
              <div class="ide-line" id="code-line-${idx}" onclick="window.game.round2.handleLineClick(${idx})">
                <span class="line-number">${(idx + 1).toString().padStart(2, '0')}</span>
                <span class="line-code"><code>${this.escapeHTML(line)}</code></span>
                <span class="line-target-indicator">TARGET</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Hint Card (if activated) -->
        <div id="bug-hint-container" class="cyber-hint-card ${this.showingHint ? '' : 'hidden'}">
          <div class="hint-header">
            <strong>DIAGNOSTIC HINT:</strong>
          </div>
          <div class="hint-body">${q.hint}</div>
        </div>

        <!-- Step 2: Patch Deployment Box (appears once line is picked or directly available) -->
        <div id="patch-deployment-panel" class="patch-panel hidden glass-panel">
          <div class="patch-header">
            <span class="patch-badge">FIX PROTOCOL</span>
            <p>Select correct fix for line <span id="target-line-indicator">#</span>:</p>
          </div>
          <div class="options-grid" id="patch-options-grid">
            ${q.fixOptions.map((fix, idx) => `
              <button class="cyber-option-btn" id="patch-btn-${idx}" onclick="window.game.round2.handleSelectPatch(${idx})">
                <span class="opt-prefix">PATCH ${idx + 1}</span>
                <code class="opt-text">${this.escapeHTML(fix)}</code>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Post-Answer Feedback Banner -->
        <div id="bug-feedback-card" class="feedback-card hidden"></div>
      </div>
    `;

    this.game.updateRoundHUD("ROUND 2: SPOT THE ERRORS", `${this.currentIndex + 1}/${this.questions.length}`);
  }

  handleLineClick(lineIndex) {
    if (this.answered || this.lineConfirmed) return;

    const q = this.questions[this.currentIndex];
    this.selectedLineIndex = lineIndex;

    // Reset visual selection on all lines
    document.querySelectorAll('.ide-line').forEach(el => el.classList.remove('line-selected', 'line-wrong-shake'));

    const clickedEl = document.getElementById(`code-line-${lineIndex}`);
    if (!clickedEl) return;

    if (window.soundEngine) window.soundEngine.playClick(900);

    if (lineIndex === q.errorLineIndex) {
      // Correct line spotted!
      this.lineConfirmed = true;
      clickedEl.classList.add('line-confirmed-error');
      
      const statusBadge = document.getElementById('ide-status-badge');
      if (statusBadge) {
        statusBadge.textContent = `TARGET ACQUIRED: LINE ${lineIndex + 1}`;
        statusBadge.classList.add('status-locked');
      }

      // Time-based points for spotting the corrupted line quickly
      const lineTimeBonus = this.timer * 3;
      const linePts = 50 + lineTimeBonus;
      this.game.addScore(linePts);
      if (window.armoryStore) window.armoryStore.showFloatingHUDNotification(`Line Identified: +${linePts} PTS (+${lineTimeBonus} Speed Bonus)`);

      // Show patch options
      const patchPanel = document.getElementById('patch-deployment-panel');
      const targetLineIndicator = document.getElementById('target-line-indicator');
      if (targetLineIndicator) targetLineIndicator.textContent = `#${lineIndex + 1}`;
      if (patchPanel) {
        patchPanel.classList.remove('hidden');
        patchPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      // Wrong line clicked
      clickedEl.classList.add('line-wrong-shake');
      if (window.soundEngine) window.soundEngine.playError();
      if (window.armoryStore) window.armoryStore.showFloatingHUDNotification("Bug is not in this line. Try another line.");
    }
  }

  handleSelectPatch(fixIndex) {
    if (this.answered) return;
    this.answered = true;
    this.stopTimer();

    const q = this.questions[this.currentIndex];
    const isCorrect = fixIndex === q.correctFixIndex;
    const selectedBtn = document.getElementById(`patch-btn-${fixIndex}`);
    const correctBtn = document.getElementById(`patch-btn-${q.correctFixIndex}`);

    if (isCorrect) {
      if (selectedBtn) selectedBtn.classList.add('btn-correct');
      if (window.soundEngine) window.soundEngine.playSuccess();

      // Time-based points for deploying the patch quickly
      const patchTimeBonus = this.timer * 7;
      const earnedScore = 150 + patchTimeBonus;
      this.game.addScore(earnedScore);

      this.showFeedback(true, `PATCH VERIFIED! +${earnedScore} PTS`, `+150 Base • +${patchTimeBonus} Speed Bonus (${this.timer}s remaining)\n\n${q.errorExplanation} Fix applied successfully.`);
    } else {
      if (selectedBtn) selectedBtn.classList.add('btn-wrong');
      if (correctBtn) correctBtn.classList.add('btn-correct');
      if (window.soundEngine) window.soundEngine.playError();

      this.showFeedback(false, "INCORRECT FIX! Solution does not resolve the bug.", q.errorExplanation);
    }
  }

  showFeedback(isSuccess, headline, explanation) {
    const card = document.getElementById('bug-feedback-card');
    if (!card) return;

    card.className = `feedback-card ${isSuccess ? 'feedback-success' : 'feedback-error'}`;
    card.innerHTML = `
      <div class="feedback-header">
        <span class="feedback-status-pill ${isSuccess ? 'pill-success' : 'pill-error'}">${isSuccess ? 'RESOLVED' : 'FAILED'}</span>
        <h3 class="feedback-title">${headline}</h3>
      </div>
      <p class="feedback-explanation">${explanation}</p>
      <div class="feedback-actions">
        <button class="neon-btn btn-primary" onclick="window.game.round2.nextBug()">
          ${this.currentIndex + 1 < this.questions.length ? 'NEXT BUG' : 'FINISH ROUND 2'}
        </button>
      </div>
    `;
    card.classList.remove('hidden');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  nextBug() {
    this.loadBug(this.currentIndex + 1);
  }

  apply5050() {
    if (this.answered) return;
    const q = this.questions[this.currentIndex];

    if (!this.lineConfirmed) {
      // Purge 2 non-buggy lines from suspicion
      const innocentLineIndices = q.codeLines.map((_, i) => i).filter(i => i !== q.errorLineIndex);
      innocentLineIndices.sort(() => 0.5 - Math.random());
      const purgedLines = innocentLineIndices.slice(0, 2);

      purgedLines.forEach(idx => {
        const el = document.getElementById(`code-line-${idx}`);
        if (el) {
          el.style.opacity = '0.25';
          el.style.pointerEvents = 'none';
          const indicator = el.querySelector('.line-target-indicator');
          if (indicator) {
            indicator.textContent = 'CLEARED';
            indicator.style.color = '#ffffff';
            indicator.style.display = 'block';
          }
        }
      });
      window.armoryStore.showFloatingHUDNotification("50/50 Purge: 2 safe code lines cleared.");
    } else {
      // Purge 2 incorrect patches
      const wrongFixes = [0, 1, 2, 3].filter(i => i !== q.correctFixIndex);
      wrongFixes.sort(() => 0.5 - Math.random());
      const purged = wrongFixes.slice(0, 2);

      purged.forEach(idx => {
        const btn = document.getElementById(`patch-btn-${idx}`);
        if (btn) {
          btn.classList.add('purged-option');
          btn.disabled = true;
        }
      });
      window.armoryStore.showFloatingHUDNotification("50/50 Purge: 2 wrong fixes eliminated.");
    }
  }

  applyHint() {
    this.showingHint = true;
    const hintBox = document.getElementById('bug-hint-container');
    if (hintBox) hintBox.classList.remove('hidden');

    // Also highlight suspect lines
    const q = this.questions[this.currentIndex];
    const targetLine = document.getElementById(`code-line-${q.errorLineIndex}`);
    if (targetLine) {
      targetLine.classList.add('hint-glow-line');
    }
    window.armoryStore.showFloatingHUDNotification("Diagnostic Hint: Target line highlighted.");
  }

  applyFreeze() {
    this.freezeTimer(10);
    window.armoryStore.showFloatingHUDNotification("Timer Freeze: 10s added.");
  }

  finishRound() {
    this.stopTimer();
    this.game.showRoundCompletionModal(2);
  }

  escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

if (typeof window !== 'undefined') {
  window.Round2Bugs = Round2Bugs;
}
