/**
 * Round 1: Visual Decoding Engine
 * Renders interactive visual schematics, CSS preview viewports, logic circuits, and box models
 */

class Round1Visual {
  constructor(game) {
    this.game = game;
    this.questions = (typeof window !== 'undefined' && window.QUESTION_DATABASE) ? window.QUESTION_DATABASE.round1 : (typeof QUESTION_DATABASE !== 'undefined' ? QUESTION_DATABASE.round1 : []);
    this.currentIndex = 0;
    this.selectedOption = null;
    this.answered = false;
    this.purgedOptions = [];
    this.showingHint = false;
    this.timer = 45; // 45 seconds per puzzle
    this.timerInterval = null;
    this.isFrozen = false;
  }

  start() {
    if (typeof getShuffledQuestions === 'function') {
      this.questions = getShuffledQuestions('round1', 4);
    } else if (typeof window !== 'undefined' && window.QUESTION_DATABASE && window.QUESTION_DATABASE.round1) {
      this.questions = [...window.QUESTION_DATABASE.round1].slice(0, 4);
    } else {
      this.questions = [...QUESTION_DATABASE.round1].slice(0, 4);
    }
    this.currentIndex = 0;
    this.attachKeyListeners();
    this.loadQuestion(this.currentIndex);
  }

  attachKeyListeners() {
    if (this.keyListenerAttached) return;
    this.keyListenerAttached = true;

    window.addEventListener('keydown', (e) => {
      if (this.game.currentRound !== 1 || this.answered) return;
      if (['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4'].includes(e.code)) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 4) {
          e.preventDefault();
          this.handleSelectOption(num - 1);
        }
      }
    });
  }

  loadQuestion(index) {
    if (!this.questions || this.questions.length === 0) {
      this.questions = (typeof QUESTION_DATABASE !== 'undefined' ? QUESTION_DATABASE.round1 : []) || [];
    }
    if (index >= this.questions.length) {
      this.finishRound();
      return;
    }

    this.currentIndex = index;
    this.answered = false;
    this.selectedOption = null;
    this.purgedOptions = [];
    this.showingHint = false;
    this.timer = 45;
    this.isFrozen = false;

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
    this.showFeedback(false, "TIME EXPIRED! No answer submitted in time.", q.explanation);
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
            <span class="cyber-badge step-badge">PUZZLE ${this.currentIndex + 1} / ${this.questions.length}</span>
            <span class="cyber-badge points-badge">+150 PTS</span>
          </div>
          <h2 class="challenge-title">${q.title}</h2>
          <p class="challenge-instruction">${q.instruction}</p>
        </div>

        <!-- Dynamic Visual Schematic Area -->
        <div class="visual-canvas-container">
          <div class="visual-canvas-header">
            <div class="canvas-dot dot-red"></div>
            <div class="canvas-dot dot-white"></div>
            <div class="canvas-dot dot-dim"></div>
            <span class="canvas-title">VISUAL SCHEMATIC</span>
          </div>
          <div class="visual-canvas-body" id="visual-render-target">
            ${this.generateVisualHTML(q)}
          </div>
        </div>

        <!-- Hint Banner (if activated) -->
        <div id="visual-hint-container" class="cyber-hint-card ${this.showingHint ? '' : 'hidden'}">
          <div class="hint-header">
            <strong>DIAGNOSTIC HINT:</strong>
          </div>
          <div class="hint-body">${q.hint}</div>
        </div>

        <!-- Multiple Choice Options -->
        <div class="options-grid" id="visual-options-grid">
          ${q.options.map((opt, idx) => `
            <button class="cyber-option-btn" id="opt-btn-${idx}" onclick="window.game.round1.handleSelectOption(${idx})">
              <span class="opt-prefix">0${idx + 1}</span>
              <code class="opt-text">${this.escapeHTML(opt)}</code>
            </button>
          `).join('')}
        </div>

        <!-- Post-Answer Feedback Banner -->
        <div id="visual-feedback-card" class="feedback-card hidden"></div>
      </div>
    `;

    // Update global game HUD state
    this.game.updateRoundHUD("ROUND 1: VISUAL DECODING", `${this.currentIndex + 1}/${this.questions.length}`);
  }

  generateVisualHTML(q) {
    if (q.visualType === 'flexbox') {
      const { containerStyles = {}, items = [] } = q.visualConfig || {};
      const cssString = Object.entries(containerStyles)
        .map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v}`)
        .join('; ');

      return `
        <div class="flex-preview-box" style="${cssString}">
          ${items.map(it => `
            <div class="flex-preview-item" style="height: ${it.height || '40px'}; background: ${it.bg || '#ff003c'};">
              <span>${it.text || ''}</span>
            </div>
          `).join('')}
        </div>
        <div class="viewport-hud-specs">
          <span>Target Container: display: flex;</span>
          <span class="tech-spec-glow">Inspect Edge Gaps & Vertical Base</span>
        </div>
      `;
    }

    if (q.visualType === 'logic-gate') {
      return `
        <div class="logic-circuit-svg-wrap">
          <svg viewBox="0 0 600 240" class="logic-svg">
            <defs>
              <linearGradient id="cyberRedGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff003c" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#800020" stop-opacity="0.4"/>
              </linearGradient>
            </defs>

            <!-- Input Pins -->
            <rect x="20" y="35" width="40" height="30" rx="4" fill="#121217" stroke="#ff003c" stroke-width="2"/>
            <text x="40" y="55" fill="#fff" font-size="14" text-anchor="middle" font-weight="bold">A=1</text>

            <rect x="20" y="155" width="40" height="30" rx="4" fill="#121217" stroke="#ff003c" stroke-width="2"/>
            <text x="40" y="175" fill="#fff" font-size="14" text-anchor="middle" font-weight="bold">B=0</text>

            <!-- Lines from Inputs to Gates -->
            <path d="M 60 50 L 150 50 L 180 75" stroke="#ff003c" stroke-width="2" fill="none" class="pulse-line"/>
            <path d="M 60 170 L 130 170 L 180 95" stroke="#ff003c" stroke-width="2" fill="none" class="pulse-line"/>
            <path d="M 60 170 L 180 170" stroke="#ff003c" stroke-width="2" fill="none"/>

            <!-- Gate 1: XOR -->
            <g transform="translate(180, 50)">
              <rect width="100" height="65" rx="8" fill="url(#cyberRedGlow)" stroke="#ff003c" stroke-width="2"/>
              <text x="50" y="32" fill="#fff" font-size="15" text-anchor="middle" font-weight="bold">XOR</text>
              <text x="50" y="50" fill="#aaa" font-size="10" text-anchor="middle">Gate 1</text>
            </g>

            <!-- Gate 2: NOT -->
            <g transform="translate(180, 145)">
              <rect width="100" height="50" rx="8" fill="url(#cyberRedGlow)" stroke="#ff003c" stroke-width="2"/>
              <text x="50" y="27" fill="#fff" font-size="15" text-anchor="middle" font-weight="bold">NOT</text>
              <text x="50" y="42" fill="#aaa" font-size="10" text-anchor="middle">Gate 2</text>
            </g>

            <!-- Connections to Gate 3 -->
            <path d="M 280 82 L 360 82 L 390 110" stroke="#ff003c" stroke-width="2" fill="none"/>
            <path d="M 280 170 L 360 170 L 390 135" stroke="#ff003c" stroke-width="2" fill="none"/>

            <!-- Gate 3: AND -->
            <g transform="translate(390, 90)">
              <rect width="110" height="65" rx="8" fill="url(#cyberRedGlow)" stroke="#ff003c" stroke-width="2"/>
              <text x="55" y="32" fill="#fff" font-size="15" text-anchor="middle" font-weight="bold">AND</text>
              <text x="55" y="50" fill="#aaa" font-size="10" text-anchor="middle">Gate 3</text>
            </g>

            <!-- Output Pin Q -->
            <path d="M 500 122 L 540 122" stroke="#ff003c" stroke-width="3" fill="none"/>
            <circle cx="560" cy="122" r="18" fill="#121217" stroke="#ff003c" stroke-width="2"/>
            <text x="560" y="127" fill="#ff003c" font-size="16" text-anchor="middle" font-weight="bold">Q</text>
          </svg>
        </div>
      `;
    }

    if (q.visualType === 'box-model') {
      const b = q.boxData || {
        margin: "15px",
        border: "5px solid #ff003c",
        padding: "20px",
        content: "200px width",
        boxSizing: "content-box"
      };
      return `
        <div class="box-model-visualizer">
          <div class="box-margin">
            <span class="box-label">MARGIN: ${b.margin}</span>
            <div class="box-border">
              <span class="box-label">BORDER: ${b.border}</span>
              <div class="box-padding">
                <span class="box-label">PADDING: ${b.padding}</span>
                <div class="box-content">
                  <span class="box-label highlight">CONTENT: ${b.content}</span>
                  <code>box-sizing: ${b.boxSizing}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (q.visualType === 'grid-demo') {
      const cells = q.gridStructure || [
        { name: "HEADER", code: "grid-column: 1 / 3", col: "1 / 3", class: "header-cell" },
        { name: "SIDEBAR", code: "col 1", col: "1 / 2", class: "side-cell" },
        { name: "MAIN CONTENT", code: "col 2", col: "2 / 3", class: "main-cell" }
      ];
      return `
        <div class="grid-preview-board">
          ${cells.map(c => `
            <div class="grid-cell ${c.class || ''}" style="${c.col ? `grid-column: ${c.col};` : ''}">
              <strong>${c.name}</strong>
              <code>${c.code || ''}</code>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (q.visualType === 'code-trace') {
      return `
        <div class="trace-diagram-board">
          <div class="trace-steps">
            ${q.steps.map((st, i) => `
              <div class="trace-step-row ${i === q.steps.length - 1 ? 'active-target-step' : ''}">
                <span class="trace-bullet">•</span>
                <code>${st}</code>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (q.visualType === 'venn-diagram') {
      return `
        <div class="venn-preview-box">
          <div class="venn-circle circle-left">
            <span class="venn-circle-title">HTML (40)</span>
            <span class="venn-only">25 Only</span>
          </div>
          <div class="venn-intersection">
            <span>BOTH</span>
            <strong>15</strong>
          </div>
          <div class="venn-circle circle-right">
            <span class="venn-circle-title">CSS (30)</span>
            <span class="venn-only">15 Only</span>
          </div>
        </div>
      `;
    }

    return `<div class="p-4 text-center">Visual Data Stream Ready</div>`;
  }

  handleSelectOption(optionIndex) {
    if (this.answered) return;
    this.answered = true;
    this.stopTimer();

    const q = this.questions[this.currentIndex];
    const isCorrect = optionIndex === q.correctIndex;
    const selectedBtn = document.getElementById(`opt-btn-${optionIndex}`);
    const correctBtn = document.getElementById(`opt-btn-${q.correctIndex}`);

    if (isCorrect) {
      if (selectedBtn) selectedBtn.classList.add('btn-correct');
      if (window.soundEngine) window.soundEngine.playSuccess();
      
      // Time-based scoring: 100 Base + (timer remaining * 10) Speed Bonus
      const timeBonus = this.timer * 10;
      const earnedScore = 100 + timeBonus;
      this.game.addScore(earnedScore);
      
      this.showFeedback(true, `CORRECT! +${earnedScore} PTS`, `+100 Base • +${timeBonus} Speed Bonus (${this.timer}s remaining)\n\n${q.explanation}`);
    } else {
      if (selectedBtn) selectedBtn.classList.add('btn-wrong');
      if (correctBtn) correctBtn.classList.add('btn-correct');
      if (window.soundEngine) window.soundEngine.playError();

      this.showFeedback(false, "INCORRECT! Wrong Option Selected.", q.explanation);
    }
  }

  showFeedback(isSuccess, headline, explanation) {
    const card = document.getElementById('visual-feedback-card');
    if (!card) return;

    card.className = `feedback-card ${isSuccess ? 'feedback-success' : 'feedback-error'}`;
    card.innerHTML = `
      <div class="feedback-header">
        <span class="feedback-status-pill ${isSuccess ? 'pill-success' : 'pill-error'}">${isSuccess ? 'CORRECT' : 'INCORRECT'}</span>
        <h3 class="feedback-title">${headline}</h3>
      </div>
      <p class="feedback-explanation">${explanation}</p>
      <div class="feedback-actions">
        <button class="neon-btn btn-primary" onclick="window.game.round1.nextPuzzle()">
          ${this.currentIndex + 1 < this.questions.length ? 'NEXT PUZZLE' : 'FINISH ROUND 1'}
        </button>
      </div>
    `;
    card.classList.remove('hidden');
  }

  nextPuzzle() {
    this.loadQuestion(this.currentIndex + 1);
  }

  // Perks Execution in Round 1
  apply5050() {
    if (this.answered) return;
    const q = this.questions[this.currentIndex];
    const wrongIndices = [0, 1, 2, 3].filter(i => i !== q.correctIndex);
    // Shuffle and pick 2 to purge
    wrongIndices.sort(() => 0.5 - Math.random());
    this.purgedOptions = wrongIndices.slice(0, 2);

    this.purgedOptions.forEach(idx => {
      const btn = document.getElementById(`opt-btn-${idx}`);
      if (btn) {
        btn.classList.add('purged-option');
        btn.disabled = true;
      }
    });
    window.armoryStore.showFloatingHUDNotification("50/50 Purge Executed: 2 options eliminated.");
  }

  applyHint() {
    this.showingHint = true;
    const hintBox = document.getElementById('visual-hint-container');
    if (hintBox) hintBox.classList.remove('hidden');
    window.armoryStore.showFloatingHUDNotification("Diagnostic Hint Activated.");
  }

  applyFreeze() {
    this.freezeTimer(10);
    window.armoryStore.showFloatingHUDNotification("Timer Freeze: 10s added.");
  }

  finishRound() {
    this.stopTimer();
    this.game.showRoundCompletionModal(1);
  }

  escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

if (typeof window !== 'undefined') {
  window.Round1Visual = Round1Visual;
}
