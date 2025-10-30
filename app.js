const SOURCE_URL = "https://www.chukai.ne.jp/~shintaku/hayaoshi/haya00.htm";
const STORAGE_PREFIX = "quizSolo.session:";
const LAST_SESSION_KEY = "quizSolo.lastSession";
const SCORE_PER_CORRECT = 10;
const MAX_SESSION_HISTORY = 150;
const THEME_STORAGE_KEY = "quizSolo.theme";

const FALLBACK_QUESTIONS = [
  {
    prompt: "世界でいちばん面積の大きい国はどこ?",
    choices: ["カナダ", "ロシア", "中国", "アメリカ合衆国"],
    answer: 1,
  },
  {
    prompt: "童謡『ふるさと』の歌い出しは?",
    choices: ["うさぎ追いし", "ふるさと遠く", "山は青く", "心はいつも"],
    answer: 0,
  },
  {
    prompt: "日本で一番高い山は?",
    choices: ["北岳", "富士山", "槍ヶ岳", "奥穂高岳"],
    answer: 1,
  },
  {
    prompt: "お寿司のネタで『トロ』はどの魚?",
    choices: ["サーモン", "マグロ", "カツオ", "ブリ"],
    answer: 1,
  },
  {
    prompt: "日本の国鳥はどれ?",
    choices: ["キジ", "ツル", "ハヤブサ", "ウグイス"],
    answer: 0,
  },
  {
    prompt: "ギリシャ神話で海の神とされるのは?",
    choices: ["ゼウス", "ポセイドン", "アテナ", "ハデス"],
    answer: 1,
  },
  {
    prompt: "日本の紙幣に描かれている夏目漱石の代表作は?",
    choices: ["坊っちゃん", "吾輩は猫である", "こころ", "三四郎"],
    answer: 0,
  },
  {
    prompt: "関東地方で最も面積が広い県は?",
    choices: ["茨城県", "群馬県", "栃木県", "千葉県"],
    answer: 3,
  },
  {
    prompt: "太陽系で一番大きい惑星は?",
    choices: ["木星", "土星", "天王星", "海王星"],
    answer: 0,
  },
  {
    prompt: "フランスの首都は?",
    choices: ["マルセイユ", "リヨン", "パリ", "ボルドー"],
    answer: 2,
  },
  {
    prompt: "日本三大夜景のひとつである函館山がある都道府県は?",
    choices: ["北海道", "青森県", "秋田県", "山形県"],
    answer: 0,
  },
  {
    prompt: "バレーボールは1チーム何人?",
    choices: ["5人", "6人", "7人", "8人"],
    answer: 1,
  },
  {
    prompt: "日本で最初の女性宇宙飛行士は?",
    choices: ["向井千秋", "山崎直子", "大西卓哉", "若田光一"],
    answer: 0,
  },
  {
    prompt: "源氏物語の作者は?",
    choices: ["清少納言", "紫式部", "与謝野晶子", "小野小町"],
    answer: 1,
  },
  {
    prompt: "オリンピックは何年ごとに夏季大会が開催される?",
    choices: ["2年", "3年", "4年", "5年"],
    answer: 2,
  },
  {
    prompt: "日本の伝統的な遊び『けん玉』で玉が刺さる部分を何という?",
    choices: ["けん先", "つば", "皿", "糸"],
    answer: 0,
  },
  {
    prompt: "大相撲で横綱の次の地位は?",
    choices: ["大関", "関脇", "小結", "前頭"],
    answer: 0,
  },
  {
    prompt: "『星の王子さま』の著者は?",
    choices: ["サン=テグジュペリ", "ヘミングウェイ", "トルストイ", "カミュ"],
    answer: 0,
  },
  {
    prompt: "日本の祝日で、春分の日と秋分の日の間にあるのは?",
    choices: ["憲法記念日", "文化の日", "山の日", "敬老の日"],
    answer: 3,
  },
  {
    prompt: "そろばんの位取りで、一番右の位は?",
    choices: ["十の位", "一の位", "百の位", "千の位"],
    answer: 1,
  },
  {
    prompt: "イギリスの国旗は通称何と呼ばれる?",
    choices: ["ユニオンジャック", "スターズ・アンド・ストライプス", "トリコロール", "メイプルリーフ"],
    answer: 0,
  },
  {
    prompt: "地球の自転はおよそ何時間で1周?",
    choices: ["12時間", "24時間", "36時間", "48時間"],
    answer: 1,
  },
  {
    prompt: "寿司の種類で、海苔を裏側に巻いたものを何という?",
    choices: ["手巻き寿司", "裏巻き", "軍艦巻き", "押し寿司"],
    answer: 1,
  },
  {
    prompt: "日本で最も長い川は?",
    choices: ["信濃川", "利根川", "石狩川", "天塩川"],
    answer: 0,
  },
  {
    prompt: "童話『桃太郎』で、きびだんごをあげる順番は?",
    choices: ["猿→犬→雉", "犬→猿→雉", "猿→雉→犬", "雉→犬→猿"],
    answer: 0,
  },
  {
    prompt: "世界三大料理に含まれない国はどれ?",
    choices: ["中国", "フランス", "イタリア", "トルコ"],
    answer: 2,
  },
  {
    prompt: "ローマ数字で100を表す文字は?",
    choices: ["X", "L", "C", "D"],
    answer: 2,
  },
  {
    prompt: "テトリスで7種類あるブロックに含まれない形は?",
    choices: ["I", "O", "P", "Z"],
    answer: 2,
  },
  {
    prompt: "血液型が4種類あると提唱したのは?",
    choices: ["シュライナー", "ランドスタイナー", "メンデル", "ダーウィン"],
    answer: 1,
  },
  {
    prompt: "日本で夏に吹く南風を何という?",
    choices: ["やませ", "からっ風", "はえ", "みなみ"],
    answer: 2,
  },
  {
    prompt: "雨が少ない時期に降る恵みの雨を何という?",
    choices: ["慈雨", "豪雨", "霧雨", "驟雨"],
    answer: 0,
  },
];

const elements = {
  views: {
    start: document.getElementById("startView"),
    quiz: document.getElementById("quizView"),
    result: document.getElementById("resultView"),
  },
  playerName: document.getElementById("playerName"),
  questionCount: document.getElementById("questionCount"),
  setupForm: document.getElementById("setupForm"),
  startRankingList: document.getElementById("startRankingList"),
  activeSessionLabel: document.getElementById("activeSessionLabel"),
  copyStartShare: document.getElementById("copyStartShareButton"),
  startShareUrl: document.getElementById("startShareUrl"),
  questionBadge: document.getElementById("questionBadge"),
  questionTitle: document.getElementById("questionTitle"),
  questionText: document.getElementById("questionText"),
  choicesList: document.getElementById("choicesList"),
  correctCounter: document.getElementById("correctCounter"),
  timerDisplay: document.getElementById("timerDisplay"),
  scoreValue: document.getElementById("scoreValue"),
  remainingCount: document.getElementById("remainingCount"),
  progressBar: document.getElementById("progressBar"),
  skipButton: document.getElementById("skipQuestionButton"),
  resultCaption: document.getElementById("resultCaption"),
  finalScore: document.getElementById("finalScore"),
  finalCorrect: document.getElementById("finalCorrect"),
  finalTime: document.getElementById("finalTime"),
  resultSessionLabel: document.getElementById("resultSessionLabel"),
  resultRankingBody: document.getElementById("resultRankingBody"),
  copyResultShare: document.getElementById("copyResultShareButton"),
  downloadResult: document.getElementById("downloadResultButton"),
  resultShareUrl: document.getElementById("resultShareUrl"),
  playAgain: document.getElementById("playAgainButton"),
  returnStart: document.getElementById("returnStartButton"),
  viewRankingButton: document.getElementById("viewRankingButton"),
  rankingDialog: document.getElementById("rankingDialog"),
  dialogSessionLabel: document.getElementById("dialogSessionLabel"),
  dialogRankingList: document.getElementById("dialogRankingList"),
  rankingItemTemplate: document.getElementById("rankingItemTemplate"),
  rankingRowTemplate: document.getElementById("rankingRowTemplate"),
  switchThemeButton: document.getElementById("switchThemeButton"),
};

const state = {
  sessionId: "",
  questions: [],
  questionIndex: 0,
  correct: 0,
  score: 0,
  startTime: null,
  timerId: null,
  elapsedMs: 0,
  answered: false,
  lastSetup: null,
};

init();

function init() {
  hydrateTheme();
  hydrateFromUrl();
  hydrateLastSession();
  ensureSessionId();
  bindEvents();
  updateStartSessionPreview();
  updateShareLink();
  updateThemeButton();
}

function bindEvents() {
  elements.setupForm.addEventListener("submit", handleSetupSubmit);
  elements.copyStartShare.addEventListener("click", () => copyShareLink());
  elements.skipButton.addEventListener("click", handleSkipQuestion);
  elements.copyResultShare.addEventListener("click", () => copyShareLink());
  elements.downloadResult.addEventListener("click", handleDownloadCsv);
  elements.playAgain.addEventListener("click", handlePlayAgain);
  elements.returnStart.addEventListener("click", () => switchView("start"));
  elements.viewRankingButton.addEventListener("click", openRankingDialog);
  elements.switchThemeButton.addEventListener("click", toggleTheme);
  elements.rankingDialog.addEventListener("close", () => {
    elements.dialogRankingList.innerHTML = "";
  });
}

function ensureSessionId() {
  state.sessionId = sanitizeSessionId(state.sessionId) || generateSessionId();
  const existing = readSession(state.sessionId);
  if (!existing.updatedAt && existing.scoreboard.length === 0) {
    writeSession(existing);
  }
}

async function handleSetupSubmit(event) {
  event.preventDefault();
  const name = (elements.playerName.value || "").trim();
  if (!name) {
    elements.playerName.focus();
    return;
  }
  const totalCount = Number(elements.questionCount.value) || 10;
  const sessionId = sanitizeSessionId(state.sessionId) || generateSessionId();
  state.sessionId = sessionId;
  state.questionIndex = 0;
  state.correct = 0;
  state.score = 0;
  state.questions = await pickQuestions(totalCount);
  state.answered = false;
  state.elapsedMs = 0;
  state.lastSetup = { name, totalCount, sessionId };
  persistLastSession(sessionId, name);

  switchView("quiz");
  startTimer();
  renderQuestion();
  updateQuizStatus();
  updateStartSessionPreview();
}

function switchView(name) {
  Object.entries(elements.views).forEach(([key, node]) => {
    node.classList.toggle("view--active", key === name);
  });
}

function startTimer() {
  state.startTime = performance.now();
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    state.elapsedMs = performance.now() - state.startTime;
    updateTimerDisplay();
  }, 500);
  updateTimerDisplay();
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
  if (state.startTime) {
    state.elapsedMs = performance.now() - state.startTime;
    state.startTime = null;
  }
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const formatted = formatTime(state.elapsedMs);
  elements.timerDisplay.textContent = formatted;
}

function renderQuestion() {
  const question = state.questions[state.questionIndex];
  if (!question) return;
  const total = state.questions.length;
  elements.questionBadge.textContent = `${state.questionIndex + 1} / ${total}`;
  elements.questionText.textContent = question.prompt;
  elements.questionTitle.textContent = "問題に答えてください";
  elements.choicesList.innerHTML = "";

  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = choice;
    button.dataset.index = String(index);
    button.addEventListener("click", () => handleChoiceSelect(button, index));
    elements.choicesList.appendChild(button);
  });

  state.answered = false;
  updateProgressBar();
  updateQuizStatus();
}

function handleChoiceSelect(button, index) {
  if (state.answered) return;
  state.answered = true;
  const question = state.questions[state.questionIndex];
  const isCorrect = index === question.answer;
  if (isCorrect) {
    state.correct += 1;
    state.score += SCORE_PER_CORRECT;
  }
  elements.questionTitle.textContent = isCorrect ? "正解!" : "残念!";

  Array.from(elements.choicesList.children).forEach((child) => {
    const choiceIndex = Number(child.dataset.index);
    if (choiceIndex === question.answer) {
      child.dataset.state = "correct";
    } else if (child === button) {
      child.dataset.state = "wrong";
    }
    child.disabled = true;
  });

  updateQuizStatus();
  setTimeout(() => advanceQuestion(), 950);
}

function handleSkipQuestion() {
  if (state.answered) {
    advanceQuestion();
  } else {
    state.answered = true;
    Array.from(elements.choicesList.children).forEach((child) => {
      child.disabled = true;
    });
    elements.questionTitle.textContent = "スキップしました";
    setTimeout(() => advanceQuestion(), 500);
  }
}

function advanceQuestion() {
  if (state.questionIndex + 1 >= state.questions.length) {
    finishGame();
    return;
  }
  state.questionIndex += 1;
  renderQuestion();
}

function finishGame() {
  stopTimer();
  elements.progressBar.style.width = "100%";
  const durationMs = state.elapsedMs;
  const playerName = state.lastSetup?.name ?? "プレイヤー";
  const entry = buildScoreEntry({
    name: playerName,
    score: state.score,
    correct: state.correct,
    total: state.questions.length,
    timeMs: durationMs,
  });
  const session = mergeScoreIntoSession(state.sessionId, entry);
  renderResults(entry, session);
  switchView("result");
}

function renderResults(entry, session) {
  elements.resultCaption.textContent = `${entry.name}さん、お疲れさまでした!`;
  elements.finalScore.textContent = entry.score.toString();
  elements.finalCorrect.textContent = `${entry.correct} / ${entry.total}`;
  elements.finalTime.textContent = formatTime(entry.timeMs);
  elements.resultSessionLabel.textContent = formatParticipationLabel(session);

  renderRankingTable(session.scoreboard);
}

function renderRankingTable(entries) {
  elements.resultRankingBody.innerHTML = "";
  const fragment = document.createDocumentFragment();
  entries.slice(0, MAX_SESSION_HISTORY).forEach((item, index) => {
    const row = elements.rankingRowTemplate.content.firstElementChild.cloneNode(true);
    row.querySelector("th").textContent = `${index + 1}`;
    row.querySelector(".table__name").textContent = item.name;
    row.querySelector(".table__score").textContent = item.score.toString();
    row.querySelector(".table__correct").textContent = `${item.correct}/${item.total}`;
    row.querySelector(".table__time").textContent = formatTime(item.timeMs);
    row.querySelector(".table__played").textContent = formatDate(item.playedAt);
    fragment.appendChild(row);
  });
  elements.resultRankingBody.appendChild(fragment);
}

function updateQuizStatus() {
  elements.correctCounter.textContent = `正解: ${state.correct}`;
  elements.scoreValue.textContent = state.score.toString();
  const remaining = state.questions.length - state.questionIndex - (state.answered ? 1 : 0);
  elements.remainingCount.textContent = `残り ${Math.max(remaining, 0)} 問`;
}

function updateProgressBar() {
  const completed = (state.questionIndex / state.questions.length) * 100;
  elements.progressBar.style.width = `${completed}%`;
}

async function pickQuestions(totalCount) {
  const pool = await loadQuestionPool();
  const shuffled = shuffle([...pool]);
  return shuffled.slice(0, Math.min(totalCount, shuffled.length));
}

let cachedPool = null;

async function loadQuestionPool() {
  if (cachedPool) return cachedPool;
  try {
    const response = await fetch(SOURCE_URL, { mode: "cors" });
    if (!response.ok) throw new Error("Failed to load remote questions");
    const text = await response.text();
    const parsed = parseRemoteQuestions(text);
    if (parsed.length >= 10) {
      cachedPool = parsed;
      return parsed;
    }
  } catch (error) {
    console.warn("Using fallback questions", error);
  }
  cachedPool = FALLBACK_QUESTIONS;
  return cachedPool;
}

function parseRemoteQuestions(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const container = doc.querySelector("body");
  if (!container) return [];
  const items = [];
  const textContent = container.innerText
    .replace(/\r\n?/g, "\n")
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
  for (const block of textContent) {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length < 3) continue;
    const [firstLine, ...rest] = lines;
    if (!/[第\d]/.test(firstLine) || rest.length < 2) continue;
    const questionText = rest[0];
    const choices = rest
      .slice(1)
      .map((line) => line.replace(/^[(（]?[0-9０-９]+[)）.．]/, "").trim())
      .filter((line) => line.length > 0 && !/答え/.test(line));
    const answerLine = rest.find((line) => /答え/.test(line));
    const answerMatch = answerLine ? normalizeDigitString(answerLine).match(/\d+/) : null;
    if (questionText && choices.length >= 2 && answerMatch) {
      const answerIndex = Number(answerMatch[0]) - 1;
      if (Number.isFinite(answerIndex) && answerIndex >= 0 && answerIndex < choices.length) {
        items.push({ prompt: questionText, choices: choices.slice(0, 4), answer: answerIndex });
      }
    }
  }
  return items;
}

function normalizeDigitString(value) {
  const fullWidth = "０１２３４５６７８９";
  return value.replace(/[０-９]/g, (char) => {
    const index = fullWidth.indexOf(char);
    return index >= 0 ? String(index) : char;
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function formatTime(ms = 0) {
  const seconds = Math.floor(ms / 1000);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  const options = { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
  return new Intl.DateTimeFormat("ja-JP", options).format(date);
}

function formatParticipationLabel(session) {
  const count = session?.scoreboard?.length ?? 0;
  if (count <= 0) return "まだ記録がありません";
  if (count === 1) return "1人の記録";
  return `${count}人の記録`;
}

function buildScoreEntry({ name, score, correct, total, timeMs }) {
  const canUseRandomUuid = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function";
  return {
    id: canUseRandomUuid ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    name,
    score,
    correct,
    total,
    timeMs,
    playedAt: new Date().toISOString(),
  };
}

function mergeScoreIntoSession(sessionId, entry) {
  const existing = readSession(sessionId);
  const merged = mergeEntries(existing.scoreboard, [entry]);
  const session = {
    sessionId,
    scoreboard: sortEntries(merged).slice(0, MAX_SESSION_HISTORY),
    updatedAt: new Date().toISOString(),
  };
  writeSession(session);
  updateStartSessionPreview();
  updateShareLink(session);
  return session;
}

function mergeEntries(current, incoming) {
  const map = new Map();
  for (const item of current) {
    map.set(item.id, item);
  }
  for (const item of incoming) {
    const existing = map.get(item.id);
    if (!existing || new Date(item.playedAt) > new Date(existing.playedAt)) {
      map.set(item.id, item);
    }
  }
  return Array.from(map.values());
}

function sortEntries(entries) {
  return [...entries].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.timeMs !== b.timeMs) return a.timeMs - b.timeMs;
    return new Date(a.playedAt) - new Date(b.playedAt);
  });
}

function readSession(sessionId) {
  const key = STORAGE_PREFIX + sessionId;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { sessionId, scoreboard: [], updatedAt: null };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.scoreboard)) {
      return { sessionId, scoreboard: [], updatedAt: null };
    }
    return {
      sessionId,
      scoreboard: parsed.scoreboard,
      updatedAt: parsed.updatedAt ?? null,
    };
  } catch (error) {
    console.warn("Failed to read session", error);
    return { sessionId, scoreboard: [], updatedAt: null };
  }
}

function writeSession(session) {
  const key = STORAGE_PREFIX + session.sessionId;
  try {
    localStorage.setItem(key, JSON.stringify(session));
  } catch (error) {
    console.warn("Failed to store session", error);
  }
}

function updateShareLink(session) {
  if (!state.sessionId && !session?.sessionId) {
    return `${location.origin}${location.pathname}`;
  }
  const activeSession = session ?? readSession(state.sessionId);
  state.sessionId = activeSession.sessionId;
  const payload = encodeSharePayload(activeSession);
  const hash = `#board=${payload}`;
  if (location.hash !== hash) {
    try {
      history.replaceState(null, "", hash);
    } catch (error) {
      location.hash = hash;
    }
  }
  const url = `${location.origin}${location.pathname}${hash}`;
  if (elements.startShareUrl) {
    elements.startShareUrl.textContent = url;
    elements.startShareUrl.setAttribute("title", url);
  }
  if (elements.resultShareUrl) {
    elements.resultShareUrl.textContent = url;
    elements.resultShareUrl.setAttribute("title", url);
  }
  return url;
}

function copyShareLink() {
  ensureSessionId();
  if (!state.sessionId) {
    showInlineToast("共有リンクを用意できませんでした");
    return;
  }
  const session = readSession(state.sessionId);
  const url = updateShareLink(session);
  if (navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(url)
      .then(() => showToast("リンクをコピーしました"))
      .catch(() => {
        showInlineToast("コピーできませんでした。URLを手動で選択してください。");
        window.prompt("以下のURLをコピーしてください", url);
      });
  } else {
    showInlineToast("共有リンクをコピーできませんでした。");
    window.prompt("以下のURLをコピーしてください", url);
  }
}

function encodeSharePayload(session) {
  const payload = {
    sessionId: session.sessionId,
    scoreboard: session.scoreboard,
    updatedAt: session.updatedAt,
  };
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return btoa(binary).replace(/=+$/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function decodeSharePayload(value) {
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(padded);
    const bytes = new Uint8Array([...binary].map((char) => char.charCodeAt(0)));
    const json = new TextDecoder().decode(bytes);
    const payload = JSON.parse(json);
    if (payload && payload.sessionId && Array.isArray(payload.scoreboard)) {
      return payload;
    }
  } catch (error) {
    console.warn("Invalid share payload", error);
  }
  return null;
}

function hydrateFromUrl() {
  if (!location.hash) return;
  const params = new URLSearchParams(location.hash.slice(1));
  const boardParam = params.get("board");
  if (!boardParam) return;
  const payload = decodeSharePayload(boardParam);
  if (!payload) return;
  const baseSessionId = sanitizeSessionId(payload.sessionId) || generateSessionId();
  const existing = readSession(baseSessionId);
  const merged = mergeEntries(existing.scoreboard, payload.scoreboard || []);
  const session = {
    sessionId: baseSessionId,
    scoreboard: sortEntries(merged),
    updatedAt: payload.updatedAt ?? new Date().toISOString(),
  };
  writeSession(session);
  state.sessionId = session.sessionId;
}

function hydrateLastSession() {
  try {
    const raw = localStorage.getItem(LAST_SESSION_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    const storedId = sanitizeSessionId(parsed?.sessionId);
    if (!state.sessionId && storedId) {
      state.sessionId = storedId;
    }
    if (parsed?.name) {
      elements.playerName.value = parsed.name;
    }
  } catch (error) {
    console.warn("Failed to hydrate last session", error);
  }
}

function persistLastSession(sessionId, name) {
  try {
    const sanitized = sanitizeSessionId(sessionId);
    localStorage.setItem(LAST_SESSION_KEY, JSON.stringify({ sessionId: sanitized, name }));
  } catch (error) {
    console.warn("Failed to persist last session", error);
  }
}

function updateStartSessionPreview() {
  if (!state.sessionId) {
    elements.activeSessionLabel.textContent = "共有準備中";
    elements.startRankingList.innerHTML = "";
    return;
  }
  const session = readSession(state.sessionId);
  elements.activeSessionLabel.textContent = formatParticipationLabel(session);
  elements.startRankingList.innerHTML = "";
  if (!session.scoreboard.length) {
    const empty = document.createElement("li");
    empty.className = "ranking-list__item ranking-list__item--empty";
    empty.textContent = "まだプレイ記録がありません。";
    elements.startRankingList.appendChild(empty);
    return;
  }
  const fragment = document.createDocumentFragment();
  const limit = Math.min(5, session.scoreboard.length);
  for (let i = 0; i < limit; i += 1) {
    const item = session.scoreboard[i];
    const node = elements.rankingItemTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector(".ranking-list__rank").textContent = `${i + 1}`;
    node.querySelector(".ranking-list__name").textContent = item.name;
    node.querySelector(".ranking-list__meta").textContent = `${formatTime(item.timeMs)} / ${formatDate(item.playedAt)}`;
    node.querySelector(".ranking-list__score").textContent = `${item.score} pt`;
    fragment.appendChild(node);
  }
  elements.startRankingList.appendChild(fragment);
}

function openRankingDialog() {
  if (!state.sessionId) {
    showToast("共有リンクを準備しています");
    return;
  }
  const session = readSession(state.sessionId);
  elements.dialogSessionLabel.textContent = formatParticipationLabel(session);
  elements.dialogRankingList.innerHTML = "";
  if (!session.scoreboard.length) {
    const empty = document.createElement("li");
    empty.className = "ranking-list__item ranking-list__item--empty";
    empty.textContent = "まだ記録がありません";
    elements.dialogRankingList.appendChild(empty);
  } else {
    const fragment = document.createDocumentFragment();
    session.scoreboard.forEach((item, index) => {
      const node = elements.rankingItemTemplate.content.firstElementChild.cloneNode(true);
      node.querySelector(".ranking-list__rank").textContent = `${index + 1}`;
      node.querySelector(".ranking-list__name").textContent = item.name;
      node.querySelector(".ranking-list__meta").textContent = `${item.correct}/${item.total} 正解`;
      node.querySelector(".ranking-list__score").textContent = `${item.score} pt`;
      fragment.appendChild(node);
    });
    elements.dialogRankingList.appendChild(fragment);
  }
  if (typeof elements.rankingDialog.showModal === "function") {
    elements.rankingDialog.showModal();
  } else {
    showInlineToast("お使いのブラウザではモーダルを表示できません");
  }
}

function handleDownloadCsv() {
  if (!state.sessionId) {
    showToast("共有リンクがまだありません");
    return;
  }
  const session = readSession(state.sessionId);
  if (!session.scoreboard.length) {
    showToast("ランキングが空です");
    return;
  }
  const header = ["rank", "name", "score", "correct", "total", "time", "playedAt"];
  const rows = session.scoreboard.map((item, index) => [
    index + 1,
    item.name,
    item.score,
    item.correct,
    item.total,
    formatTime(item.timeMs),
    formatDate(item.playedAt),
  ]);
  const csv = [header, ...rows].map((cols) => cols.map((col) => `"${String(col).replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${state.sessionId}_ranking.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function handlePlayAgain() {
  if (!state.lastSetup) {
    switchView("start");
    return;
  }
  elements.playerName.value = state.lastSetup.name;
  elements.questionCount.value = String(state.lastSetup.totalCount);
  state.sessionId = state.lastSetup.sessionId;
  updateStartSessionPreview();
  updateShareLink();
  switchView("start");
  setTimeout(() => {
    elements.setupForm.requestSubmit();
  }, 0);
}

function showToast(message) {
  if (!("Notification" in window)) {
    return showInlineToast(message);
  }
  if (Notification.permission === "granted") {
    new Notification(message);
    return;
  }
  if (Notification.permission === "denied") {
    showInlineToast(message);
    return;
  }
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      new Notification(message);
    } else {
      showInlineToast(message);
    }
  });
}

function showInlineToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = "toast";
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("toast--visible"));
  setTimeout(() => {
    toast.classList.remove("toast--visible");
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

function sanitizeSessionId(value) {
  if (!value) return "";
  return value
    .toString()
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 12);
}

function generateSessionId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 6; i += 1) {
    id += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return id;
}

function updateThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");
  elements.switchThemeButton.textContent = isDark ? "☀️" : "🌙";
}

function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.classList.toggle("dark");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  } catch (error) {
    console.warn("Failed to persist theme", error);
  }
  updateThemeButton();
}

function hydrateTheme() {
  let stored = null;
  try {
    stored = localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to read theme", error);
  }
  const prefersDark =
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;
  const shouldUseDark = stored ? stored === "dark" : prefersDark;
  document.documentElement.classList.toggle("dark", shouldUseDark);
}

// basic toast styles
const toastStyle = document.createElement("style");
toastStyle.textContent = `
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translate(-50%, 40px);
  background: rgba(33, 24, 52, 0.85);
  color: #fff;
  padding: 0.75rem 1.4rem;
  border-radius: 999px;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  z-index: 1000;
}
.toast--visible {
  transform: translate(-50%, 0);
  opacity: 1;
}
`;
document.head.appendChild(toastStyle);
