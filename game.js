/* Sentence Lab — Sentence X-Ray Edition (English → Spanish Bootstrapping)
   Drop-in replacement for your existing game.js.
   Assumes your HTML has IDs: levelLabel, conceptLabel, mission, bridge, bank, built,
   feedback, checks, hint, score, streak, nextBtn, checkBtn, resetBtn, undoBtn,
   shuffleBtn, hintBtn.
*/

const LEVELS = [
  // ------------------ LEVEL 1 ------------------
  {
    id: 1,
    concept: "Find the VERB (always first)",
    mission:
      "Click the verb (the action or linking verb). If you can’t find the verb, you can’t read the sentence.",
    bridge:
      "Spanish hides a lot inside the verb (who + time). Training your eyes to find the verb first makes Spanish feel logical.",
    hint:
      "The verb is what is happening (runs, studied) or what connects a description (is, seems).",
    puzzles: [
      {
        type: "select",
        prompt: "Select the VERB.",
        sentence: "She studies Spanish at night.",
        targets: [{ label: "verb", indices: [1] }],
        explain:
          "studies = the action. Spanish later packs WHO + TIME into the verb ending.",
      },
      {
        type: "select",
        prompt: "Select the VERB.",
        sentence: "The store closes at eight on weekdays.",
        targets: [{ label: "verb", indices: [2] }],
        explain:
          "closes is the verb. Notice the subject is not just the first word; it’s the thing doing the verb.",
      },
      {
        type: "select",
        prompt: "Select the VERB (linking verb).",
        sentence: "They are ready for the exam.",
        targets: [{ label: "verb", indices: [1] }],
        explain:
          "are is a linking verb: it connects the subject to a description (ready).",
      },
      {
        type: "select",
        prompt: "Select the VERB (helping verb phrase).",
        sentence: "We will practice tomorrow.",
        targets: [{ label: "verb", indices: [1, 2] }],
        explain:
          "will practice functions as the verb idea. Spanish often expresses future differently; the key is seeing the verb meaning.",
      },
    ],
  },

  // ------------------ LEVEL 2 ------------------
  {
    id: 2,
    concept: "Find the SUBJECT (who is doing it?)",
    mission:
      "Click the subject (the person/thing doing the verb). Sometimes it’s more than one word.",
    bridge:
      "Spanish can drop the subject word, but the subject still exists logically. You’re training that logic now.",
    hint:
      "Ask: Who/what is doing the verb? Don’t confuse the subject with extra information.",
    puzzles: [
      {
        type: "select",
        prompt: "Select the SUBJECT.",
        sentence: "The happy student studies Spanish.",
        targets: [{ label: "subject", indices: [0, 1, 2] }],
        explain:
          "The happy student = the subject chunk. student is the core noun; the adjective is part of the subject phrase.",
      },
      {
        type: "select",
        prompt: "Select the SUBJECT.",
        sentence: "In the library, my friends read quietly.",
        targets: [{ label: "subject", indices: [3, 4] }],
        explain:
          "my friends = subject. The prepositional phrase 'In the library' is extra (where).",
      },
      {
        type: "select",
        prompt: "Select the SUBJECT (it’s not the first word).",
        sentence: "Yesterday, the team won the game.",
        targets: [{ label: "subject", indices: [1, 2] }],
        explain:
          "the team = subject. Yesterday is a time marker, not the subject.",
      },
      {
        type: "select",
        prompt: "Select the SUBJECT (compound subject).",
        sentence: "Maria and Luis practice every day.",
        targets: [{ label: "subject", indices: [0, 1, 2] }],
        explain:
          "Maria and Luis = compound subject. Two people share the same verb.",
      },
    ],
  },

  // ------------------ LEVEL 3 ------------------
  {
    id: 3,
    concept: "Tag Questions → Pronouns (discover the subject)",
    mission:
      "Use tag questions to identify the hidden subject pronoun (and how English ‘points’ to the subject).",
    bridge:
      "This trains you to feel subject–verb pairing. In Spanish, the verb ending often does this pointing for you.",
    hint:
      "Tags mirror the auxiliary and pronoun: 'He is… isn’t he?' 'They studied… didn’t they?'",
    puzzles: [
      {
        type: "mc",
        prompt:
          "Choose the best tag question ending (the tag that matches the subject + verb).",
        stem: "Natalie is a student, _____?",
        options: ["isn't she", "aren't they", "doesn't she", "isn't it"],
        answerIndex: 0,
        explain:
          "Natalie → she. 'is' becomes 'isn't' in the tag: isn't she?",
      },
      {
        type: "mc",
        prompt: "Choose the best tag ending.",
        stem: "The store closes at eight, _____?",
        options: ["doesn't it", "isn't it", "doesn't it close", "isn't there"],
        answerIndex: 0,
        explain:
          "The store → it. Present simple needs do/does: doesn't it?",
      },
      {
        type: "mc",
        prompt: "Choose the best tag ending.",
        stem: "Matthew walked to the gym, _____?",
        options: ["didn't he", "doesn't he", "wasn't he", "isn't he"],
        answerIndex: 0,
        explain:
          "Past simple uses did: didn't he? Matthew → he.",
      },
      {
        type: "mc",
        prompt: "Choose the best tag ending (plural subject).",
        stem: "Those students are ready, _____?",
        options: ["aren't they", "isn't it", "aren't we", "don't they"],
        answerIndex: 0,
        explain:
          "Those students → they. Verb 'are' → aren't they?",
      },
    ],
  },

  // ------------------ LEVEL 4 ------------------
  {
    id: 4,
    concept: "Subject–Verb Agreement (English → Spanish)",
    mission:
      "Spot agreement errors and fix them. If agreement matters in English, it matters even more in Spanish.",
    bridge:
      "Spanish agreement is stronger: verb endings change clearly with the subject. This level prepares your brain for that.",
    hint:
      "Singular subject usually takes -s in present (he/she/it studies). Plural does not (they study).",
    puzzles: [
      {
        type: "fix",
        prompt: "Fix the agreement error.",
        sentence: "The students studies Spanish.",
        choices: ["study", "studies"],
        answerIndex: 0,
        explain:
          "students = plural → study (no -s). In Spanish, plural agreement is very visible too.",
      },
      {
        type: "fix",
        prompt: "Fix the agreement error.",
        sentence: "My friend and I is late.",
        choices: ["am", "are"],
        answerIndex: 1,
        explain:
          "My friend and I = we → are. (English is irregular here; Spanish will match consistently.)",
      },
      {
        type: "fix",
        prompt: "Fix the agreement error.",
        sentence: "Each student have a book.",
        choices: ["has", "have"],
        answerIndex: 0,
        explain:
          "Each student = singular in meaning → has. Agreement can depend on meaning, not just nearby words.",
      },
      {
        type: "fix",
        prompt: "Fix the agreement error (third person singular).",
        sentence: "He walk to class every day.",
        choices: ["walk", "walks"],
        answerIndex: 1,
        explain:
          "He = 3rd singular → walks. Spanish will show this change in the verb ending too.",
      },
    ],
  },

  // ------------------ LEVEL 5 ------------------
  {
    id: 5,
    concept: "Verb Tense & Reality (time + certainty)",
    mission:
      "Match the verb to the time word, and notice certainty words (might/may/definitely).",
    bridge:
      "Spanish verbs carry time inside them. Later, Spanish also encodes ‘certainty vs doubt’ with mood.",
    hint:
      "Time markers (yesterday/now/tomorrow) must match the verb. Might/may = uncertain.",
    puzzles: [
      {
        type: "fix",
        prompt: "Fix the tense mismatch.",
        sentence: "Yesterday, she walks to class.",
        choices: ["walked", "walks"],
        answerIndex: 0,
        explain:
          "Yesterday = past → walked. Spanish past will show in the verb ending too.",
      },
      {
        type: "classify",
        prompt: "Classify the sentence: is it certain or uncertain?",
        sentence: "He might come later.",
        options: ["certain", "uncertain"],
        answerIndex: 1,
        explain:
          "might signals uncertainty. This is a preview of how Spanish mood will matter later.",
      },
      {
        type: "fix",
        prompt: "Fix the tense mismatch.",
        sentence: "Tomorrow, we practiced in the library.",
        choices: ["will practice", "practiced"],
        answerIndex: 0,
        explain:
          "Tomorrow = future → will practice. Spanish can express future in different ways, but the logic is the same.",
      },
      {
        type: "classify",
        prompt: "Classify the sentence: certain or uncertain?",
        sentence: "She will definitely pass.",
        options: ["certain", "uncertain"],
        answerIndex: 0,
        explain:
          "will + definitely = strong certainty.",
      },
    ],
  },

  // ------------------ LEVEL 6 ------------------
  {
    id: 6,
    concept: "Sentence vs Phrase (does it breathe?)",
    mission:
      "Decide whether a chunk is a sentence or just a phrase. A sentence needs a subject+verb pair (unless command).",
    bridge:
      "Spanish often uses implied subjects; still, the verb is the heartbeat. You’re learning to detect the heartbeat.",
    hint:
      "Phrase = no complete subject+verb pair. Sentence = has it. Commands can be a single verb in English.",
    puzzles: [
      {
        type: "mc",
        prompt: "Is this a sentence or a phrase?",
        stem: "Running fast",
        options: ["sentence", "phrase"],
        answerIndex: 1,
        explain:
          "Running fast has no clear subject+finite verb pair. It’s a phrase.",
      },
      {
        type: "mc",
        prompt: "Is this a sentence or a phrase?",
        stem: "She is running fast.",
        options: ["sentence", "phrase"],
        answerIndex: 0,
        explain:
          "Subject (she) + verb (is running) = sentence.",
      },
      {
        type: "mc",
        prompt: "Is this a sentence or a phrase? (command rule)",
        stem: "Sit down.",
        options: ["sentence", "phrase"],
        answerIndex: 0,
        explain:
          "Commands can be sentences with an implied subject (you). Spanish does this constantly.",
      },
      {
        type: "mc",
        prompt: "Is this a sentence or a phrase?",
        stem: "Because she was tired",
        options: ["sentence", "phrase"],
        answerIndex: 1,
        explain:
          "It has subject+verb, but it can’t stand alone. It’s a dependent clause (functioning like a phrase here).",
      },
    ],
  },

  // ------------------ LEVEL 7 ------------------
  {
    id: 7,
    concept: "Clauses (independent vs dependent)",
    mission:
      "Find the independent clause (can stand alone) and the dependent clause (can’t stand alone).",
    bridge:
      "Spanish readings chain clauses. If you can spot the independent clause, long Spanish sentences stop being scary.",
    hint:
      "Dependent clauses often start with because/although/when/if. Independent clauses can stand alone.",
    puzzles: [
      {
        type: "dual-select",
        prompt:
          "Select the DEPENDENT clause, then select the INDEPENDENT clause.",
        sentence: "Because she was tired, she went home.",
        dependent: [0, 1, 2, 3],
        independent: [5, 6, 7],
        explain:
          "Because she was tired = dependent. she went home = independent.",
      },
      {
        type: "dual-select",
        prompt:
          "Select the DEPENDENT clause, then select the INDEPENDENT clause.",
        sentence: "Although they studied, they failed the quiz.",
        dependent: [0, 1, 2],
        independent: [4, 5, 6, 7],
        explain:
          "Although they studied = dependent. they failed the quiz = independent.",
      },
      {
        type: "dual-select",
        prompt:
          "Select the DEPENDENT clause, then select the INDEPENDENT clause.",
        sentence: "When the class ended, the students left quickly.",
        dependent: [0, 1, 2, 3],
        independent: [5, 6, 7, 8],
        explain:
          "When the class ended = dependent. the students left quickly = independent.",
      },
    ],
  },

  // ------------------ LEVEL 8 ------------------
  {
    id: 8,
    concept: "Adjectives & Adverbs (and Spanish word order shock)",
    mission:
      "Identify adjectives vs adverbs, and practice Spanish-style adjective placement (noun + adjective).",
    bridge:
      "Spanish often places adjectives after the noun (coche rojo). You’ll practice that movement explicitly.",
    hint:
      "Adjective describes a noun. Adverb describes a verb (often ends -ly in English).",
    puzzles: [
      {
        type: "select",
        prompt: "Select the ADJECTIVE (describes a noun).",
        sentence: "The red car is fast.",
        targets: [{ label: "adjective", indices: [1] }],
        explain:
          "red describes car. Later: el coche rojo (noun + adjective) in Spanish is common.",
      },
      {
        type: "select",
        prompt: "Select the ADVERB (describes the verb).",
        sentence: "She speaks clearly in class.",
        targets: [{ label: "adverb", indices: [2] }],
        explain:
          "clearly describes speaks. Spanish often uses an adverb similarly (claramente).",
      },
      {
        type: "reorder",
        prompt:
          "Spanish order practice: click words to build the Spanish-style noun phrase (noun + adjective).",
        bank:
          ["rojo", "coche", "el"],
        answers: [
          ["el", "coche", "rojo"]
        ],
        explain:
          "Spanish typically places the adjective after the noun: el coche rojo.",
        spanishTip: "Notice what moved: 'red car' → 'coche rojo'."
      },
      {
        type: "fix",
        prompt: "Fix the modifier form (good vs well).",
        sentence: "She speaks good.",
        choices: ["well", "good"],
        answerIndex: 0,
        explain:
          "speaks needs an adverb: well. Spanish parallels: bien vs bueno.",
      },
    ],
  },

  // ------------------ FINAL: X-RAY MODE ------------------
  {
    id: 9,
    concept: "Final X-Ray (full diagnosis)",
    mission:
      "Full diagnosis: identify verbs, subjects, dependent clause, independent clause, adjective, and adverb.",
    bridge:
      "If you can do this in English, Spanish structure becomes a puzzle you can actually solve.",
    hint:
      "Go in order: VERB → SUBJECT → clauses → modifiers.",
    puzzles: [
      {
        type: "xray",
        prompt:
          "Step through the targets in order. You must correctly tag each part to finish.",
        sentence:
          "Although the students were tired, they studied carefully in the library.",
        xrayTargets: [
          { label: "verb", prompt: "Select the VERB(s).", indices: [3, 7] }, // were, studied
          { label: "subject", prompt: "Select the SUBJECT of the dependent clause.", indices: [1, 2] }, // the students
          { label: "dependent", prompt: "Select the DEPENDENT clause.", indices: [0, 1, 2, 3, 4] }, // Although the students were tired
          { label: "independent", prompt: "Select the INDEPENDENT clause.", indices: [6, 7, 8, 9, 10, 11] }, // they studied carefully in the library
          { label: "adjective", prompt: "Select the ADJECTIVE.", indices: [4] }, // tired
          { label: "adverb", prompt: "Select the ADVERB.", indices: [8] }, // carefully
        ],
        explain:
          "You just did the full grammar scan: verb(s), subjects, clause structure, modifiers. This is the mental toolkit Spanish rewards.",
      },
    ],
  },
];

// --------------------- DOM ---------------------
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

// --------------------- State ---------------------
let levelIndex = 0;
let puzzleIndex = 0;

let score = 0;
let streak = 0;

// token-selection state for select/dual-select/xray
let selected = new Set();

// reorder state
let builtOrder = [];

// xray step
let xrayStep = 0;

// helpers
function currentLevel() { return LEVELS[levelIndex]; }
function currentPuzzle() { return currentLevel().puzzles[puzzleIndex]; }

function tokenize(sentence) {
  // tokenizes words and keeps punctuation as tokens
  // e.g., "tired, they" => ["tired", ",", "they"]
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

function setFeedback(msg, kind) {
  els.feedback.textContent = msg;
  els.feedback.classList.remove("good", "bad");
  if (kind) els.feedback.classList.add(kind);
}

function updateStats() {
  els.score.textContent = String(score);
  els.streak.textContent = String(streak);
}

function renderHeader() {
  els.levelLabel.textContent = `Level ${currentLevel().id}`;
  els.conceptLabel.textContent = currentLevel().concept;
  els.mission.textContent = currentLevel().mission;
  els.bridge.textContent = currentLevel().bridge;
  els.hint.textContent = "";
}

function clearInteractionState() {
  selected = new Set();
  builtOrder = [];
  xrayStep = 0;
}

function renderBuiltPanel(text) {
  els.built.textContent = text || "…";
}

function renderControls() {
  // Put the current task prompt + any options inside #checks
  const p = currentPuzzle();
  let html = `<li><strong>${escapeHtml(p.prompt || "")}</strong></li>`;

  if (p.type === "mc" || p.type === "classify") {
    html += `<li class="small">Choose one:</li>`;
    html += `<li>${p.options.map((opt, i) =>
      `<button class="token" data-choice="${i}">${escapeHtml(opt)}</button>`
    ).join(" ")}</li>`;
  }

  if (p.type === "fix") {
    html += `<li class="small">Choose the correct fix:</li>`;
    html += `<li>${p.choices.map((opt, i) =>
      `<button class="token" data-choice="${i}">${escapeHtml(opt)}</button>`
    ).join(" ")}</li>`;
  }

  if (p.type === "dual-select") {
    html += `<li class="small">You will do TWO selections. First dependent, then independent (the game will prompt you).</li>`;
  }

  if (p.type === "xray") {
    const step = p.xrayTargets[xrayStep];
    html += `<li class="small">X-Ray Step ${xrayStep + 1}/${p.xrayTargets.length}: <em>${escapeHtml(step.prompt)}</em></li>`;
  }

  if (p.type === "reorder") {
    html += `<li class="small">Click words to build the target phrase. Use Undo/Reset as needed.</li>`;
    if (p.spanishTip) {
      html += `<li class="small"><em>${escapeHtml(p.spanishTip)}</em></li>`;
    }
  }

  els.checks.innerHTML = html;

  // attach handlers for choice buttons if present
  els.checks.querySelectorAll("[data-choice]").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.getAttribute("data-choice"));
      handleChoice(i);
    });
  });
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderSentenceBank() {
  const p = currentPuzzle();
  els.bank.innerHTML = "";

  if (p.type === "reorder") {
    // show bank words for reorder task
    p.bank.forEach((w, idx) => {
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

  // otherwise: show sentence tokens clickable for selection
  const sentence = (p.sentence || p.stem || "").trim();
  const tokens = tokenize(sentence);

  tokens.forEach((tok, idx) => {
    const btn = document.createElement("button");
    btn.className = "token";
    btn.textContent = tok;

    // reflect selection
    if (selected.has(idx)) {
      btn.style.borderColor = "#6ee7ff";
    }

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

function selectionSummary(tokens) {
  if (!tokens || tokens.length === 0) return "…";
  if (selected.size === 0) return "Click words in the sentence to select them.";
  const picked = Array.from(selected).sort((a,b)=>a-b).map(i => tokens[i]);
  return `Selected: ${normalizeTokens(picked)}`;
}

function resetPuzzle() {
  clearInteractionState();
  setFeedback("", null);
  els.nextBtn.disabled = true;
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
  } else {
    // for selection tasks, shuffle doesn't make sense (sentence order matters).
    setFeedback("Shuffle is only used in Spanish-order phrase building challenges.", "bad");
  }
}

function undo() {
  const p = currentPuzzle();
  if (p.type === "reorder") {
    builtOrder.pop();
    renderBuiltPanel(builtOrder.length ? normalizeTokens(builtOrder) : "Build the phrase here…");
    els.nextBtn.disabled = true;
    return;
  }

  // selection undo: remove last selected index
  if (selected.size === 0) return;
  const arr = Array.from(selected);
  selected.delete(arr[arr.length - 1]);
  renderSentenceBank();
  els.nextBtn.disabled = true;
}

function equalsSet(a, b) {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

function checkSelect(targetIndices, tokens, labelForFeedback) {
  const targetSet = new Set(targetIndices);
  if (equalsSet(selected, targetSet)) {
    score += 3;
    streak += 1;
    updateStats();
    setFeedback(`✅ Correct ${labelForFeedback}! ${currentPuzzle().explain || ""}`, "good");
    els.nextBtn.disabled = false;
  } else {
    streak = 0;
    updateStats();
    const picked = Array.from(selected).sort((a,b)=>a-b).map(i => tokens[i]);
    setFeedback(
      `❌ Not quite. You selected: "${normalizeTokens(picked)}". Try again. ${currentLevel().hint}`,
      "bad"
    );
  }
}

function handleChoice(choiceIndex) {
  const p = currentPuzzle();
  if (p.type !== "mc" && p.type !== "classify" && p.type !== "fix") return;

  const correct = (choiceIndex === p.answerIndex);
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
  }
}

function checkDualSelect(tokens) {
  // Two-step: dependent then independent
  const p = currentPuzzle();
  // We store phase in xrayStep variable for convenience: 0=dependent, 1=independent
  const phase = xrayStep;

  const depSet = new Set(p.dependent);
  const indSet = new Set(p.independent);

  if (phase === 0) {
    if (equalsSet(selected, depSet)) {
      score += 2;
      streak += 1;
      updateStats();
      setFeedback("✅ Dependent clause correct. Now select the INDEPENDENT clause.", "good");
      xrayStep = 1;
      selected = new Set();
      renderControls();
      renderSentenceBank();
      els.nextBtn.disabled = true;
    } else {
      streak = 0;
      updateStats();
      setFeedback(`❌ Not quite. Select the dependent clause (it can't stand alone).`, "bad");
    }
    return;
  }

  // phase 1: independent
  if (equalsSet(selected, indSet)) {
    score += 3;
    streak += 1;
    updateStats();
    setFeedback(`✅ Independent clause correct! ${p.explain || ""}`, "good");
    els.nextBtn.disabled = false;
  } else {
    streak = 0;
    updateStats();
    setFeedback(`❌ Not quite. Select the clause that can stand alone.`, "bad");
  }
}

function checkXray(tokens) {
  const p = currentPuzzle();
  const target = p.xrayTargets[xrayStep];
  const targetSet = new Set(target.indices);

  if (equalsSet(selected, targetSet)) {
    score += 2;
    streak += 1;
    updateStats();
    setFeedback(`✅ ${target.label.toUpperCase()} correct.`, "good");

    xrayStep += 1;
    selected = new Set();
    els.nextBtn.disabled = true;

    if (xrayStep >= p.xrayTargets.length) {
      // finished xray
      score += 5;
      updateStats();
      setFeedback(`🏁 X-Ray complete. ${p.explain || ""}`, "good");
      els.nextBtn.disabled = false;
      renderControls();
      renderSentenceBank();
      return;
    }

    renderControls();
    renderSentenceBank();
  } else {
    streak = 0;
    updateStats();
    setFeedback(`❌ Not quite. ${target.prompt}`, "bad");
  }
}

function checkAnswer() {
  const lvl = currentLevel();
  const p = currentPuzzle();

  if (p.type === "reorder") {
    checkReorder();
    return;
  }

  if (p.type === "mc" || p.type === "classify" || p.type === "fix") {
    setFeedback("Choose an option above (in Quick Checks).", "bad");
    return;
  }

  const sentence = (p.sentence || p.stem || "").trim();
  const tokens = tokenize(sentence);

  if (p.type === "select") {
    const t = p.targets[0];
    checkSelect(t.indices, tokens, t.label);
    return;
  }

  if (p.type === "dual-select") {
    checkDualSelect(tokens);
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

  // Completed all levels
  setFeedback("🏁 You finished Sentence X-Ray. You’re ready for Spanish structure.", "good");
  els.nextBtn.disabled = true;
  els.checkBtn.disabled = true;

  // Optional: show a copy-paste completion summary in the built panel
  renderBuiltPanel(makeCompletionSummary());
}

function makeCompletionSummary() {
  const minutes = Math.max(1, Math.round((performance.now() / 1000) / 60));
  const code = `SLX-${LEVELS.length}-${score}-${Math.floor(Math.random() * 9000 + 1000)}`;
  return [
    "Sentence X-Ray — Completion Summary",
    "--------------------------------",
    `Levels Completed: ${LEVELS.length} / ${LEVELS.length}`,
    `Score: ${score}`,
    `Estimated time (this session): ~${minutes} min`,
    "",
    "What I can do now:",
    "- I can find the verb first (the sentence heartbeat).",
    "- I can identify the subject (who is doing the verb).",
    "- I can spot agreement and tense mismatches.",
    "- I can tell sentence vs phrase.",
    "- I can identify dependent vs independent clauses.",
    "- I can identify adjectives vs adverbs and understand Spanish adjective placement.",
    "",
    "Spanish Bridge:",
    "In Spanish, the verb often contains WHO + TIME. This game trained me to see structure before learning forms.",
    "",
    `Verification Code: ${code}`
  ].join("\n");
}

// --------------------- Init / Wiring ---------------------
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

  // Enter to check
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkAnswer();
  });
}

init();
