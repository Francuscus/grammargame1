/* Sentence Lab — single-file, no libraries.
   Host on GitHub Pages: Settings → Pages → Deploy from branch → /root
*/

const LEVELS = [
  {
    id: 1,
    concept: "Subject + Verb (sentence vs phrase)",
    mission: "Build a complete sentence that has a SUBJECT and a VERB.",
    bridge: "Spanish can hide the subject inside the verb (Hablo = I speak). English usually shows SUBJECT + VERB separately.",
    checks: [
      "Find the SUBJECT (who/what).",
      "Find the VERB (did what).",
      "Does it feel like a complete thought?"
    ],
    hint: "A sentence can be as short as TWO words in English: someone + action.",
    puzzles: [
      { bank: ["They","run","fast"], answers: [["They","run","fast"],["They","run"]] },
      { bank: ["Maria","studies"], answers: [["Maria","studies"]] },
      { bank: ["The","dog","barks"], answers: [["The","dog","barks"]] }
    ]
  },
  {
    id: 2,
    concept: "Subject Pronouns (who are you pointing at?)",
    mission: "Build the sentence, then swap the subject for a pronoun (same meaning).",
    bridge: "Spanish often drops subject pronouns because the verb ending already points to the subject.",
    checks: [
      "Subject pronoun matches the subject (he/she/they…).",
      "Verb still fits the subject in English."
    ],
    hint: "Replace a name with: he / she / they / we / I.",
    puzzles: [
      { bank: ["Natalie","is","a","student"], answers: [["Natalie","is","a","student"],["She","is","a","student"]] },
      { bank: ["Matthew","walked","to","the","gym"], answers: [["Matthew","walked","to","the","gym"],["He","walked","to","the","gym"]] }
    ]
  },
  {
    id: 3,
    concept: "Verb Types (action vs linking vs helping)",
    mission: "Build the sentence. Then identify the verb type from the choices.",
    bridge: "Spanish uses different verbs for 'to be' depending on meaning; noticing linking verbs early helps later.",
    checks: [
      "Action verb: does something (run, eat).",
      "Linking verb: connects subject to description (is, seems).",
      "Helping verb: helps another verb (can, will, have)."
    ],
    hint: "If the verb links to an adjective/noun, it’s probably LINKING.",
    puzzles: [
      {
        bank: ["She","is","tired"],
        answers: [["She","is","tired"]],
        verbQuiz: { correct: "linking", prompt: "Verb type?", options: ["action","linking","helping"] }
      },
      {
        bank: ["They","can","swim"],
        answers: [["They","can","swim"]],
        verbQuiz: { correct: "helping", prompt: "Verb type?", options: ["action","linking","helping"] }
      }
    ]
  },
  {
    id: 4,
    concept: "Time & Reality (tense + certainty)",
    mission: "Build a sentence that shows WHEN and HOW SURE it is.",
    bridge: "Spanish verb endings carry lots of info: time, subject, and sometimes mood (certainty/doubt).",
    checks: [
      "Past often ends in -ed in English (walked).",
      "Future often uses will + verb.",
      "Uncertainty often uses might / may."
    ],
    hint: "Look for will (future) and might (uncertain).",
    puzzles: [
      { bank: ["I","ate","yesterday"], answers: [["I","ate","yesterday"]] },
      { bank: ["We","will","study","tonight"], answers: [["We","will","study","tonight"]] },
      { bank: ["He","might","come","later"], answers: [["He","might","come","later"]] }
    ]
  },
  {
    id: 5,
    concept: "Modifiers (adjectives & adverbs)",
    mission: "Build the sentence so the adjective describes a noun and the adverb modifies the verb.",
    bridge: "Spanish adjectives often move after the noun; learning what adjectives DO makes the later word order feel logical.",
    checks: [
      "Adjective describes a noun (a happy student).",
      "Adverb modifies a verb (speaks well)."
    ],
    hint: "Ask: does it describe a THING (adjective) or an ACTION (adverb)?",
    puzzles: [
      { bank: ["The","happy","student","speaks","well"], answers: [["The","happy","student","speaks","well"]] },
      { bank: ["She","runs","quickly"], answers: [["She","runs","quickly"]] }
    ]
  },
  {
    id: 6,
    concept: "Prepositions (where/when/with what?)",
    mission: "Build the sentence and make sure the preposition connects correctly.",
    bridge: "Spanish prepositions are fewer but powerful (a, de, en, con…). Training the concept first helps later.",
    checks: [
      "Preposition links nouns to other words (in, at, from, with).",
      "Prepositional phrase is an 'extra' (not the main verb)."
    ],
    hint: "Prepositions often start an 'extra chunk' (in the park, with my friend).",
    puzzles: [
      { bank: ["I","study","in","the","library"], answers: [["I","study","in","the","library"]] },
      { bank: ["They","came","from","Mexico"], answers: [["They","came","from","Mexico"]] }
    ]
  },
  {
    id: 7,
    concept: "Clauses (independent vs subordinate)",
    mission: "Build the full sentence by attaching a dependent (subordinate) clause to an independent one.",
    bridge: "Spanish reads like ‘lego sentences’: long chains of clauses. Your superpower is spotting SUBJECT+VERB pairs.",
    checks: [
      "Independent clause can stand alone.",
      "Subordinate clause cannot stand alone (because…, although…, when…)."
    ],
    hint: "If it starts with because/although/when, it’s probably dependent.",
    puzzles: [
      { bank: ["Because","she","was","tired",",","she","went","home"], answers: [["Because","she","was","tired",",","she","went","home"]] },
      { bank: ["Although","they","studied",",","they","failed"], answers: [["Although","they","studied",",","they","failed"]] }
    ]
  },
  {
    id: 8,
    concept: "Conjunctions (and/but/because/although)",
    mission: "Build a sentence that correctly joins two ideas and shows the relationship (add/contrast/cause).",
    bridge: "Spanish conjunctions behave similarly—if you feel the logic, the Spanish words become easy labels.",
    checks: [
      "and = addition",
      "but = contrast",
      "because = cause",
      "although = contrast + surprise"
    ],
    hint: "Say it aloud: does it sound like addition, contrast, or cause?",
    puzzles: [
      { bank: ["She","studies","but","she","is","tired"], answers: [["She","studies","but","she","is","tired"]] },
      { bank: ["We","left","because","it","rained"], answers: [["We","left","because","it","rained"]] }
    ]
  }
];

// ---------- State ----------
let levelIndex = 0;
let puzzleIndex = 0;
let built = [];
let usedIdx = new Set();

let score = 0;
let streak = 0;

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

function currentLevel() { return LEVELS[levelIndex]; }
function currentPuzzle() { return currentLevel().puzzles[puzzleIndex]; }

function normalize(arr){
  // Join tokens with single spaces, but keep punctuation tight.
  const noSpaceBefore = new Set([",",".","!","?",";",":"]);
  let out = "";
  arr.forEach((t,i)=>{
    if(i===0){ out += t; return; }
    if(noSpaceBefore.has(t)) out += t;
    else out += " " + t;
  });
  return out.trim();
}

function setFeedback(msg, kind){
  els.feedback.textContent = msg;
  els.feedback.classList.remove("good","bad");
  if(kind) els.feedback.classList.add(kind);
}

function renderChecks(){
  els.checks.innerHTML = "";
  currentLevel().checks.forEach(c=>{
    const li = document.createElement("li");
    li.textContent = c;
    els.checks.appendChild(li);
  });
}

function renderHeader(){
  els.levelLabel.textContent = `Level ${currentLevel().id}`;
  els.conceptLabel.textContent = currentLevel().concept;
  els.mission.textContent = currentLevel().mission;
  els.bridge.textContent = currentLevel().bridge;
  els.hint.textContent = "";
  els.score.textContent = String(score);
  els.streak.textContent = String(streak);
  renderChecks();
}

function renderBuilt(){
  els.built.textContent = built.length ? normalize(built) : "…";
}

function renderBank(){
  els.bank.innerHTML = "";
  const bankWords = currentPuzzle().bank.slice();

  bankWords.forEach((word, idx)=>{
    const btn = document.createElement("button");
    btn.className = "token";
    btn.textContent = word;

    if(usedIdx.has(idx)) btn.classList.add("disabled");

    btn.addEventListener("click", ()=>{
      if(usedIdx.has(idx)) return;
      usedIdx.add(idx);
      built.push(word);
      setFeedback("", null);
      els.nextBtn.disabled = true;
      renderBuilt();
      renderBank();
    });

    els.bank.appendChild(btn);
  });
}

function resetPuzzle(){
  built = [];
  usedIdx = new Set();
  setFeedback("", null);
  els.nextBtn.disabled = true;
  renderBuilt();
  renderBank();
}

function shufflePuzzle(){
  // Shuffle bank words to make it feel game-y without changing answers.
  const p = currentPuzzle();
  for(let i = p.bank.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [p.bank[i], p.bank[j]] = [p.bank[j], p.bank[i]];
  }
  renderBank();
}

function answersMatch(builtArr){
  const builtStr = normalize(builtArr);
  const answers = currentPuzzle().answers;
  return answers.some(ans => normalize(ans) === builtStr);
}

function requireVerbQuizIfAny(){
  const q = currentPuzzle().verbQuiz;
  if(!q) return true;

  const choice = prompt(`${q.prompt}\nOptions: ${q.options.join(", ")}`);
  if(!choice) return false;

  const cleaned = choice.trim().toLowerCase();
  if(cleaned === q.correct){
    score += 2;
    streak += 1;
    setFeedback("✅ Correct verb type!", "good");
    return true;
  } else {
    streak = 0;
    setFeedback(`❌ Not quite. Correct was: ${q.correct}.`, "bad");
    return false;
  }
}

function checkAnswer(){
  if(built.length === 0){
    setFeedback("Build something first.", "bad");
    return;
  }

  if(!answersMatch(built)){
    streak = 0;
    setFeedback("Not quite. Reset and try again — look for the sentence skeleton first (WHO + VERB).", "bad");
    els.streak.textContent = String(streak);
    return;
  }

  // If sentence is correct, do any extra quiz (like verb type).
  const ok = requireVerbQuizIfAny();
  if(!ok){
    // Sentence correct but quiz failed; allow retry without moving on.
    els.streak.textContent = String(streak);
    return;
  }

  score += 3;
  streak += 1;
  els.score.textContent = String(score);
  els.streak.textContent = String(streak);

  setFeedback("✅ Sentence correct! Nice.", "good");
  els.nextBtn.disabled = false;
}

function next(){
  // Advance puzzle; if finished, advance level.
  const lvl = currentLevel();
  if(puzzleIndex < lvl.puzzles.length - 1){
    puzzleIndex += 1;
    resetPuzzle();
    setFeedback(`Next challenge in Level ${lvl.id}.`, null);
    return;
  }

  if(levelIndex < LEVELS.length - 1){
    levelIndex += 1;
    puzzleIndex = 0;
    renderHeader();
    resetPuzzle();
    setFeedback("Level up! New concept unlocked.", "good");
    return;
  }

  setFeedback("🏁 You finished Sentence Lab. You’re ready to see how Spanish compresses these structures.", "good");
  els.nextBtn.disabled = true;
  els.checkBtn.disabled = true;
}

function init(){
  renderHeader();
  resetPuzzle();

  els.checkBtn.addEventListener("click", checkAnswer);
  els.resetBtn.addEventListener("click", resetPuzzle);
  els.undoBtn.addEventListener("click", ()=>{
    if(!built.length) return;
    // Undo last: find that word instance in the bank usedIdx
    const last = built.pop();
    // Remove one matching used index (last clicked). We approximate by removing the last used index.
    // (Good enough for gameplay; bank tokens are duplicated rarely in these puzzles.)
    const arr = Array.from(usedIdx);
    usedIdx.delete(arr[arr.length - 1]);
    setFeedback("", null);
    els.nextBtn.disabled = true;
    renderBuilt();
    renderBank();
  });
  els.shuffleBtn.addEventListener("click", shufflePuzzle);
  els.nextBtn.addEventListener("click", next);
  els.hintBtn.addEventListener("click", ()=>{
    els.hint.textContent = currentLevel().hint;
  });

  // Keyboard: Enter to check
  window.addEventListener("keydown", (e)=>{
    if(e.key === "Enter") checkAnswer();
  });
}

init();
