const WORDS = [
  {
    word: "Diet Coke",
    speak: "Diet Coke",
    pos: "名词短语",
    ipa: "/ˈdaɪət koʊk/",
    phonetic: "代儿特 口克",
    syllables: "di-e-t co-ke",
    meanings: ["无糖可乐"],
    examples: [
      ["Do you like Diet Coke?", "你喜欢无糖可乐吗？"],
      ["Can you get me a Diet Coke?", "你能给我一瓶无糖可乐吗？"],
      ["I want to drink Diet Coke.", "我想喝无糖可乐。"]
    ]
  },
  {
    word: "(do the) laundry",
    speak: "do the laundry",
    pos: "动词短语",
    ipa: "/du ðə ˈlɔːndri/",
    phonetic: "(do the) 隆追",
    syllables: "(do the) laun-dry",
    meanings: ["洗衣服"],
    examples: [
      ["I do the laundry at home.", "我在家洗衣服。"],
      ["I need to do the laundry tonight.", "我今晚需要洗衣服。"],
      ["Did you do the laundry?", "你洗衣服了吗？"]
    ]
  },
  {
    word: "lighter",
    pos: "名词",
    ipa: "/ˈlaɪtər/",
    phonetic: "赖特儿",
    syllables: "ligh-ter",
    meanings: ["打火机"],
    examples: [
      ["This is a lighter.", "这是一个打火机。"],
      ["Can you give me a lighter?", "你能给我一个打火机吗？"],
      ["I can't find my lighter.", "我找不到我的打火机。"]
    ],
    note: "相关词：light 作动词时表示“点燃 / 点亮”。"
  },
  {
    word: "ashtray",
    pos: "名词",
    ipa: "/ˈæʃtreɪ/",
    phonetic: "æ时吹",
    syllables: "a-sh-tray",
    meanings: ["烟灰缸"],
    examples: [
      ["The ashtray is black.", "这个烟灰缸是黑色的。"],
      ["Please give me an ashtray.", "请给我一个烟灰缸。"],
      ["There is an ashtray on the table.", "桌上有一个烟灰缸。"]
    ]
  },
  {
    word: "pen",
    pos: "名词",
    ipa: "/pen/",
    phonetic: "pen",
    syllables: "pen",
    meanings: ["笔"],
    examples: [
      ["My pen is small.", "我的笔很小。"],
      ["Can you give me a pen?", "你能给我一支笔吗？"],
      ["I don't have a pen.", "我没有一支笔。"]
    ]
  },
  {
    word: "breakfast",
    pos: "名词",
    ipa: "/ˈbrekfəst/",
    phonetic: "布ruei克 佛斯特",
    syllables: "break-fast",
    meanings: ["早餐"],
    examples: [
      ["I eat breakfast at 8.", "我八点吃早餐。"],
      ["What time do we have breakfast?", "我们几点吃早餐？"],
      ["I didn't have breakfast this morning.", "我今早没吃早餐。"]
    ]
  },
  {
    word: "lunch",
    pos: "名词",
    ipa: "/lʌntʃ/",
    phonetic: "烂吃",
    syllables: "lun-ch",
    meanings: ["午餐"],
    examples: [
      ["We have lunch here.", "我们在这里吃午餐。"],
      ["What time do you want to have lunch?", "你想几点吃午餐？"],
      ["I had lunch just now.", "我刚刚吃了午餐。"]
    ]
  },
  {
    word: "dinner",
    pos: "名词",
    ipa: "/ˈdɪnər/",
    phonetic: "滴呢儿",
    syllables: "di-nner",
    meanings: ["晚餐"],
    examples: [
      ["They cook dinner together.", "他们一起做晚餐。"],
      ["Let's have dinner together.", "我们一起吃晚餐吧。"],
      ["I am cooking dinner.", "我正在煮晚餐。"]
    ]
  },
  {
    word: "clothes",
    pos: "名词",
    ipa: "/kloʊðz/",
    phonetic: "克漏思",
    syllables: "clo-thes",
    meanings: ["衣服"],
    examples: [
      ["These clothes are nice.", "这些衣服很好看。"],
      ["I need to buy some new clothes.", "我需要买一些新衣服。"],
      ["Do you like my clothes?", "你喜欢我的衣服吗？"]
    ]
  },
  {
    word: "check",
    pos: "名词 / 动词",
    ipa: "/tʃek/",
    phonetic: "check",
    syllables: "check",
    meanings: ["账单", "检查"],
    forms: [
      ["原形", "check"],
      ["进行时", "checking"],
      ["过去式 / 分词", "checked"]
    ],
    examples: [
      ["The check is here.", "账单在这里。"],
      ["I check my phone.", "我检查我的手机。"],
      ["I am checking my phone.", "我正在检查我的手机。"],
      ["I checked my phone.", "我检查了我的手机。"],
      ["Can I have the check, please?", "请问，我可以买单（要账单）吗？"],
      ["I did a quick check.", "我快速查了一下。（我做了一次快速的检查。）"],
      ["Let me check.", "让我查一下。"]
    ]
  }
];

const STORAGE_KEY = "vocabulary-lab-v2";
const TODAY_KEY = localDateKey(new Date());

const savedApp = loadApp();
const state = {
  mode: savedApp.mode === "chinese" ? "chinese" : "english",
  history: savedApp.history && typeof savedApp.history === "object" ? savedApp.history : {},
  session: normalizeSession(savedApp.session),
  calendarMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  selectedDayKey: TODAY_KEY
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const els = {
  studyView: $("#study-view"),
  progressLabel: $("#progress-label"),
  progressFill: $("#progress-fill"),
  pos: $("#part-of-speech"),
  attemptLabel: $("#attempt-label"),
  prompt: $("#study-prompt"),
  promptHint: $("#prompt-hint"),
  promptState: $("#prompt-state"),
  promptMark: $("#prompt-state .recall-mark"),
  promptTitle: $("#prompt-state strong"),
  promptNote: $("#prompt-state span:last-child"),
  answer: $("#answer-state"),
  answerKicker: $("#answer-kicker"),
  answerTitle: $("#answer-title"),
  counterpartLabel: $("#counterpart-label"),
  counterpartValue: $("#counterpart-value"),
  ipa: $("#ipa"),
  phonetic: $("#phonetic-cn"),
  syllables: $("#syllables"),
  formsSection: $("#forms-section"),
  forms: $("#word-forms"),
  examples: $("#examples"),
  exampleCount: $("#example-count"),
  related: $("#related-note"),
  ratingPanel: $("#rating-panel"),
  continuePanel: $("#continue-panel"),
  completionPanel: $("#completion-panel"),
  resultDot: $("#result-dot"),
  resultTitle: $("#result-title"),
  resultNote: $("#result-note"),
  nextCard: $("#next-card-button"),
  masteredLabel: $("#mastered-label"),
  queueLabel: $("#queue-label"),
  dots: $("#dot-indicator"),
  wordList: $("#word-list"),
  completed: $("#completed-count"),
  bars: $("#progress-bars"),
  firstStats: $("#first-rating-stats"),
  attemptTotal: $("#attempt-total"),
  calendarTitle: $("#calendar-title"),
  calendarGrid: $("#calendar-grid"),
  selectedDateLabel: $("#selected-date-label"),
  checkinStatus: $("#checkin-status"),
  dayStats: $("#day-rating-stats"),
  dayMastered: $("#day-mastered"),
  dayAttempts: $("#day-attempts"),
  toast: $("#toast")
};

function localDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createSession() {
  return {
    date: TODAY_KEY,
    current: 0,
    queue: WORDS.map((_, index) => index).slice(1),
    phase: "prompt",
    latestRatings: {},
    firstRatings: {},
    attempts: {},
    completed: [],
    startedAt: new Date().toISOString(),
    completedAt: null
  };
}

function normalizeSession(session) {
  if (!session || session.date !== TODAY_KEY) return createSession();
  const normalized = {
    date: TODAY_KEY,
    current: Number.isInteger(session.current) ? session.current : null,
    queue: Array.isArray(session.queue) ? session.queue.filter(validWordIndex) : [],
    phase: session.phase === "answer" ? "answer" : "prompt",
    latestRatings: cleanRatingMap(session.latestRatings),
    firstRatings: cleanRatingMap(session.firstRatings),
    attempts: cleanAttemptMap(session.attempts),
    completed: Array.isArray(session.completed) ? [...new Set(session.completed.filter(validWordIndex))] : [],
    startedAt: session.startedAt || new Date().toISOString(),
    completedAt: session.completedAt || null
  };

  if (normalized.completedAt) {
    normalized.current = null;
    normalized.queue = [];
    normalized.phase = "prompt";
    return normalized;
  }

  if (normalized.current === null) {
    if (normalized.queue.length) normalized.current = normalized.queue.shift();
    else return createSession();
  }
  return normalized;
}

function validWordIndex(value) {
  return Number.isInteger(value) && value >= 0 && value < WORDS.length;
}

function cleanRatingMap(map) {
  const clean = {};
  if (!map || typeof map !== "object") return clean;
  Object.entries(map).forEach(([key, value]) => {
    if (validWordIndex(Number(key)) && ["known", "fuzzy", "forgotten"].includes(value)) clean[key] = value;
  });
  return clean;
}

function cleanAttemptMap(map) {
  const clean = {};
  if (!map || typeof map !== "object") return clean;
  Object.entries(map).forEach(([key, value]) => {
    if (validWordIndex(Number(key)) && Number.isFinite(Number(value))) clean[key] = Math.max(0, Number(value));
  });
  return clean;
}

function loadApp() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveApp() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    mode: state.mode,
    history: state.history,
    session: state.session
  }));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);
}

function highlightTarget(sentence, word) {
  const targets = word === "(do the) laundry" ? ["do the laundry", "the laundry"] : [word];
  let result = escapeHtml(sentence);
  targets.sort((a, b) => b.length - a.length).forEach(target => {
    const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
  });
  if (word === "check") result = result.replace(/\b(checking|checked)\b/gi, "<mark>$1</mark>");
  return result;
}

function meaningText(item) {
  return item.meanings.join("；");
}

function ratingLabel(rating) {
  return ({ known: "认识", fuzzy: "模糊", forgotten: "忘记", unrated: "未判断" })[rating] || "未判断";
}

function getCounts(map) {
  const counts = { known: 0, fuzzy: 0, forgotten: 0 };
  Object.values(map || {}).forEach(value => {
    if (counts[value] !== undefined) counts[value] += 1;
  });
  return counts;
}

function totalAttempts(attempts) {
  return Object.values(attempts || {}).reduce((sum, value) => sum + Number(value || 0), 0);
}

function renderStudy() {
  const session = state.session;
  const mastered = session.completed.length;

  $$(".mode-button").forEach(button => {
    const active = button.dataset.mode === state.mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (session.completedAt) {
    renderCompletionState();
    renderDots();
    return;
  }

  const index = session.current;
  const item = WORDS[index];
  const attemptCount = session.attempts[index] || 0;
  const front = state.mode === "english" ? item.word : meaningText(item);

  els.progressLabel.textContent = `第 ${index + 1} / ${WORDS.length} 词`;
  els.progressFill.style.width = `${(mastered / WORDS.length) * 100}%`;
  els.pos.textContent = item.pos;
  els.attemptLabel.textContent = attemptCount === 0 ? "首次学习" : `第 ${attemptCount + 1} 次学习`;
  els.prompt.textContent = front;
  els.promptHint.textContent = state.mode === "english" ? "回想它的中文释义" : "回想它的英文表达";

  const isAnswer = session.phase === "answer";
  els.promptState.hidden = isAnswer;
  els.answer.hidden = !isAnswer;
  els.ratingPanel.hidden = isAnswer;
  els.continuePanel.hidden = !isAnswer;
  els.completionPanel.hidden = true;

  if (!isAnswer) {
    els.promptMark.textContent = "?";
    els.promptTitle.textContent = "这次记得怎么样？";
    els.promptNote.textContent = "先选择记忆状态，再查看答案";
  } else {
    renderAnswer(item);
    renderAnswerResult(session.latestRatings[index]);
  }

  const pending = session.queue.length + (isAnswer ? 0 : 1);
  els.masteredLabel.textContent = `已掌握 ${mastered} / ${WORDS.length}`;
  els.queueLabel.textContent = `待学习 ${pending} 词`;
  renderDots();
}

function renderAnswer(item) {
  const englishMode = state.mode === "english";
  els.answerKicker.textContent = englishMode ? "中文释义" : "英文词条";
  els.answerTitle.textContent = englishMode ? meaningText(item) : item.word;
  els.counterpartLabel.textContent = englishMode ? "英文词条" : "中文释义";
  els.counterpartValue.textContent = englishMode ? item.word : meaningText(item);
  els.ipa.textContent = item.ipa;
  els.phonetic.textContent = item.phonetic;
  els.syllables.textContent = item.syllables;

  els.formsSection.hidden = !item.forms;
  els.forms.innerHTML = item.forms
    ? item.forms.map(([label, form]) => `<div class="form-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(form)}</strong></div>`).join("")
    : "";

  els.exampleCount.textContent = `${item.examples.length} 句`;
  els.examples.innerHTML = item.examples.map(([english, chinese], index) => {
    const primary = englishMode ? highlightTarget(english, item.word) : escapeHtml(chinese);
    const secondary = englishMode ? escapeHtml(chinese) : highlightTarget(english, item.word);
    return `
      <article class="example-item">
        <p class="example-primary">${primary}</p>
        <p class="example-secondary">${secondary}</p>
        <button class="icon-button example-audio" type="button" data-example="${index}" aria-label="播放例句发音" title="播放例句发音">🔊</button>
      </article>`;
  }).join("");

  els.related.hidden = !item.note;
  els.related.textContent = item.note || "";
}

function renderAnswerResult(rating) {
  const result = {
    known: ["已掌握", "本词今日不再出现"],
    fuzzy: ["已记录为模糊", "本词已加入待复习队列"],
    forgotten: ["已记录为忘记", "本词已加入待复习队列"]
  }[rating];
  els.resultDot.className = `result-dot ${rating}`;
  els.resultTitle.textContent = result[0];
  els.resultNote.textContent = result[1];
  els.nextCard.innerHTML = state.session.queue.length ? "下一词 <span aria-hidden=\"true\">›</span>" : "完成学习 <span aria-hidden=\"true\">›</span>";
}

function renderCompletionState() {
  els.progressLabel.textContent = "今日完成";
  els.progressFill.style.width = "100%";
  els.pos.textContent = "10 个词";
  els.attemptLabel.textContent = "打卡成功";
  els.prompt.textContent = "今日已掌握";
  els.promptHint.textContent = "学习记录已保存";
  els.promptState.hidden = false;
  els.answer.hidden = true;
  els.promptMark.textContent = "✓";
  els.promptTitle.textContent = "今日学习完成";
  els.promptNote.textContent = "打卡日历已自动点亮";
  els.ratingPanel.hidden = true;
  els.continuePanel.hidden = true;
  els.completionPanel.hidden = false;
  els.masteredLabel.textContent = `已掌握 ${WORDS.length} / ${WORDS.length}`;
  els.queueLabel.textContent = "待学习 0 词";
}

function renderDots() {
  const session = state.session;
  els.dots.innerHTML = WORDS.map((_, index) => {
    const rating = session.completed.includes(index) ? "known" : session.latestRatings[index] || "";
    const classes = ["dot"];
    if (rating) classes.push(rating);
    if (!session.completedAt && index === session.current) classes.push("current");
    return `<span class="${classes.join(" ")}"></span>`;
  }).join("");
}

function rateCurrent(rating) {
  const session = state.session;
  if (session.completedAt || session.phase !== "prompt" || !validWordIndex(session.current)) return;
  const index = session.current;

  session.attempts[index] = (session.attempts[index] || 0) + 1;
  if (!session.firstRatings[index]) session.firstRatings[index] = rating;
  session.latestRatings[index] = rating;

  if (rating === "known") {
    if (!session.completed.includes(index)) session.completed.push(index);
    session.queue = session.queue.filter(value => value !== index);
  } else if (!session.queue.includes(index)) {
    session.queue.push(index);
  }

  session.phase = "answer";
  saveApp();
  renderStudy();
  showToast(`已记录：${ratingLabel(rating)}`);
}

function advanceSession() {
  const session = state.session;
  if (session.phase !== "answer") return;

  if (!session.queue.length) {
    finishSession();
    return;
  }

  session.current = session.queue.shift();
  session.phase = "prompt";
  saveApp();
  renderStudy();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function finishSession() {
  const session = state.session;
  if (session.completed.length !== WORDS.length) {
    const missing = WORDS.map((_, index) => index).filter(index => !session.completed.includes(index));
    session.queue.push(...missing.filter(index => !session.queue.includes(index)));
    session.current = session.queue.shift();
    session.phase = "prompt";
    saveApp();
    renderStudy();
    return;
  }

  session.completedAt = new Date().toISOString();
  session.current = null;
  session.queue = [];
  state.history[TODAY_KEY] = {
    completedAt: session.completedAt,
    firstRatings: { ...session.firstRatings },
    attempts: { ...session.attempts },
    mastered: WORDS.length,
    totalAttempts: totalAttempts(session.attempts)
  };
  state.selectedDayKey = TODAY_KEY;
  saveApp();
  renderStudy();
  renderProgress();
  renderCalendar();
  showToast("今日打卡成功");
}

function renderWordList() {
  const session = state.session;
  els.wordList.innerHTML = WORDS.map((item, index) => {
    const status = session.completed.includes(index) ? "known" : session.latestRatings[index] || "unrated";
    const attempts = session.attempts[index] || 0;
    return `
      <article class="word-list-button">
        <span class="word-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="word-list-copy"><strong>${escapeHtml(item.word)}</strong><span>${escapeHtml(meaningText(item))}</span></span>
        <span class="word-list-state"><span class="status-mark ${status}"></span>${attempts ? `${attempts}次` : "未学"}</span>
      </article>`;
  }).join("");
}

function renderProgress() {
  const session = state.session;
  const currentCounts = getCounts(session.latestRatings);
  const firstCounts = getCounts(session.firstRatings);
  els.completed.textContent = session.completed.length;

  const rows = [["known", "认识"], ["fuzzy", "模糊"], ["forgotten", "忘记"]];
  els.bars.innerHTML = rows.map(([key, label]) => `
    <div class="bar-row">
      <span class="bar-label">${label}</span>
      <span class="bar-track"><span class="bar-fill ${key}" style="width:${currentCounts[key] * 10}%"></span></span>
      <span class="bar-count">${currentCounts[key]}</span>
    </div>`).join("");

  els.firstStats.innerHTML = renderStatItems(firstCounts);
  els.attemptTotal.textContent = `已作答 ${totalAttempts(session.attempts)} 次`;
  $("#continue-button").textContent = session.completedAt ? "查看今日打卡" : "继续学习";
}

function renderStatItems(counts) {
  return [["known", "认识"], ["fuzzy", "模糊"], ["forgotten", "忘记"]]
    .map(([key, label]) => `<div class="stat-item ${key}"><strong>${counts[key]}</strong><span>${label}</span></div>`)
    .join("");
}

function renderCalendar() {
  const year = state.calendarMonth.getFullYear();
  const month = state.calendarMonth.getMonth();
  els.calendarTitle.textContent = `${year}年${month + 1}月`;

  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - mondayOffset);
  const days = [];

  for (let offset = 0; offset < 42; offset += 1) {
    const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + offset);
    const key = localDateKey(date);
    const classes = ["calendar-day"];
    if (date.getMonth() !== month) classes.push("outside");
    if (key === TODAY_KEY) classes.push("today");
    if (key === state.selectedDayKey) classes.push("selected");
    if (state.history[key]) classes.push("checked");
    days.push(`<button class="${classes.join(" ")}" type="button" data-date="${key}" aria-label="${date.getMonth() + 1}月${date.getDate()}日${state.history[key] ? "已打卡" : ""}">${date.getDate()}${state.history[key] ? '<span class="check-mark">✓</span>' : ""}</button>`);
  }

  els.calendarGrid.innerHTML = days.join("");
  renderDaySummary();
}

function renderDaySummary() {
  const [year, month, day] = state.selectedDayKey.split("-").map(Number);
  const isToday = state.selectedDayKey === TODAY_KEY;
  const historyEntry = state.history[state.selectedDayKey];
  const entry = historyEntry || (isToday ? {
    firstRatings: state.session.firstRatings,
    attempts: state.session.attempts,
    mastered: state.session.completed.length,
    totalAttempts: totalAttempts(state.session.attempts)
  } : null);

  els.selectedDateLabel.textContent = isToday ? "今日记录" : `${month}月${day}日记录`;
  els.checkinStatus.textContent = historyEntry ? "已打卡" : (isToday ? "学习中" : "未打卡");
  els.dayStats.innerHTML = renderStatItems(getCounts(entry?.firstRatings || {}));
  els.dayMastered.textContent = `${entry?.mastered || 0} / ${WORDS.length}`;
  els.dayAttempts.textContent = `${entry?.totalAttempts ?? totalAttempts(entry?.attempts || {})} 次`;
}

function changeCalendarMonth(delta) {
  state.calendarMonth = new Date(state.calendarMonth.getFullYear(), state.calendarMonth.getMonth() + delta, 1);
  renderCalendar();
}

function selectCalendarDay(key) {
  state.selectedDayKey = key;
  const [year, month] = key.split("-").map(Number);
  if (year !== state.calendarMonth.getFullYear() || month - 1 !== state.calendarMonth.getMonth()) {
    state.calendarMonth = new Date(year, month - 1, 1);
  }
  renderCalendar();
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    showToast("当前浏览器不支持语音播放");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.82;
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices.find(voice => voice.lang === "en-US") || voices.find(voice => voice.lang.startsWith("en")) || null;
  window.speechSynthesis.speak(utterance);
}

function switchView(id) {
  $$(".view").forEach(view => view.classList.toggle("active", view.id === id));
  $$(".nav-button").forEach(button => {
    const active = button.dataset.view === id;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  if (id === "study-view") renderStudy();
  if (id === "words-view") renderWordList();
  if (id === "progress-view") renderProgress();
  if (id === "checkin-view") renderCalendar();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 1600);
}

$$(".mode-button").forEach(button => button.addEventListener("click", () => {
  state.mode = button.dataset.mode;
  saveApp();
  renderStudy();
}));

$$(".rating-button").forEach(button => button.addEventListener("click", () => rateCurrent(button.dataset.rating)));
els.nextCard.addEventListener("click", advanceSession);
$("#word-audio").addEventListener("click", () => {
  if (validWordIndex(state.session.current)) speak(WORDS[state.session.current].speak || WORDS[state.session.current].word);
});

els.examples.addEventListener("click", event => {
  const button = event.target.closest("[data-example]");
  if (!button || !validWordIndex(state.session.current)) return;
  speak(WORDS[state.session.current].examples[Number(button.dataset.example)][0]);
});

$$(".nav-button").forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));
$("#continue-button").addEventListener("click", () => switchView(state.session.completedAt ? "checkin-view" : "study-view"));
$("#open-checkin-button").addEventListener("click", () => switchView("checkin-view"));
$("#previous-month").addEventListener("click", () => changeCalendarMonth(-1));
$("#next-month").addEventListener("click", () => changeCalendarMonth(1));
els.calendarGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-date]");
  if (button) selectCalendarDay(button.dataset.date);
});

$("#reset-button").addEventListener("click", () => {
  if (!confirm("确定清空今天的学习和打卡记录吗？")) return;
  state.session = createSession();
  delete state.history[TODAY_KEY];
  state.selectedDayKey = TODAY_KEY;
  saveApp();
  renderStudy();
  renderProgress();
  renderCalendar();
  showToast("今日学习记录已清空");
});

document.addEventListener("keydown", event => {
  if (!$(".view.active")?.matches("#study-view") || state.session.phase !== "prompt") return;
  if (event.key === "1") rateCurrent("known");
  if (event.key === "2") rateCurrent("fuzzy");
  if (event.key === "3") rateCurrent("forgotten");
});

renderStudy();
renderWordList();
renderProgress();
renderCalendar();

