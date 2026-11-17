(function () {
  'use strict';

  const bank = window.BUILVANTA_THINK_LAB_BANK;
  const root = document.querySelector('.think-lab');
  if (!root || !Array.isArray(bank)) return;

  const categories = [
    'English & Language',
    'General Studies',
    'World & Foreign Affairs',
    'Weather & Climate',
    'Science',
    'Nature & Environment',
    'Technology & AI',
    'Mathematics',
    'Arts & Culture',
    'Pattern Recognition',
    'Logical Reasoning',
    'Observation',
    'Creative Problem-Solving',
    'Quick Thinking'
  ];
  const randomCategory = 'Random Mix';
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const pointsForCorrect = 10;
  const timerSeconds = 30;
  const personalBestKey = 'builvantaThinkLabPersonalBestV1';
  const categoryDescriptions = {
    'Random Mix': 'A fresh blend from every corner of the Lab.',
    'English & Language': 'Play with words, meaning, grammar and the way ideas are expressed.',
    'General Studies': 'Explore useful ideas from everyday knowledge, society, history and the world around us.',
    'World & Foreign Affairs': 'Understand geography, global cooperation, diplomacy and how countries connect.',
    'Weather & Climate': 'Explore the forces behind weather and climate—not live forecasts.',
    'Science': 'Follow evidence across biology, chemistry, physics, Earth and space.',
    'Nature & Environment': 'Discover how plants, animals, habitats and ecosystems work together.',
    'Technology & AI': 'Explore digital life, computing, data, AI and responsible technology.',
    'Mathematics': 'Use numbers, patterns, geometry and practical reasoning to solve a problem.',
    'Arts & Culture': 'Wander through visual art, music, literature, architecture and creative traditions.',
    'Pattern Recognition': 'Spot sequences, structures and the small clues that reveal a pattern.',
    'Logical Reasoning': 'Connect clues carefully and work out what must be true.',
    'Observation': 'Look closely, notice details and make sense of what is in front of you.',
    'Creative Problem-Solving': 'Try a fresh angle and discover a useful way through a challenge.',
    'Quick Thinking': 'Explore everyday puzzles involving numbers, time, distance and decisions.'
  };

  const elements = {
    topicCount: document.getElementById('think-lab-topic-count'),
    questionCount: document.getElementById('think-lab-question-count'),
    setup: document.getElementById('think-lab-setup'),
    active: document.getElementById('think-lab-active'),
    feedbackView: document.getElementById('think-lab-feedback-view'),
    result: document.getElementById('think-lab-result'),
    category: document.getElementById('think-lab-category'),
    topicDescription: document.getElementById('think-lab-topic-description'),
    difficulty: document.getElementById('think-lab-difficulty'),
    length: document.getElementById('think-lab-length'),
    lengthDetail: document.getElementById('think-lab-length-detail'),
    timerChoice: document.getElementById('think-lab-timer'),
    bestSetup: document.getElementById('think-lab-best-setup'),
    setupMessage: document.getElementById('think-lab-setup-message'),
    start: document.getElementById('think-lab-start'),
    activeCategory: document.getElementById('think-lab-active-category'),
    activeDifficulty: document.getElementById('think-lab-active-difficulty'),
    roundNumber: document.getElementById('think-lab-round-number'),
    roundTotal: document.getElementById('think-lab-round-total'),
    progressTrack: document.getElementById('think-lab-progress-track'),
    progressFill: document.getElementById('think-lab-progress-fill'),
    runningScore: document.getElementById('think-lab-running-score'),
    sessionMode: document.getElementById('think-lab-session-mode'),
    timerWrap: document.getElementById('think-lab-timer-wrap'),
    timerValue: document.getElementById('think-lab-timer-value'),
    timerTrack: document.getElementById('think-lab-timer-track'),
    timerFill: document.getElementById('think-lab-timer-fill'),
    question: document.getElementById('think-lab-question-text'),
    visual: document.getElementById('think-lab-question-visual'),
    form: document.getElementById('think-lab-answer-form'),
    options: document.getElementById('think-lab-options'),
    formMessage: document.getElementById('think-lab-form-message'),
    feedback: document.getElementById('think-lab-feedback'),
    outcome: document.getElementById('think-lab-outcome'),
    feedbackTitle: document.getElementById('think-lab-feedback-title'),
    correctAnswer: document.getElementById('think-lab-correct-answer'),
    explanation: document.getElementById('think-lab-explanation'),
    earned: document.getElementById('think-lab-earned'),
    feedbackProgress: document.getElementById('think-lab-feedback-progress'),
    next: document.getElementById('think-lab-next'),
    exitReview: document.getElementById('think-lab-exit-review'),
    resultEyebrow: document.getElementById('think-lab-result-eyebrow'),
    resultTitle: document.getElementById('think-lab-result-title'),
    resultMessage: document.getElementById('think-lab-result-message'),
    correctCount: document.getElementById('think-lab-correct-count'),
    resultTotal: document.getElementById('think-lab-result-total'),
    sessionScore: document.getElementById('think-lab-session-score'),
    bestResult: document.getElementById('think-lab-best-result'),
    achievement: document.getElementById('think-lab-achievement'),
    reviewList: document.getElementById('think-lab-review-list'),
    replay: document.getElementById('think-lab-replay'),
    changeTopic: document.getElementById('think-lab-change-topic')
  };

  const validation = validateBank(bank);
  if (!validation.valid) {
    console.error('BUILVANTA Think Lab bank validation failed:', validation.errors);
    elements.start.disabled = true;
    elements.setupMessage.textContent = 'The question collection is being refreshed. Please try again later.';
    return;
  }

  let queue = [];
  let sessionIndex = 0;
  let activeQuestion = null;
  let sessionScore = 0;
  let correctCount = 0;
  let responses = [];
  let timerDeadline = 0;
  let timerHandle = null;
  let personalBest = loadBest();
  let lastSettings = null;

  function validateBank(items) {
    const errors = [];
    const ids = new Set();
    const presentCategories = new Set(items.map((item) => item.category));
    for (const category of categories) {
      if (!presentCategories.has(category)) errors.push(`Missing category: ${category}`);
    }
    for (const item of items) {
      if (!item.id || ids.has(item.id)) errors.push(`Missing or duplicate ID: ${item.id || '(empty)'}`);
      ids.add(item.id);
      if (!categories.includes(item.category)) errors.push(`Unknown category: ${item.id}`);
      if (!difficulties.includes(item.difficulty)) errors.push(`Unknown difficulty: ${item.id}`);
      if (typeof item.prompt !== 'string' || !item.prompt.trim() || typeof item.explanation !== 'string' || !item.explanation.trim()) errors.push(`Missing prompt or explanation: ${item.id}`);
      if (!Array.isArray(item.choices) || item.choices.length !== 4 || new Set(item.choices).size !== 4 || !item.choices.includes(item.answer)) errors.push(`Invalid choices or answer: ${item.id}`);
    }
    for (const category of categories) {
      const categoryItems = items.filter((item) => item.category === category);
      if (categoryItems.length !== 10) errors.push(`${category} has ${categoryItems.length} questions, not 10.`);
      const expected = { Easy: 3, Medium: 4, Hard: 3 };
      for (const difficulty of difficulties) {
        const count = categoryItems.filter((item) => item.difficulty === difficulty).length;
        if (count !== expected[difficulty]) errors.push(`${category} has ${count} ${difficulty} questions; expected ${expected[difficulty]}.`);
      }
    }
    return { valid: errors.length === 0, errors };
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

  function filteredPool() {
    const category = elements.category.value;
    const difficulty = elements.difficulty.value;
    return bank.filter((item) => (category === randomCategory || item.category === category) && (difficulty === 'Mixed' || item.difficulty === difficulty));
  }

  function effectiveQuestionCount(pool = filteredPool()) {
    const requested = Number.parseInt(elements.length.value, 10) || 5;
    return Math.min(requested, pool.length);
  }

  function updateSetup() {
    const category = elements.category.value;
    const pool = filteredPool();
    const requested = Number.parseInt(elements.length.value, 10) || 5;
    const actual = effectiveQuestionCount(pool);
    elements.topicDescription.textContent = categoryDescriptions[category] || categoryDescriptions[randomCategory];
    elements.lengthDetail.textContent = pool.length < requested
      ? `This level has ${pool.length} questions in this topic, so your set adjusts to ${actual}.`
      : `${actual} questions, chosen without repeats.`;
    elements.bestSetup.textContent = String(personalBest);
    elements.topicCount.textContent = String(categories.length);
    elements.questionCount.textContent = String(bank.length);
    elements.setupMessage.textContent = '';
    elements.start.disabled = actual < 1;
  }

  function showView(view) {
    elements.setup.hidden = view !== 'setup';
    elements.active.hidden = view !== 'active';
    elements.feedbackView.hidden = view !== 'feedback';
    elements.result.hidden = view !== 'result';
  }

  function shuffle(items) {
    const copy = items.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function startSession() {
    stopTimer();
    const pool = filteredPool();
    const count = effectiveQuestionCount(pool);
    if (!count) {
      elements.setupMessage.textContent = 'There are no questions in that combination yet. Choose another topic or level.';
      return;
    }
    lastSettings = {
      category: elements.category.value,
      difficulty: elements.difficulty.value,
      length: elements.length.value,
      timer: elements.timerChoice.checked
    };
    queue = shuffle(pool).slice(0, count);
    sessionIndex = 0;
    sessionScore = 0;
    correctCount = 0;
    responses = [];
    beginQuestion();
  }

  function beginQuestion() {
    if (sessionIndex >= queue.length) {
      finishSession();
      return;
    }
    activeQuestion = queue[sessionIndex];
    const total = queue.length;
    elements.activeCategory.textContent = activeQuestion.category;
    elements.activeDifficulty.textContent = activeQuestion.difficulty;
    elements.roundNumber.textContent = String(sessionIndex + 1);
    elements.roundTotal.textContent = String(total);
    elements.runningScore.textContent = String(sessionScore);
    elements.sessionMode.textContent = lastSettings && lastSettings.timer ? 'Optional timer on · take a breath between questions.' : 'No rush · take a moment to think.';
    elements.progressTrack.setAttribute('aria-valuemax', String(total));
    elements.progressTrack.setAttribute('aria-valuenow', String(sessionIndex));
    elements.progressFill.style.width = `${(sessionIndex / total) * 100}%`;
    elements.question.textContent = activeQuestion.prompt;
    if (activeQuestion.visual) {
      elements.visual.textContent = activeQuestion.visual;
      elements.visual.hidden = false;
      elements.visual.setAttribute('aria-label', 'Question display: ' + activeQuestion.visual.replace(/\n/g, ', '));
    } else {
      elements.visual.textContent = '';
      elements.visual.hidden = true;
      elements.visual.removeAttribute('aria-label');
    }
    elements.options.replaceChildren();
    elements.formMessage.textContent = '';
    shuffle(activeQuestion.choices).forEach((choice, index) => {
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
    elements.timerWrap.hidden = !lastSettings.timer;
    elements.timerWrap.classList.remove('is-low');
    showView('active');
    if (lastSettings.timer) startTimer();
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
    elements.timerWrap.classList.toggle('is-low', secondsLeft <= 8);
    if (milliseconds <= 0) finishAnswer(null, true);
  }

  function stopTimer() {
    if (timerHandle !== null) {
      window.clearInterval(timerHandle);
      timerHandle = null;
    }
  }

  function finishAnswer(selectedAnswer, timedOut) {
    if (!activeQuestion || elements.active.hidden) return;
    if (!timedOut && lastSettings.timer && Date.now() >= timerDeadline) timedOut = true;
    stopTimer();
    const correct = !timedOut && selectedAnswer === activeQuestion.answer;
    const earned = correct ? pointsForCorrect : 0;
    if (correct) correctCount += 1;
    sessionScore += earned;
    if (sessionScore > personalBest) {
      personalBest = sessionScore;
      saveBest(personalBest);
      elements.bestSetup.textContent = String(personalBest);
    }
    responses[sessionIndex] = { question: activeQuestion, selectedAnswer, correct, timedOut };
    elements.options.querySelectorAll('input').forEach((input) => { input.disabled = true; });
    elements.feedback.classList.toggle('is-correct', correct);
    elements.feedback.classList.toggle('is-incorrect', !correct);
    if (timedOut) {
      elements.outcome.textContent = 'TIME RAN OUT · KEEP THE IDEA';
      elements.feedbackTitle.textContent = 'There is always another way in.';
    } else if (correct) {
      elements.outcome.textContent = 'YOU FOUND IT · +10 POINTS';
      elements.feedbackTitle.textContent = 'Well spotted.';
    } else {
      elements.outcome.textContent = 'NOT QUITE · NOTHING TAKEN AWAY';
      elements.feedbackTitle.textContent = 'A useful new idea to keep.';
    }
    elements.correctAnswer.textContent = activeQuestion.answer;
    elements.explanation.textContent = activeQuestion.explanation;
    elements.earned.textContent = `+${earned} ${earned === 1 ? 'point' : 'points'}`;
    elements.feedbackProgress.textContent = `Question ${sessionIndex + 1} of ${queue.length}`;
    elements.next.querySelector('span:first-child').textContent = sessionIndex + 1 >= queue.length ? 'SEE WHAT I DISCOVERED' : 'CONTINUE EXPLORING';
    showView('feedback');
    requestAnimationFrame(() => elements.feedback.focus({ preventScroll: true }));
  }

  function submitAnswer(event) {
    event.preventDefault();
    if (!activeQuestion || elements.active.hidden) return;
    if (lastSettings.timer && Date.now() >= timerDeadline) {
      finishAnswer(null, true);
      return;
    }
    const selected = elements.form.querySelector('input[name="think-lab-answer"]:checked');
    if (!selected) {
      elements.formMessage.textContent = 'Choose one answer when you are ready.';
      const first = elements.options.querySelector('input');
      if (first) first.focus();
      return;
    }
    elements.formMessage.textContent = '';
    finishAnswer(selected.value, false);
  }

  function appendTextLine(parent, label, value) {
    const line = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = label;
    line.append(strong, document.createTextNode(` ${value}`));
    parent.append(line);
  }

  function renderReview() {
    elements.reviewList.replaceChildren();
    responses.forEach((response, index) => {
      const item = document.createElement('article');
      item.className = 'think-lab-review-item';
      const top = document.createElement('div');
      top.className = 'think-lab-review-item__top';
      const topic = document.createElement('span');
      topic.textContent = `${response.question.category} · ${response.question.difficulty}`;
      const status = document.createElement('span');
      status.className = `think-lab-review-item__status${response.correct ? '' : ' is-missed'}`;
      status.textContent = response.correct ? 'FOUND' : response.timedOut ? 'TIME RAN OUT' : 'NEW IDEA';
      top.append(topic, status);
      const heading = document.createElement('h5');
      heading.textContent = `${String(index + 1).padStart(2, '0')} · ${response.question.prompt}`;
      item.append(top, heading);
      if (response.question.visual) {
        const visual = document.createElement('pre');
        visual.className = 'think-lab-review-item__visual';
        visual.textContent = response.question.visual;
        item.append(visual);
      }
      appendTextLine(item, 'Your answer:', response.selectedAnswer || 'No answer submitted');
      appendTextLine(item, 'Answer:', response.question.answer);
      appendTextLine(item, 'Why:', response.question.explanation);
      elements.reviewList.append(item);
    });
  }

  function finishSession() {
    stopTimer();
    activeQuestion = null;
    const total = responses.length;
    const accuracy = total ? Math.round((correctCount / total) * 100) : 0;
    elements.resultEyebrow.textContent = `${elements.category.value === randomCategory ? 'RANDOM MIX' : elements.category.value.toUpperCase()} · EXPLORATION COMPLETE`;
    if (accuracy === 100) {
      elements.resultTitle.textContent = 'A brilliant round of discovery.';
      elements.resultMessage.textContent = 'You found every answer. Keep following the questions that make you curious.';
      elements.achievement.textContent = 'Your curiosity carried you all the way through.';
    } else if (accuracy >= 60) {
      elements.resultTitle.textContent = 'You made thoughtful connections.';
      elements.resultMessage.textContent = 'Every question added another idea to your toolkit. Take a look back at what you uncovered.';
      elements.achievement.textContent = `${accuracy}% of the answers found · ${pointsForCorrect} points for each correct answer.`;
    } else {
      elements.resultTitle.textContent = 'Curiosity is a great place to start.';
      elements.resultMessage.textContent = 'The explanations are yours to keep. Explore a new topic whenever you are ready.';
      elements.achievement.textContent = `${accuracy}% of the answers found · every question is a new starting point.`;
    }
    elements.correctCount.textContent = String(correctCount);
    elements.resultTotal.textContent = String(total);
    elements.sessionScore.textContent = String(sessionScore);
    elements.bestResult.textContent = String(personalBest);
    renderReview();
    showView('result');
    requestAnimationFrame(() => elements.resultTitle.focus({ preventScroll: true }));
  }

  function continueSession() {
    stopTimer();
    if (sessionIndex + 1 >= queue.length) {
      finishSession();
      return;
    }
    sessionIndex += 1;
    beginQuestion();
  }

  function backToSetup(focusTopic) {
    stopTimer();
    activeQuestion = null;
    showView('setup');
    updateSetup();
    if (focusTopic) requestAnimationFrame(() => elements.category.focus({ preventScroll: true }));
  }

  elements.category.addEventListener('change', updateSetup);
  elements.difficulty.addEventListener('change', updateSetup);
  elements.length.addEventListener('change', updateSetup);
  elements.timerChoice.addEventListener('change', () => {
    elements.timerChoice.setAttribute('aria-label', elements.timerChoice.checked ? 'Use an optional 30-second timer per question' : 'Explore without a timer');
  });
  elements.start.addEventListener('click', startSession);
  elements.form.addEventListener('submit', submitAnswer);
  elements.options.addEventListener('change', () => { elements.formMessage.textContent = ''; });
  elements.next.addEventListener('click', continueSession);
  elements.exitReview.addEventListener('click', () => backToSetup(true));
  elements.changeTopic.addEventListener('click', () => backToSetup(true));
  elements.replay.addEventListener('click', startSession);

  updateSetup();
}());
