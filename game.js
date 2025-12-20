/* Sentence Lab — Sentence X-Ray Edition (English → Spanish Bootstrapping)
   FULL GAME.JS (scrambled by default)
   UPDATED: MC/FIX/CLASSIFY now require selecting an option AND pressing "Check"
   (prevents the “skip question” feel)

   Drop-in replacement for your existing game.js.
   Uses your existing index.html + style.css (no HTML changes required).

   Expected HTML IDs:
   levelLabel, conceptLabel, mission, bridge, bank, built, feedback, checks, hint,
   score, streak, nextBtn, checkBtn, resetBtn, undoBtn, shuffleBtn, hintBtn
*/

// ----------------------------- Levels -----------------------------
const LEVELS = [
  // 1) VERB FIRST
  {
    id: 1,
    concept: "Find the VERB (always first)",
    mission:
      "Click the verb (action or linking). If you can’t find the verb, you can’t read the sentence.",
    bridge:
      "Spanish packs WHO + TIME into the verb. If you train your eyes to find verbs first, Spanish stops feeling random.",
    hint:
      "Verb = what happens (studies, closes) or what connects description (is/are/was).",
    puzzles: [
      {
        type: "select",
        prompt: "Select the VERB.",
        sentence: "She studies Spanish at night.",
        targets: [{ label: "verb", indices: [1] }],
        explain: "studies is the action (the heartbeat).",
      },
      {
        type: "select",
        prompt: "Select the VERB.",
        sentence: "The store closes at eight on weekdays.",
        targets: [{ label: "verb", indices: [2] }],
        explain: "closes is the action. Everything else is extra info.",
      },
      {
        type: "select",
        prompt: "Select the VERB (linking verb).",
        sentence: "They are ready for the exam.",
        targets: [{ label: "verb", indices: [1] }],
        explain: "are links the subject to a description (ready).",
      },
      {
        type: "select",
        prompt: "Select the VERB IDEA (helping + main verb).",
        sentence: "We will practice tomorrow.",
        targets: [{ label: "verb", indices: [1, 2] }],
        explain: "will practice functions as one verb idea (future).",
      },
    ],
  },

  // 2) SUBJECT
  {
    id: 2,
    concept: "Find the SUBJECT (who is doing it?)",
    mission:
      "Click the subject (the person/thing doing the verb). Sometimes it’s more than one word.",
    bridge:
      "Spanish often drops the subject word, but the subject still exists logically. You’re building that logic now.",
    hint:
      "Ask: who/what is doing the verb? Ignore time/place phrases at the beginning.",
    puzzles: [
      {
        type: "select",
        prompt: "Select the SUBJECT (full subject phrase).",
        sentence: "The happy student studies Spanish.",
        targets: [{ label: "subject", indices: [0, 1, 2] }],
        explain: "The happy student = full subject phrase (core noun: student).",
      },
      {
        type: "select",
        prompt: "Select the SUBJECT (not the first word).",
        sentence: "In the library, my friends read quietly.",
        targets: [{ label: "subject", indices: [3, 4] }],
        explain: "my friends = subject. In the library = extra place info.",
      },
      {
        type: "select",
        prompt: "Select the SUBJECT (compound subject).",
        sentence: "Maria and Luis practice every day.",
        targets: [{ label: "subject", indices: [0, 1, 2] }],
        explain: "Maria and Luis = two subjects sharing one verb.",
      },
      {
        type: "select",
        prompt: "Select the SUBJECT (it comes after a time word).",
        sentence: "Yesterday, the team won the game.",
        targets: [{ label: "subject", indices: [1, 2] }],
        explain: "the team = subject. Yesterday = time marker.",
      },
    ],
  },

  // 3) TAG QUESTIONS → PRONOUN DISCOVERY
  {
    id: 3,
    concept: "Tag Questions → Discover pronouns",
    mission:
      "Choose the correct tag ending. Tags force you to ‘point’ at the subject with a pronoun.",
    bridge:
      "This trains subject–verb pairing. In Spanish, the verb ending often does the pointing instead of a pronoun.",
    hint:
      "Match: (1) pronoun to the subject (Natalie→she), and (2) auxiliary/tense (is→isn't, walked→didn't).",
    puzzles: [
      {
        type: "mc",
        prompt: "Choose the best tag ending.",
        stem: "Natalie is a student, _____?",
        options: ["isn't she", "aren't they", "doesn't she", "isn't it"],
        answerIndex: 0,
        explain: "Natalie → she. is → isn't she.",
      },
      {
        type: "mc",
        prompt: "Choose the best tag ending.",
        stem: "The store closes at eight, _____?",
        options: ["doesn't it", "isn't it", "don't it", "didn't it"],
        answerIndex: 0,
        explain: "The store → it. Present simple uses do/does → doesn't it.",
      },
      {
        type: "mc",
        prompt: "Choose the best tag ending.",
        stem: "Matthew walked to the gym, _____?",
        options: ["didn't he", "doesn't he", "wasn't he", "isn't he"],
        answerIndex: 0,
        explain: "Past simple uses did → didn't he. Matthew → he.",
      },
      {
        type: "mc",
        prompt: "Choose the best tag ending.",
        stem: "Those students are ready, _____?",
        options: ["aren't they", "isn't it", "don't they", "aren't we"],
        answerIndex: 0,
        explain: "Those students → they. are → aren't they.",
      },
    ],
  },

  // 4) PROPER NOUN → PRONOUN (explicit practice)
  {
    id: 4,
    concept: "Replace proper nouns with pronouns (without changing meaning)",
    mission:
      "Pick the best pronoun replacement for the subject. This is how you keep sentences from getting repetitive.",
    bridge:
      "Spanish can drop pronouns, but you still need to know what pronoun the verb points to (yo/tú/él/ella/nosotros/ellos).",
    hint:
      "Ask: is the subject a man, a woman, a thing, or a group? Use he/she/it/they/we/I.",
    puzzles: [
      {
        type: "mc",
        prompt: "Replace the subject with the best pronoun.",
        stem: "John studies Spanish. → _____ studies Spanish.",
        options: ["He", "She", "They", "It"],
        answerIndex: 0,
        explain: "John → He.",
      },
      {
        type: "mc",
        prompt: "Replace the subject with the best pronoun.",
        stem: "Monmouth University is big. → _____ is big.",
        options: ["He", "She", "It", "They"],
        answerIndex: 2,
        explain: "A university is a thing → It.",
      },
      {
        type: "mc",
        prompt: "Replace the subject with the best pronoun.",
        stem: "Maria and Luis practice. → _____ practice.",
        options: ["They", "We", "She", "It"],
        answerIndex: 0,
        explain: "Two people → They.",
      },
      {
        type: "mc",
        prompt: "Replace the subject with the best pronoun.",
        stem: "My friends and I are ready. → _____ are ready.",
        options: ["They", "We", "I", "You"],
        answerIndex: 1,
        explain: "My friends and I → We.",
      },
    ],
  },

  // 5) AGREEMENT
  {
    id: 5,
    concept: "Subject–Verb Agreement (English → Spanish)",
    mission:
      "Spot agreement errors and fix them. If agreement matters in English, it matters more in Spanish.",
    bridge:
      "Spanish agreement is stronger: verbs change clearly with the subject. This prepares you for Spanish verb endings.",
    hint:
      "Present: he/she/it usually adds -s (walks). Plural usually does not (walk).",
    puzzles: [
      {
        type: "fix",
        prompt: "Fix the agreement error.",
        sentence: "The students studies Spanish.",
        choices: ["study", "studies"],
        answerIndex: 0,
        explain: "students = plural → study (no -s).",
      },
      {
        type: "fix",
        prompt: "Fix the agreement error.",
        sentence: "He walk to class every day.",
        choices: ["walk", "walks"],
        answerIndex: 1,
        explain: "he = 3rd singular → walks.",
      },
      {
        type: "fix",
        prompt: "Fix the agreement error.",
        sentence: "My friend and I is late.",
        choices: ["are", "am"],
        answerIndex: 0,
        explain: "My friend and I = we → are.",
      },
      {
        type: "fix",
        prompt: "Fix the agreement error (meaning matters).",
        sentence: "Each student have a book.",
        choices: ["has", "have"],
        answerIndex: 0,
        explain: "Each student = singular meaning → has.",
      },
    ],
  },

  // 6) TENSE + CERTAINTY
  {
    id: 6,
    concept: "Verb Time & Reality (tense + certainty)",
    mission:
      "Fix tense mismatches and classify certainty (certain vs uncertain).",
    bridge:
      "Spanish encodes time inside the verb, and later you’ll see mood (certainty/doubt). You’re training the idea now.",
    hint:
      "Yesterday/tomorrow must match the verb. might/may = uncertain. will/definitely = more certain.",
    puzzles: [
      {
        type: "fix",
        prompt: "Fix the tense mismatch.",
        sentence: "Yesterday, she walks to class.",
        choices: ["walked", "walks"],
        answerIndex: 0,
        explain: "Yesterday = past → walked.",
      },
      {
        type: "fix",
        prompt: "Fix the tense mismatch.",
        sentence: "Tomorrow, we practiced in the library.",
        choices: ["will practice", "practiced"],
        answerIndex: 0,
        explain: "Tomorrow = future → will practice.",
      },
      {
        type: "classify",
        prompt: "Is this certain or uncertain?",
        sentence: "He might come later.",
        options: ["certain", "uncertain"],
        answerIndex: 1,
        explain: "might signals uncertainty.",
      },
      {
        type: "classify",
        prompt: "Is this certain or uncertain?",
        sentence: "She will definitely pass.",
        options: ["certain", "uncertain"],
        answerIndex: 0,
        explain: "will + definitely = strong certainty.",
      },
    ],
  },

  // 7) SENTENCE vs PHRASE
  {
    id: 7,
    concept: "Sentence vs Phrase (does it breathe?)",
    mission:
      "Decide whether a chunk is a sentence or a phrase. A sentence needs a subject+verb pair (except commands).",
    bridge:
      "Spanish often implies the subject. Still: the verb is the heartbeat. If you can detect the heartbeat, you can read.",
    hint:
      "Phrase = incomplete idea. Sentence = complete thought (subject+verb). Commands count as sentences.",
    puzzles: [
      {
        type: "mc",
        prompt: "Sentence or phrase?",
        stem: "Running fast",
        options: ["sentence", "phrase"],
        answerIndex: 1,
        explain: "No clear subject + finite verb → phrase.",
      },
      {
        type: "mc",
        prompt: "Sentence or phrase?",
        stem: "She is running fast.",
        options: ["sentence", "phrase"],
        answerIndex: 0,
        explain: "Subject (she) + verb (is running) → sentence.",
      },
      {
        type: "mc",
        prompt: "Sentence or phrase? (command rule)",
        stem: "Sit down.",
        options: ["sentence", "phrase"],
        answerIndex: 0,
        explain: "Command = sentence with implied subject (you).",
      },
      {
        type: "mc",
        prompt: "Sentence or phrase?",
        stem: "Because she was tired",
        options: ["sentence", "phrase"],
        answerIndex: 1,
        explain:
          "Dependent clause can’t stand alone → functions as incomplete chunk here.",
      },
    ],
  },

  // 8) CLAUSES
  {
    id: 8,
    concept: "Independent vs Dependent Clauses",
    mission:
      "Select the dependent clause (can’t stand alone), then the independent clause (can stand alone).",
    bridge:
      "Spanish readings chain clauses. If you can spot the independent clause, long Spanish sentences stop being scary.",
    hint:
      "Dependent often starts with because/although/when/if. Independent clause can stand alone as a sentence.",
    puzzles: [
      {
        type: "dual-select",
        prompt: "Select DEPENDENT clause, then INDEPENDENT clause.",
        sentence: "Because she was tired, she went home.",
        dependent: [0, 1, 2, 3],
        independent: [5, 6, 7],
        explain:
          "Because she was tired = dependent. she went home = independent.",
      },
      {
        type: "dual-select",
        prompt: "Select DEPENDENT clause, then INDEPENDENT clause.",
        sentence: "Although they studied, they failed the quiz.",
        dependent: [0, 1, 2],
        independent: [4, 5, 6, 7],
        explain:
          "Although they studied = dependent. they failed the quiz = independent.",
      },
      {
        type: "dual-select",
        prompt: "Select DEPENDENT clause, then INDEPENDENT clause.",
        sentence: "When the class ended, the students left quickly.",
        dependent: [0, 1, 2, 3],
        independent: [5, 6, 7, 8],
        explain:
          "When the class ended = dependent. the students left quickly = independent.",
      },
    ],
  },

  // 9) ADJECTIVES + SPANISH PLACEMENT + ADVERBS
  {
    id: 9,
    concept: "Adjectives & Adverbs + Spanish adjective placement",
    mission:
      "Identify adjectives/adverbs, then practice Spanish-style adjective placement (noun + adjective).",
    bridge:
      "Common Spanish pattern: noun + adjective (coche rojo). You’ll practice that movement explicitly.",
    hint:
      "Adjective describes a noun. Adverb describes a verb (often ends -ly in English).",
    puzzles: [
      {
        type: "select",
        prompt: "Select the ADJECTIVE.",
        sentence: "The red car is fast.",
        targets: [{ label: "adjective", indices: [1] }],
        explain:
          "red describes car. Spanish often: el coche rojo (noun + adjective).",
      },
      {
        type: "select",
        prompt: "Select the ADVERB.",
        sentence: "She speaks clearly in class.",
        targets: [{ label: "adverb", indices: [2] }],
        explain: "clearly describes speaks (how she speaks).",
      },
      {
        type: "reorder",
        prompt:
          "Spanish placement practice: build the phrase in Spanish order (article + noun + adjective).",
        bank: ["rojo", "coche", "el"],
        answers: [["el", "coche", "rojo"]],
        explain:
          "Spanish commonly places the adjective after the noun: el coche rojo.",
      },
      {
        type: "fix",
        prompt: "Fix the modifier form (good vs well).",
        sentence: "She speaks good.",
        choices: ["well", "good"],
        answerIndex: 0,
        explain: "speaks needs an adverb: well. Spanish parallels: bien vs bueno.",
      },
    ],
  },

  // 10) POSSESSION — NO APOSTROPHE-S IN SPANISH
  {
    id: 10,
    concept: "Possession: Spanish has no apostrophe-s",
    mission:
      "Practice rewriting English apostrophe-s as 'of' (and preview Spanish 'de').",
    bridge:
      "Spanish does NOT use apostrophe-s. Instead it uses 'de': el libro de Juan = John’s book.",
    hint:
      "English: John's book → the book of John. Spanish: el libro de Juan.",
    puzzles: [
      {
        type: "mc",
        prompt: "Rewrite in English without apostrophe-s (choose the best).",
        stem: "John's book →",
        options: ["the book of John", "the John's book", "the book John's"],
        answerIndex: 0,
        explain: "Correct: the book of John. This mirrors Spanish structure.",
      },
      {
        type: "mc",
        prompt: "Rewrite in English without apostrophe-s (choose the best).",
        stem: "Monmouth University's campus →",
        options: [
          "the campus of Monmouth University",
          "Monmouth University campus of",
          "the campus Monmouth University's",
        ],
        answerIndex: 0,
        explain: "Correct: the campus of Monmouth University.",
      },
      {
        type: "reorder",
        prompt: "Build the English 'of' phrase (no apostrophe-s):",
        bank: ["book", "of", "John", "the"],
        answers: [["the", "book", "of", "John"]],
        explain: "English paraphrase that matches Spanish logic: the book of John.",
      },
      {
        type: "reorder",
        prompt: "Spanish preview (structure only): build the Spanish-style phrase:",
        bank: ["de", "Juan", "libro", "el"],
        answers: [["el", "libro", "de", "Juan"]],
        explain: "Spanish possession uses de: el libro de Juan.",
      },
      {
        type: "mc",
        prompt: "Choose the best Spanish-logic paraphrase (English).",
        stem: "Lisa's car →",
        options: ["the car of Lisa", "Lisa car", "the Lisa's car"],
        answerIndex: 0,
        explain: "the car of Lisa (English paraphrase). Spanish: el coche de Lisa.",
      },
    ],
  },

  // 11) FINAL X-RAY
  {
    id: 11,
    concept: "Final X-Ray (full diagnosis)",
    mission:
      "Full scan: verbs, subjects, dependent clause, independent clause, adjective, adverb.",
    bridge:
      "If you can do this in English, Spanish structure becomes a puzzle you can actually solve.",
    hint: "Go in order: VERB → SUBJECT → CLAUSES → MODIFIERS.",
    puzzles: [
      {
        type: "xray",
        prompt: "Step through the targets. You must correctly tag each part to finish.",
        sentence: "Although the students were tired, they studied carefully in the library.",
        xrayTargets: [
          { label: "verb", prompt: "Select the VERB(S).", indices: [3, 7] }, // were, studied
          { label: "subject", prompt: "Select the SUBJECT of the dependent clause.", indices: [1, 2] }, // the students
          { label: "dependent", prompt: "Select the DEPENDENT clause.", indices: [0, 1, 2, 3, 4] }, // Although...
          { label: "independent", prompt: "Select the INDEPENDENT clause.", indices: [6, 7, 8, 9, 10, 11] }, // they studied...
          { label: "adjective", prompt: "Select the ADJECTIVE.", indices: [4] }, // tired
          { label: "adverb", prompt: "Select the ADVERB.", indices: [8] }, // carefully
        ],
        explain: "You just did the full grammar scan. This is exactly the skill Spanish rewards.",
      },
    ],
  },
];

// ----------------------------- DOM -----------------------------
const els = {
  levelLabel: document.getElementById("levelLabel"),
  conceptLabel: document.getElementById("conceptLabel"),
  mission: document.getElementById("mission"),
  bridge: document.getElementById("bridge"),
  bank: document.getElementById("bank"),
  built: document.getElementById("built"),
  feedback: document.getElementById("feedback"),
  checks: document.getElementById("checks"),
  hint: document.getElementById("hint"),
  score: document.getElementById("score"),
  streak: document.getElementById("streak"),
  nextBtn: document.getElementById("nextBtn"),
  checkBtn: document.getElementById("checkBtn"),
  resetBtn: document.getElementById("resetBtn"),
  undoBtn: document.getElementById("undoBtn"),
  shuffleBtn: document.getElementById("shuffleBtn"),
  hintBtn: document.getElementById("hintBtn"),
};

// ----------------------------- State -----------------------------
let levelIndex = 0;
let puzzleIndex = 0;

let score = 0;
let streak = 0;

// selection state
let selected = new Set();

// reorder state
let builtOrder = [];

// multi-step state used by dual-select and xray
let step = 0;

// for mc/fix/classify: user must select a choice, then press Check
let chosenIndex = null;

// scramble seed for consistent redraw within a puzzle
let scrambleOrder = [];

// ----------------------------- Helpers -----------------------------
function currentLevel() { return LEVELS[levelIndex]; }
function currentPuzzle() { return currentLevel().puzzles[puzzleIndex]; }

function tokenize(sentence) {
  return sentence
    .replace(/([,.!?;:])/g, " $1 ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");
}

function normalizeTokens(tokens) {
  const noSpaceBefore = new Set([",", ".", "!", "?", ";", ":"]);
  let out = "";
  tokens.forEach((t, i) => {
    if (i === 0) { out += t; return; }
    if (noSpaceBefore.has(t)) out += t;
    else out += " " + t;
  });
  return out.trim();
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setFeedback(msg, kind) {
  els.feedback.textContent = msg;
  els.feedback.classList.remove("good", "bad");
  if (kind) els.feedback.classList.add(kind);
}

function updateStats() {
  els.score.textContent = String(score);
  els.streak.textContent = String(streak);
}

function shuffledIndices(n) {
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

function selectionSummary(tokens) {
  if (!tokens || tokens.length === 0) return "…";
  if (selected.size === 0) return "Click words to select them (buttons are scrambled on purpose).";
  const picked = Array.from(selected).sort((a, b) => a - b).map(i => tokens[i]);
  return `Selected: ${normalizeTokens(picked)}`;
}

function renderBuiltPanel(text) {
  els.built.textContent = text || "…";
}

function clearInteractionState() {
  selected = new Set();
  builtOrder = [];
  step = 0;
  scrambleOrder = [];
  chosenIndex = null;
}

function renderHeader() {
  els.levelLabel.textContent = `Level ${currentLevel().id}`;
  els.conceptLabel.textContent = currentLevel().concept;
  els.mission.textContent = currentLevel().mission;
  els.bridge.textContent = currentLevel().bridge;
  els.hint.textContent = "";
}

function renderControls() {
  const p = currentPuzzle();
  let html = `<li><strong>${escapeHtml(p.prompt || "")}</strong></li>`;

  if (p.type === "mc") {
    html += `<li class="small">Choose one (then press Check):</li>`;
    html += `<li>${p.options.map((opt, i) =>
      `<button class="token" data-choice="${i}">${escapeHtml(opt)}</button>`
    ).join(" ")}</li>`;
  }

  if (p.type === "classify") {
    html += `<li class="small">Choose one (then press Check):</li>`;
    html += `<li>${p.options.map((opt, i) =>
      `<button class="token" data-choice="${i}">${escapeHtml(opt)}</button>`
    ).join(" ")}</li>`;
  }

  if (p.type === "fix") {
    html += `<li class="small">Choose the correct fix (then press Check):</li>`;
    html += `<li>${p.choices.map((opt, i) =>
      `<button class="token" data-choice="${i}">${escapeHtml(opt)}</button>`
    ).join(" ")}</li>`;
  }

  if (p.type === "dual-select") {
    html += `<li class="small"><em>Two steps:</em> first select the dependent clause, then the independent clause.</li>`;
    html += `<li class="small">Current step: <strong>${step === 0 ? "DEPENDENT" : "INDEPENDENT"}</strong></li>`;
  }

  if (p.type === "xray") {
    const t = p.xrayTargets[step];
    html += `<li class="small">X-Ray Step ${step + 1}/${p.xrayTargets.length}: <em>${escapeHtml(t.prompt)}</em></li>`;
  }

  if (p.type === "reorder") {
    html += `<li class="small">Click words to build the phrase. Use Undo/Reset if needed.</li>`;
  }

  els.checks.innerHTML = html;

  // attach choice handlers (select only; grading happens on Check)
  els.checks.querySelectorAll("[data-choice]").forEach(btn => {
    const i = Number(btn.getAttribute("data-choice"));

    // highlight selected option
    if (chosenIndex === i) btn.style.borderColor = "#6ee7ff";

    btn.addEventListener("click", () => {
      chosenIndex = i;
      setFeedback("Selected. Now press Check.", null);
      els.nextBtn.disabled = true; // do not allow advancing early
      renderControls();            // re-render to update highlights
    });
  });
}

function renderSentenceBank() {
  const p = currentPuzzle();
  els.bank.innerHTML = "";

  // REORDER PUZZLES
  if (p.type === "reorder") {
    p.bank.forEach((w) => {
      const btn = document.createElement("button");
      btn.className = "token";
      btn.textContent = w;
      btn.addEventListener("click", () => {
        builtOrder.push(w);
        setFeedback("", null);
        els.nextBtn.disabled = true;
        renderBuiltPanel(normalizeTokens(builtOrder));
      });
      els.bank.appendChild(btn);
    });
    renderBuiltPanel(builtOrder.length ? normalizeTokens(builtOrder) : "Build the phrase here…");
    return;
  }

  // MC: show stem in built; no word bank
  if (p.type === "mc") {
    renderBuiltPanel(p.stem);
    return;
  }
  // FIX/CLASSIFY: show sentence in built; no word bank
  if (p.type === "fix" || p.type === "classify") {
    renderBuiltPanel(p.sentence);
    return;
  }

  // SELECTION PUZZLES: scrambled token buttons
  const sentence = (p.sentence || "").trim();
  const tokens = tokenize(sentence);

  if (scrambleOrder.length !== tokens.length) scrambleOrder = shuffledIndices(tokens.length);

  scrambleOrder.forEach((idx) => {
    const tok = tokens[idx];
    const btn = document.createElement("button");
    btn.className = "token";
    btn.textContent = tok;

    if (selected.has(idx)) btn.style.borderColor = "#6ee7ff";

    btn.addEventListener("click", () => {
      if (selected.has(idx)) selected.delete(idx);
      else selected.add(idx);
      setFeedback("", null);
      els.nextBtn.disabled = true;
      renderSentenceBank();
      renderBuiltPanel(selectionSummary(tokens));
    });

    els.bank.appendChild(btn);
  });

  renderBuiltPanel(selectionSummary(tokens));
}

function resetPuzzle() {
  clearInteractionState();
  setFeedback("", null);
  els.nextBtn.disabled = true;

  // Scramble reorder bank by default
  const p = currentPuzzle();
  if (p.type === "reorder" && Array.isArray(p.bank)) {
    for (let i = p.bank.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p.bank[i], p.bank[j]] = [p.bank[j], p.bank[i]];
    }
  }

  renderControls();
  renderSentenceBank();
}

function shufflePuzzle() {
  const p = currentPuzzle();
  if (p.type === "reorder" && Array.isArray(p.bank)) {
    for (let i = p.bank.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p.bank[i], p.bank[j]] = [p.bank[j], p.bank[i]];
    }
    renderSentenceBank();
    setFeedback("Shuffled.", null);
    return;
  }
  setFeedback("Tokens are already scrambled for selection puzzles.", null);
}

function undo() {
  const p = currentPuzzle();
  if (p.type === "reorder") {
    builtOrder.pop();
    els.nextBtn.disabled = true;
    renderBuiltPanel(builtOrder.length ? normalizeTokens(builtOrder) : "Build the phrase here…");
    return;
  }

  if (selected.size === 0) return;
  const arr = Array.from(selected);
  selected.delete(arr[arr.length - 1]);
  els.nextBtn.disabled = true;
  renderSentenceBank();
}

function equalsSet(a, b) {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

function checkSelect(tokens, label) {
  const p = currentPuzzle();
  const t = p.targets[0];
  const targetSet = new Set(t.indices);

  if (equalsSet(selected, targetSet)) {
    score += 3;
    streak += 1;
    updateStats();
    setFeedback(`✅ Correct ${label}! ${p.explain || ""}`, "good");
    els.nextBtn.disabled = false;
  } else {
    streak = 0;
    updateStats();
    const picked = Array.from(selected).sort((a, b) => a - b).map(i => tokens[i]);
    setFeedback(
      `❌ Not quite. You selected: "${normalizeTokens(picked)}". ${currentLevel().hint}`,
      "bad"
    );
    els.nextBtn.disabled = true;
  }
}

function checkReorder() {
  const p = currentPuzzle();
  const builtStr = normalizeTokens(builtOrder);
  const ok = p.answers.some(ans => normalizeTokens(ans) === builtStr);

  if (ok) {
    score += 4;
    streak += 1;
    updateStats();
    setFeedback(`✅ Correct. ${p.explain || ""}`, "good");
    els.nextBtn.disabled = false;
  } else {
    streak = 0;
    updateStats();
    setFeedback(`❌ Not quite. You built: "${builtStr}". Reset and try again.`, "bad");
    els.nextBtn.disabled = true;
  }
}

function checkDualSelect() {
  const p = currentPuzzle();
  const depSet = new Set(p.dependent);
  const indSet = new Set(p.independent);

  if (step === 0) {
    if (equalsSet(selected, depSet)) {
      score += 2;
      streak += 1;
      updateStats();
      setFeedback("✅ Dependent clause correct. Now select the INDEPENDENT clause.", "good");
      step = 1;
      selected = new Set();
      scrambleOrder = [];
      els.nextBtn.disabled = true;
      renderControls();
      renderSentenceBank();
    } else {
      streak = 0;
      updateStats();
      setFeedback("❌ Not quite. Select the dependent clause (it can’t stand alone).", "bad");
    }
    return;
  }

  if (equalsSet(selected, indSet)) {
    score += 3;
    streak += 1;
    updateStats();
    setFeedback(`✅ Independent clause correct! ${p.explain || ""}`, "good");
    els.nextBtn.disabled = false;
  } else {
    streak = 0;
    updateStats();
    setFeedback("❌ Not quite. Select the clause that can stand alone.", "bad");
    els.nextBtn.disabled = true;
  }
}

function checkXray(tokens) {
  const p = currentPuzzle();
  const target = p.xrayTargets[step];
  const targetSet = new Set(target.indices);

  if (equalsSet(selected, targetSet)) {
    score += 2;
    streak += 1;
    updateStats();
    setFeedback(`✅ ${target.label.toUpperCase()} correct.`, "good");

    step += 1;
    selected = new Set();
    scrambleOrder = [];
    els.nextBtn.disabled = true;

    if (step >= p.xrayTargets.length) {
      score += 6;
      updateStats();
      setFeedback(`🏁 X-Ray complete. ${p.explain || ""}`, "good");
      els.nextBtn.disabled = false;
    }

    renderControls();
    renderSentenceBank();
  } else {
    streak = 0;
    updateStats();
    setFeedback(`❌ Not quite. ${target.prompt}`, "bad");
    els.nextBtn.disabled = true;
  }
}

function checkAnswer() {
  const p = currentPuzzle();

  // MC/FIX/CLASSIFY: grade only on Check
  if (p.type === "mc" || p.type === "fix" || p.type === "classify") {
    if (chosenIndex === null) {
      setFeedback("Choose an option in Quick Checks, then press Check.", "bad");
      els.nextBtn.disabled = true;
      return;
    }

    const correct = (chosenIndex === p.answerIndex);
    if (correct) {
      score += 3;
      streak += 1;
      updateStats();
      setFeedback(`✅ Correct. ${p.explain || ""}`, "good");
      els.nextBtn.disabled = false;
    } else {
      streak = 0;
      updateStats();
      setFeedback(`❌ Not quite. ${currentLevel().hint}`, "bad");
      els.nextBtn.disabled = true;
    }
    return;
  }

  if (p.type === "reorder") {
    checkReorder();
    return;
  }

  const tokens = tokenize(p.sentence);

  if (p.type === "select") {
    checkSelect(tokens, p.targets[0].label);
    return;
  }

  if (p.type === "dual-select") {
    checkDualSelect();
    return;
  }

  if (p.type === "xray") {
    checkXray(tokens);
    return;
  }

  setFeedback("Unsupported puzzle type.", "bad");
}

function next() {
  const lvl = currentLevel();

  if (puzzleIndex < lvl.puzzles.length - 1) {
    puzzleIndex += 1;
    resetPuzzle();
    setFeedback("Next challenge.", null);
    return;
  }

  if (levelIndex < LEVELS.length - 1) {
    levelIndex += 1;
    puzzleIndex = 0;
    renderHeader();
    resetPuzzle();
    setFeedback("Level up. New concept unlocked.", "good");
    return;
  }

  setFeedback("🏁 You finished Sentence X-Ray Bootcamp. You’re ready for Spanish structure.", "good");
  els.nextBtn.disabled = true;
  els.checkBtn.disabled = true;
  renderBuiltPanel(makeCompletionSummary());
}

function makeCompletionSummary() {
  const mins = Math.max(1, Math.round((performance.now() / 1000) / 60));
  const code = `SLX-${LEVELS.length}-${score}-${Math.floor(Math.random() * 9000 + 1000)}`;
  return [
    "Sentence X-Ray — Completion Summary",
    "----------------------------------",
    `Levels Completed: ${LEVELS.length}/${LEVELS.length}`,
    `Score: ${score}`,
    `Estimated time: ~${mins} min`,
    "",
    "What I can do now:",
    "- Find the verb first (the heartbeat).",
    "- Identify the subject (who is doing the verb).",
    "- Use tag questions to discover pronouns and subject–verb pairing.",
    "- Spot agreement and tense mismatches.",
    "- Tell sentence vs phrase.",
    "- Identify dependent vs independent clauses.",
    "- Identify adjectives/adverbs and understand Spanish adjective placement.",
    "- Rewrite apostrophe-s possession as 'of' (Spanish uses 'de').",
    "",
    "Verification Code:",
    code
  ].join("\n");
}

// ----------------------------- Init -----------------------------
function init() {
  renderHeader();
  updateStats();
  resetPuzzle();

  els.checkBtn.addEventListener("click", checkAnswer);
  els.resetBtn.addEventListener("click", resetPuzzle);
  els.undoBtn.addEventListener("click", undo);
  els.shuffleBtn.addEventListener("click", shufflePuzzle);
  els.nextBtn.addEventListener("click", next);
  els.hintBtn.addEventListener("click", () => {
    els.hint.textContent = currentLevel().hint;
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkAnswer();
  });
}

init();
