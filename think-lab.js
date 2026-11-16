(function () {
  'use strict';

  const bank = window.BUILVANTA_THINK_LAB_BANK;
  const root = document.querySelector('.think-lab');
  if (!root || !Array.isArray(bank)) return;

  const categories = [
    'Pattern Recognition',
    'Logical Reasoning',
    'Observation',
    'Creative Problem-Solving',
    'Quick Thinking'
  ];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const pointsForCorrect = 10;
  const quickBonus = 5;
  const bonusWindowSeconds = 15;
  const timerSeconds = 45;
  const personalBestKey = 'builvantaThinkLabPersonalBestV1';

  const elements = {
    open: document.getElementById('think-lab-open'),
    game: document.getElementById('think-lab-game'),
    close: document.getElementById('think-lab-close'),
    setup: document.getElementById('think-lab-setup'),
    active: document.getElementById('think-lab-active'),
    result: document.getElementById('think-lab-result'),
    heading: document.getElementById('think-lab-game-heading'),
    category: document.getElementById('think-lab-category'),
    date: document.getElementById('think-lab-date'),
    difficulty: document.getElementById('think-lab-difficulty'),
    timerChoice: document.getElementById('think-lab-timer'),
    bestSetup: document.getElementById('think-lab-best-setup'),
    start: document.getElementById('think-lab-start'),
    activeCategory: document.getElementById('think-lab-active-category'),
    activeDifficulty: document.getElementById('think-lab-active-difficulty'),
    roundNumber: document.getElementById('think-lab-round-number'),
    timerWrap: document.getElementById('think-lab-timer-wrap'),
    timerValue: document.getElementById('think-lab-timer-value'),
    timerTrack: document.getElementById('think-lab-timer-track'),
    timerFill: document.getElementById('think-lab-timer-fill'),
    question: document.getElementById('think-lab-question-text'),
    visual: document.getElementById('think-lab-question-visual'),
    form: document.getElementById('think-lab-answer-form'),
    options: document.getElementById('think-lab-options'),
    formMessage: document.getElementById('think-lab-form-message'),
    submit: document.getElementById('think-lab-submit'),
    resultCategory: document.getElementById('think-lab-result-category'),
    resultDifficulty: document.getElementById('think-lab-result-difficulty'),
    feedback: document.getElementById('think-lab-feedback'),
    outcome: document.getElementById('think-lab-outcome'),
    resultTitle: document.getElementById('think-lab-result-title'),
    correctAnswer: document.getElementById('think-lab-correct-answer'),
    explanation: document.getElementById('think-lab-explanation'),
    earned: document.getElementById('think-lab-earned'),
    sessionScore: document.getElementById('think-lab-session-score'),
    bestResult: document.getElementById('think-lab-best-result'),
    achievement: document.getElementById('think-lab-achievement'),
    next: document.getElementById('think-lab-next'),
    return: document.getElementById('think-lab-return')
  };

  const validation = validateBank(bank);
  if (!validation.valid) {
    console.error('BUILVANTA Think Lab puzzle bank is invalid:', validation.errors);
    elements.open.disabled = true;
    elements.open.setAttribute('aria-label', 'Think Lab is temporarily unavailable');
    return;
  }

  let roundOffset = 0;
  let roundNumber = 1;
  let activePuzzle = null;
  let startedAt = 0;
  let timerDeadline = 0;
  let timerHandle = null;
  let dailyRefreshHandle = null;
  let sessionScore = 0;
  let personalBest = loadBest();

  function validateBank(puzzles) {
    const errors = [];
    const ids = new Set();
    for (const puzzle of puzzles) {
      if (!puzzle.id || ids.has(puzzle.id)) errors.push(`Missing or duplicate ID: ${puzzle.id || '(empty)'}`);
      ids.add(puzzle.id);
      if (!categories.includes(puzzle.category)) errors.push(`Unknown category: ${puzzle.id}`);
      if (!difficulties.includes(puzzle.difficulty)) errors.push(`Unknown difficulty: ${puzzle.id}`);
      if (!puzzle.prompt || !puzzle.explanation || puzzle.points !== pointsForCorrect) errors.push(`Missing prompt, explanation or base points: ${puzzle.id}`);
      if (!Array.isArray(puzzle.choices) || puzzle.choices.length !== 4 || new Set(puzzle.choices).size !== 4 || !puzzle.choices.includes(puzzle.answer)) errors.push(`Invalid options or answer: ${puzzle.id}`);
    }
    for (const category of categories) {
      const categoryPuzzles = puzzles.filter((puzzle) => puzzle.category === category);
      if (categoryPuzzles.length !== 10) errors.push(`${category} has ${categoryPuzzles.length} puzzles, not 10.`);
      for (const difficulty of difficulties) {
        const count = categoryPuzzles.filter((puzzle) => puzzle.difficulty === difficulty).length;
        if (count < 1) errors.push(`${category} has no ${difficulty} puzzles.`);
      }
    }
    return { valid: errors.length === 0, errors };
  }

  function positiveModulo(number, divisor) {
    return ((number % divisor) + divisor) % divisor;
  }

  function loadBest() {
    try {
      const value = Number(window.localStorage.getItem(personalBestKey));
      return Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0;
    } catch (_) {
      return 0;
    }
  }

  function saveBest(value) {
    try {
      window.localStorage.setItem(personalBestKey, String(value));
    } catch (_) {
      // The game remains playable if this browser blocks local storage.
    }
  }

  function currentDayNumber(now = new Date()) {
    return Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
  }

  function categoryForRound(dayNumber = currentDayNumber()) {
    return categories[positiveModulo(dayNumber + roundOffset, categories.length)];
  }

  function puzzleForRound(category, difficulty, dayNumber = currentDayNumber()) {
    const pool = bank.filter((puzzle) => puzzle.category === category && puzzle.difficulty === difficulty);
    if (!pool.length) return null;
    const rotation = Math.floor(dayNumber / categories.length) + roundOffset;
    return pool[positiveModulo(rotation, pool.length)];
  }

  function localDateLabel(now = new Date()) {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(now);
  }

  function refreshDailySetup() {
    if (!elements.game.hidden && !elements.setup.hidden) updateSetup();
  }

  function scheduleDailyRefresh() {
    if (dailyRefreshHandle !== null) window.clearTimeout(dailyRefreshHandle);
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 50);
    dailyRefreshHandle = window.setTimeout(() => {
      dailyRefreshHandle = null;
      refreshDailySetup();
      scheduleDailyRefresh();
    }, Math.max(100, nextMidnight.getTime() - now.getTime()));
  }

  function showView(view) {
    elements.setup.hidden = view !== 'setup';
    elements.active.hidden = view !== 'active';
    elements.result.hidden = view !== 'result';
  }

  function updateSetup(now = new Date()) {
    const dayNumber = currentDayNumber(now);
    elements.category.textContent = categoryForRound(dayNumber);
    elements.date.textContent = localDateLabel(now);
    elements.bestSetup.textContent = String(personalBest);
    elements.roundNumber.textContent = String(roundNumber);
  }

  function openGame() {
    elements.game.hidden = false;
    elements.open.setAttribute('aria-expanded', 'true');
    showView('setup');
    updateSetup();
    requestAnimationFrame(() => elements.heading.focus({ preventScroll: true }));
  }

  function closeGame() {
    stopTimer();
    elements.game.hidden = true;
    elements.open.setAttribute('aria-expanded', 'false');
    showView('setup');
    elements.open.focus({ preventScroll: true });
  }

  function startChallenge() {
    const now = new Date();
    const dayNumber = currentDayNumber(now);
    updateSetup(now);
    activePuzzle = puzzleForRound(categoryForRound(dayNumber), elements.difficulty.value, dayNumber);
    if (!activePuzzle) return;
    elements.activeCategory.textContent = activePuzzle.category;
    elements.activeDifficulty.textContent = activePuzzle.difficulty;
    elements.roundNumber.textContent = String(roundNumber);
    elements.question.textContent = activePuzzle.prompt;
    if (activePuzzle.visual) {
      elements.visual.textContent = activePuzzle.visual;
      elements.visual.hidden = false;
      elements.visual.setAttribute('aria-label', 'Puzzle display: ' + activePuzzle.visual.replace(/\n/g, ', '));
    } else {
      elements.visual.textContent = '';
      elements.visual.hidden = true;
      elements.visual.removeAttribute('aria-label');
    }
    elements.options.replaceChildren();
    elements.formMessage.textContent = '';
    activePuzzle.choices.forEach((choice, index) => {
      const label = document.createElement('label');
      label.className = 'think-lab-option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'think-lab-answer';
      input.value = choice;
      input.id = `think-lab-answer-${index}`;
      const marker = document.createElement('span');
      marker.className = 'think-lab-option__radio';
      marker.setAttribute('aria-hidden', 'true');
      const letter = document.createElement('span');
      letter.className = 'think-lab-option__letter';
      letter.setAttribute('aria-hidden', 'true');
      letter.textContent = String.fromCharCode(65 + index);
      const text = document.createElement('span');
      text.className = 'think-lab-option__text';
      text.textContent = choice;
      label.append(input, marker, letter, text);
      elements.options.append(label);
    });
    showView('active');
    elements.timerWrap.hidden = !elements.timerChoice.checked;
    elements.timerWrap.classList.remove('is-low');
    startedAt = performance.now();
    if (elements.timerChoice.checked) startTimer();
    requestAnimationFrame(() => elements.question.focus({ preventScroll: true }));
  }

  function startTimer() {
    stopTimer();
    timerDeadline = Date.now() + timerSeconds * 1000;
    updateTimer();
    timerHandle = window.setInterval(updateTimer, 200);
  }

  function updateTimer() {
    const milliseconds = Math.max(0, timerDeadline - Date.now());
    const secondsLeft = Math.ceil(milliseconds / 1000);
    elements.timerValue.textContent = String(secondsLeft);
    elements.timerValue.setAttribute('aria-label', `${secondsLeft} ${secondsLeft === 1 ? 'second' : 'seconds'} remaining`);
    elements.timerTrack.setAttribute('aria-valuenow', String(secondsLeft));
    elements.timerFill.style.width = `${Math.max(0, milliseconds / (timerSeconds * 1000) * 100)}%`;
    elements.timerWrap.classList.toggle('is-low', secondsLeft <= 10);
    if (milliseconds <= 0) finishAnswer(null, true);
  }

  function stopTimer() {
    if (timerHandle !== null) {
      window.clearInterval(timerHandle);
      timerHandle = null;
    }
  }

  function achievementFor(score) {
    if (score >= 75) return 'Master Builder';
    if (score >= 50) return 'Problem Solver';
    if (score >= 25) return 'Sharp Thinker';
    return 'Curious Mind';
  }

  function finishAnswer(selectedAnswer, timedOut) {
    if (!activePuzzle || !elements.result.hidden) return;
    if (!timedOut && elements.timerChoice.checked && Date.now() >= timerDeadline) timedOut = true;
    stopTimer();
    const correct = !timedOut && selectedAnswer === activePuzzle.answer;
    const elapsedSeconds = (performance.now() - startedAt) / 1000;
    const earned = correct ? activePuzzle.points + (elapsedSeconds <= bonusWindowSeconds ? quickBonus : 0) : 0;
    sessionScore += earned;
    if (sessionScore > personalBest) {
      personalBest = sessionScore;
      saveBest(personalBest);
    }

    document.querySelectorAll('input[name="think-lab-answer"]').forEach((input) => { input.disabled = true; });
    elements.resultCategory.textContent = activePuzzle.category;
    elements.resultDifficulty.textContent = activePuzzle.difficulty;
    elements.feedback.classList.toggle('is-correct', correct);
    elements.feedback.classList.toggle('is-incorrect', !correct);
    if (timedOut) {
      elements.outcome.textContent = 'TIME IS UP · NO POINTS THIS ROUND';
      elements.resultTitle.textContent = 'The thinking still counts.';
    } else if (correct) {
      elements.outcome.textContent = earned > activePuzzle.points ? 'CORRECT · QUICK-THINKING BONUS EARNED' : 'CORRECT ANSWER';
      elements.resultTitle.textContent = 'Well reasoned.';
    } else {
      elements.outcome.textContent = 'NOT QUITE · NO POINTS DEDUCTED';
      elements.resultTitle.textContent = 'A new way to see it.';
    }
    elements.correctAnswer.textContent = activePuzzle.answer;
    elements.explanation.textContent = activePuzzle.explanation;
    elements.earned.textContent = `+${earned}`;
    elements.sessionScore.textContent = String(sessionScore);
    elements.bestResult.textContent = String(personalBest);
    elements.achievement.textContent = `Session title: ${achievementFor(sessionScore)}`;
    showView('result');
    requestAnimationFrame(() => elements.feedback.focus({ preventScroll: true }));
  }

  function submitAnswer(event) {
    event.preventDefault();
    if (!activePuzzle || !elements.result.hidden) return;
    if (elements.timerChoice.checked && Date.now() >= timerDeadline) {
      finishAnswer(null, true);
      return;
    }
    const selected = elements.form.querySelector('input[name="think-lab-answer"]:checked');
    if (!selected) {
      elements.formMessage.textContent = 'Choose one answer before submitting.';
      const first = elements.options.querySelector('input');
      if (first) first.focus();
      return;
    }
    elements.formMessage.textContent = '';
    finishAnswer(selected.value, false);
  }

  function nextChallenge() {
    stopTimer();
    roundOffset += 1;
    roundNumber += 1;
    activePuzzle = null;
    showView('setup');
    updateSetup();
    requestAnimationFrame(() => elements.heading.focus({ preventScroll: true }));
  }

  elements.open.addEventListener('click', openGame);
  elements.close.addEventListener('click', closeGame);
  elements.return.addEventListener('click', closeGame);
  elements.start.addEventListener('click', startChallenge);
  elements.form.addEventListener('submit', submitAnswer);
  elements.next.addEventListener('click', nextChallenge);
  elements.options.addEventListener('change', () => { elements.formMessage.textContent = ''; });
  elements.difficulty.addEventListener('change', () => updateSetup());
  elements.timerChoice.addEventListener('change', () => {
    elements.timerChoice.setAttribute('aria-label', elements.timerChoice.checked ? 'Use optional 45-second timer' : 'Play without a timer');
  });
  elements.return.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeGame();
  });

  function syncDailyRotation() {
    refreshDailySetup();
    scheduleDailyRefresh();
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) syncDailyRotation();
  });
  window.addEventListener('focus', syncDailyRotation);

  updateSetup();
  scheduleDailyRefresh();
}());
