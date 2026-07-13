const WORDS = [
  {
    word: "Diet Coke",
    speak: "Diet Coke",
    pos: "名词短语",
    ipa: "/ˈdaɪət koʊk/",
    phonetic: "代儿特 口克",
    syllables: "di-e-t co-ke",
    meanings: [{ pos: "名词短语", text: "无糖可乐" }],
    examples: [
      ["Can you get me a Diet Coke?", "你能给我一瓶无糖可乐吗？"],
      ["I want to drink Diet Coke.", "我想喝无糖可乐。"],
      ["Do you like Diet Coke?", "你喜欢无糖可乐吗？"]
    ]
  },
  {
    word: "(do the) laundry",
    speak: "do the laundry",
    pos: "动词短语",
    ipa: "/du ðə ˈlɔːndri/",
    phonetic: "(do the) 隆追",
    syllables: "(do the) laun-dry",
    meanings: [{ pos: "动词短语", text: "洗衣服" }],
    examples: [
      ["I need to do the laundry tonight.", "我今晚需要洗衣服。"],
      ["Did you do the laundry?", "你洗衣服了吗？"],
      ["I do the laundry at home.", "我在家洗衣服。"]
    ]
  },
  {
    word: "lighter",
    pos: "名词",
    ipa: "/ˈlaɪtər/",
    phonetic: "赖特儿",
    syllables: "ligh-ter",
    meanings: [{ pos: "名词", text: "打火机" }],
    examples: [
      ["Can you give me a lighter?", "你能给我一个打火机吗？"],
      ["I can't find my lighter.", "我找不到我的打火机。"],
      ["This is a lighter.", "这是一个打火机。"]
    ],
    note: "相关词：light 作动词时表示“点燃 / 点亮”。"
  },
  {
    word: "ashtray",
    pos: "名词",
    ipa: "/ˈæʃtreɪ/",
    phonetic: "æ时吹",
    syllables: "a-sh-tray",
    meanings: [{ pos: "名词", text: "烟灰缸" }],
    examples: [
      ["Please give me an ashtray.", "请给我一个烟灰缸。"],
      ["There is an ashtray on the table.", "桌上有一个烟灰缸。"],
      ["The ashtray is black.", "这个烟灰缸是黑色的。"]
    ]
  },
  {
    word: "pen",
    pos: "名词",
    ipa: "/pen/",
    phonetic: "pen",
    syllables: "pen",
    meanings: [{ pos: "名词", text: "笔" }],
    examples: [
      ["Can you give me a pen?", "你能给我一支笔吗？"],
      ["I don't have a pen.", "我没有一支笔。"],
      ["My pen is small.", "我的笔很小。"]
    ]
  },
  {
    word: "breakfast",
    pos: "名词",
    ipa: "/ˈbrekfəst/",
    phonetic: "布ruei克 佛斯特",
    syllables: "break-fast",
    meanings: [{ pos: "名词", text: "早餐" }],
    examples: [
      ["What time do we have breakfast?", "我们几点吃早餐？"],
      ["I didn't have breakfast this morning.", "我今早没吃早餐。"],
      ["I eat breakfast at 8.", "我八点吃早餐。"]
    ]
  },
  {
    word: "lunch",
    pos: "名词",
    ipa: "/lʌntʃ/",
    phonetic: "烂吃",
    syllables: "lun-ch",
    meanings: [{ pos: "名词", text: "午餐" }],
    examples: [
      ["What time do you want to have lunch?", "你想几点吃午餐？"],
      ["I had lunch just now.", "我刚刚吃了午餐。"],
      ["We have lunch here.", "我们在这里吃午餐。"]
    ]
  },
  {
    word: "dinner",
    pos: "名词",
    ipa: "/ˈdɪnər/",
    phonetic: "滴呢儿",
    syllables: "di-nner",
    meanings: [{ pos: "名词", text: "晚餐" }],
    examples: [
      ["Let's have dinner together.", "我们一起吃晚餐吧。"],
      ["I am cooking dinner.", "我正在做晚餐。"],
      ["They cook dinner together.", "他们一起做晚餐。"]
    ]
  },
  {
    word: "clothes",
    pos: "名词",
    ipa: "/kloʊðz/",
    phonetic: "克漏思",
    syllables: "clo-thes",
    meanings: [{ pos: "名词", text: "衣服" }],
    examples: [
      ["I need to buy some new clothes.", "我需要买一些新衣服。"],
      ["Do you like my clothes?", "你喜欢我的衣服吗？"],
      ["These clothes are nice.", "这些衣服很好看。"]
    ]
  },
  {
    word: "check",
    pos: "名词 / 动词",
    ipa: "/tʃek/",
    phonetic: "check",
    syllables: "check",
    meanings: [
      { pos: "名词", text: "账单" },
      { pos: "名词", text: "检查" },
      { pos: "动词", text: "检查" }
    ],
    forms: [
      ["原形", "check"],
      ["进行时", "checking"],
      ["过去式 / 分词", "checked"]
    ],
    examples: [
      ["Can I have the check, please?", "请问，可以给我账单吗？"],
      ["I did a quick check.", "我快速检查了一下。"],
      ["Let me check.", "让我查一下。"],
      ["I am checking my phone.", "我正在检查我的手机。"]
    ]
  }
];

const STORAGE_KEY = "ten-words-progress-v1";
const state = {
  current: 0,
  revealed: false,
  ratings: loadRatings()
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const els = {
  studyView: $("#study-view"),
  progressLabel: $("#progress-label"),
  progressFill: $("#progress-fill"),
  pos: $("#part-of-speech"),
  chinese: $("#chinese-prompt"),
  promptHint: $("#prompt-hint"),
  card: $("#recall-card"),
  hidden: $("#hidden-state"),
  answer: $("#answer-state"),
  word: $("#english-word"),
  ipa: $("#ipa"),
  phonetic: $("#phonetic-cn"),
  syllables: $("#syllables"),
  meanings: $("#meanings"),
  senseCount: $("#sense-count"),
  formsSection: $("#forms-section"),
  forms: $("#word-forms"),
  examples: $("#examples"),
  exampleCount: $("#example-count"),
  related: $("#related-note"),
  ratingPanel: $("#rating-panel"),
  previous: $("#previous-button"),
  next: $("#next-button"),
  dots: $("#dot-indicator"),
  wordList: $("#word-list"),
  completed: $("#completed-count"),
  bars: $("#progress-bars"),
  toast: $("#toast")
};

function loadRatings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveRatings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.ratings));
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function highlightTarget(sentence, word) {
  const targets = word === "(do the) laundry" ? ["do the laundry", "the laundry"] : [word];
  let result = escapeHtml(sentence);
  targets.sort((a, b) => b.length - a.length).forEach(target => {
    const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
  });
  if (word === "check") {
    result = result.replace(/\b(checking|checked)\b/gi, "<mark>$1</mark>");
  }
  return result;
}

function renderStudy() {
  const item = WORDS[state.current];
  const primaryMeaning = item.meanings[0].text;
  els.progressLabel.textContent = `第 ${state.current + 1} / ${WORDS.length} 词`;
  els.progressFill.style.width = `${((state.current + 1) / WORDS.length) * 100}%`;
  els.pos.textContent = item.pos;
  els.chinese.textContent = primaryMeaning;
  els.promptHint.textContent = state.revealed ? "查看发音、含义和例句" : "回想它的英文、发音和用法";

  els.hidden.hidden = state.revealed;
  els.answer.hidden = !state.revealed;
  els.ratingPanel.hidden = !state.revealed;
  els.studyView.classList.toggle("has-ratings", state.revealed);
  els.card.setAttribute("aria-label", state.revealed ? `${item.word} 单词卡` : "点击显示答案");

  els.word.textContent = item.word;
  els.ipa.textContent = item.ipa;
  els.phonetic.textContent = item.phonetic;
  els.syllables.textContent = item.syllables;
  els.senseCount.textContent = `${item.meanings.length} 个义项`;
  els.meanings.innerHTML = item.meanings.map(sense => `<div class="meaning-row"><span>${escapeHtml(sense.pos)}</span><strong>${escapeHtml(sense.text)}</strong></div>`).join("");

  els.formsSection.hidden = !item.forms;
  els.forms.innerHTML = item.forms ? item.forms.map(([label, form]) => `<div class="form-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(form)}</strong></div>`).join("") : "";

  els.exampleCount.textContent = `${item.examples.length} 句`;
  els.examples.innerHTML = item.examples.map(([en, cn], index) => `
    <article class="example-item">
      <p class="example-en">${highlightTarget(en, item.word)}</p>
      <p class="example-cn">${escapeHtml(cn)}</p>
      <button class="icon-button example-audio" type="button" data-example="${index}" aria-label="播放例句发音" title="播放例句发音">🔊</button>
    </article>`).join("");

  els.related.hidden = !item.note;
  els.related.textContent = item.note || "";
  els.previous.disabled = state.current === 0;
  els.next.disabled = state.current === WORDS.length - 1;

  $$(".rating-button").forEach(button => {
    button.classList.toggle("selected", state.ratings[state.current] === button.dataset.rating);
  });

  renderDots();
}

function renderDots() {
  els.dots.innerHTML = WORDS.map((_, index) => {
    const classes = ["dot"];
    if (index === state.current) classes.push("current");
    if (state.ratings[index]) classes.push("rated");
    return `<span class="${classes.join(" ")}"></span>`;
  }).join("");
}

function renderWordList() {
  els.wordList.innerHTML = WORDS.map((item, index) => {
    const status = state.ratings[index] || "unrated";
    return `
      <button class="word-list-button" type="button" data-index="${index}">
        <span class="word-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="word-list-copy"><strong>${escapeHtml(item.word)}</strong><span>${escapeHtml(item.meanings.map(x => x.text).join("；"))}</span></span>
        <span class="status-mark ${status}" aria-label="${ratingLabel(status)}"></span>
      </button>`;
  }).join("");
}

function renderProgress() {
  const counts = { known: 0, fuzzy: 0, forgotten: 0 };
  Object.values(state.ratings).forEach(value => { if (counts[value] !== undefined) counts[value] += 1; });
  els.completed.textContent = counts.known + counts.fuzzy + counts.forgotten;
  const rows = [
    ["known", "认识"],
    ["fuzzy", "模糊"],
    ["forgotten", "忘记"]
  ];
  els.bars.innerHTML = rows.map(([key, label]) => `
    <div class="bar-row">
      <span class="bar-label">${label}</span>
      <span class="bar-track"><span class="bar-fill ${key}" style="width:${counts[key] * 10}%"></span></span>
      <span class="bar-count">${counts[key]}</span>
    </div>`).join("");
}

function ratingLabel(status) {
  return ({ known: "认识", fuzzy: "模糊", forgotten: "忘记", unrated: "未判断" })[status];
}

function reveal() {
  if (state.revealed) return;
  state.revealed = true;
  renderStudy();
}

function goToWord(index, revealAnswer = false) {
  if (index < 0 || index >= WORDS.length) return;
  state.current = index;
  state.revealed = revealAnswer;
  renderStudy();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function rateCurrent(rating) {
  state.ratings[state.current] = rating;
  saveRatings();
  renderStudy();
  showToast(`已记录：${ratingLabel(rating)}`);
  setTimeout(() => {
    if (state.current < WORDS.length - 1) goToWord(state.current + 1);
    else switchView("progress-view");
  }, 380);
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
  const voice = speechSynthesis.getVoices().find(v => v.lang === "en-US") || speechSynthesis.getVoices().find(v => v.lang.startsWith("en"));
  if (voice) utterance.voice = voice;
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
  if (id === "words-view") renderWordList();
  if (id === "progress-view") renderProgress();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 1600);
}

els.card.addEventListener("click", event => {
  if (event.target.closest("button")) return;
  reveal();
});
els.card.addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && !state.revealed) {
    event.preventDefault();
    reveal();
  }
});
$("#word-audio").addEventListener("click", () => speak(WORDS[state.current].speak || WORDS[state.current].word));
els.examples.addEventListener("click", event => {
  const button = event.target.closest("[data-example]");
  if (!button) return;
  speak(WORDS[state.current].examples[Number(button.dataset.example)][0]);
});
els.previous.addEventListener("click", () => goToWord(state.current - 1));
els.next.addEventListener("click", () => goToWord(state.current + 1));
$$('.rating-button').forEach(button => button.addEventListener("click", () => rateCurrent(button.dataset.rating)));
$$('.nav-button').forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));
els.wordList.addEventListener("click", event => {
  const button = event.target.closest("[data-index]");
  if (!button) return;
  goToWord(Number(button.dataset.index), true);
  switchView("study-view");
});
$("#continue-button").addEventListener("click", () => switchView("study-view"));
$("#reset-button").addEventListener("click", () => {
  if (!confirm("确定清空这 10 个单词的学习记录吗？")) return;
  state.ratings = {};
  saveRatings();
  renderStudy();
  showToast("学习记录已清空");
});

document.addEventListener("keydown", event => {
  if (!$('.view.active')?.matches('#study-view')) return;
  if (event.key === "ArrowLeft") goToWord(state.current - 1);
  if (event.key === "ArrowRight") goToWord(state.current + 1);
  if (event.key === "Enter" || event.key === " ") reveal();
});

let touchStartX = 0;
els.card.addEventListener("touchstart", event => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
els.card.addEventListener("touchend", event => {
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) < 70) return;
  if (delta > 0) goToWord(state.current - 1);
  else goToWord(state.current + 1);
}, { passive: true });

renderStudy();
renderWordList();
renderProgress();

