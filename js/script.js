// ====================== DOM ELEMENTS ======================
const introSection = document.getElementById('intro');
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const questionNumberEl = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreElement = document.getElementById('score');
const scoreTextElement = document.getElementById('score-text');
const feedbackContent = document.getElementById('feedback-content');
const progressBar = document.getElementById('progress-bar');

// ====================== DOMANDE DEL QUIZ ======================
const questions = [
  {
    question:
      "Qual è il significato letterale dell'espressione ebraica 'Erek Apaim'?",
    options: [
      "Lento a perdonare",
      "Lungo di naso",
      "Ricco in benignità",
      "Grande nella misericordia",
    ],
    answer: 1,
    explanation:
      "L'espressione ebraica 'Erek Apaim' significa letteralmente 'lungo di naso'. Nella cultura ebraica, questo si riferisce al fatto che ci vuole molto tempo affinché il naso (simbolo dell'ira) si scaldi, indicando che Dio è lento all'ira.",
  },
  {
    question: "Nella storia di Giuseppe, cosa significa l'espressione 'il suo naso ardeva'?",
    options: [
      "Che Giuseppe aveva la febbre",
      "Che Potifar era molto arrabbiato",
      "Che Giuseppe era in imbarazzo",
      "Che la moglie di Potifar era gelosa",
    ],
    answer: 1,
    explanation:
      "Nella storia di Giuseppe, l'espressione 'il suo naso ardeva' (Genesi 39:19) viene tradotta come 'la sua ira ardeva', indicando che Potifar era molto arrabbiato con Giuseppe.",
  },
  {
    question:
      "Secondo il documento, come viene espressa principalmente l'ira di Dio nella Bibbia?",
    options: [
      "Con punizioni immediate e dirette",
      "Abbandonando le persone alle conseguenze delle loro scelte",
      "Attraverso calamità naturali",
      "Con l'invio di profeti per ammonire",
    ],
    answer: 1,
    explanation:
      "Nella Bibbia, l'ira di Dio viene espressa principalmente abbandonando le persone alle conseguenze delle loro scelte, come nel caso del Faraone e degli Israeliti.",
  },
  {
    question: "Quante possibilità Dio diede al Faraone per liberare Israele?",
    options: ["Tre possibilità", "Sette possibilità", "Dieci possibilità", "Dodici possibilità"],
    answer: 2,
    explanation:
      "Dio diede al Faraone dieci possibilità (le dieci piaghe) per liberare Israele prima di intervenire con giudizio.",
  },
  {
    question:
      "Secondo Romani 1, quante volte Paolo afferma che Dio abbandona le persone alle loro scelte?",
    options: ["Una volta", "Due volte", "Tre volte", "Cinque volte"],
    answer: 2,
    explanation:
      "Nella lettera ai Romani (capitolo 1), Paolo descrive tre volte come Dio abbandoni le persone alle conseguenze delle loro scelte peccaminose.",
  },
  {
    question: "Secondo Romani 2:4, qual è lo scopo della pazienza di Dio?",
    options: [
      "Dimostrare la sua superiorità",
      "Dare più tempo per peccare",
      "Spingere al ravvedimento",
      "Preparare per il giudizio",
    ],
    answer: 2,
    explanation:
      "Romani 2:4 afferma che la bontà, pazienza e costanza di Dio hanno lo scopo di spingere le persone al ravvedimento.",
  },
  {
    question:
      "In che modo Gesù dimostra sia l'amore che l'ira di Dio?",
    options: [
      "Condannando i peccatori",
      "Caricando su di sé le conseguenze del peccato",
      "Sconfiggendo i Romani",
      "Insegnando una nuova legge",
    ],
    answer: 1,
    explanation:
      "Gesù dimostra l'amore e l'ira di Dio caricando su di sé le conseguenze del peccato umano, morendo al posto dei peccatori.",
  },
  {
    question:
      "Quale libro della Bibbia contiene la descrizione di Dio come 'lento all'ira'?",
    options: ["Genesi", "Salmi", "Esodo", "Isaia"],
    answer: 2,
    explanation:
      "La descrizione di Dio come 'misericordioso e pietoso, lento all'ira, ricco in benignità e fedeltà' si trova in Esodo 34:6.",
  },
  {
    question: "Cosa significa secondo il documento che Dio è 'lento all'ira'?",
    options: [
      "Dio non si arrabbia mai",
      "Dio concede molto tempo per cambiare",
      "Dio è indifferente al male",
      "Dio dimentica facilmente i peccati",
    ],
    answer: 1,
    explanation:
      "Dio è 'lento all'ira' significa che Egli concede alle persone molto tempo per cambiare e ravvedersi prima di intervenire con giudizio.",
  },
  {
    question:
      "Quale aspetto del carattere di Dio è più fondamentale della sua ira?",
    options: [
      "La sua onnipotenza",
      "La sua giustizia",
      "La sua compassione e l'amore fedele",
      "La sua santità",
    ],
    answer: 2,
    explanation:
      "La compassione e l'amore fedele di Dio sono aspetti più fondamentali del suo carattere rispetto alla sua ira, che è una risposta alla malvagità umana.",
  },
];

// ====================== STATO DEL QUIZ ======================
let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let score = 0;

// ====================== FUNZIONI PRINCIPALI ======================

function startQuiz() {
  introSection.style.display = 'none';
  quizContainer.style.display = 'block';
  showQuestion(currentQuestion);
  updateProgressBar();
}

function showQuestion(index) {
  const question = questions[index];
  questionText.textContent = question.question;

  optionsContainer.innerHTML = '';
  question.options.forEach((option, i) => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('option');
    if (userAnswers[index] === i) optionElement.classList.add('selected');

    const optionLabel = document.createElement('div');
    optionLabel.classList.add('option-label');
    optionLabel.textContent = String.fromCharCode(65 + i); // A, B, C, D

    const optionText = document.createElement('div');
    optionText.textContent = option;

    optionElement.appendChild(optionLabel);
    optionElement.appendChild(optionText);

    optionElement.addEventListener('click', () => selectOption(i));
    optionsContainer.appendChild(optionElement);
  });

  prevBtn.disabled = index === 0;
  nextBtn.style.display = index < questions.length - 1 ? 'block' : 'none';
  submitBtn.style.display = index === questions.length - 1 ? 'block' : 'none';
  questionNumberEl.textContent = index + 1;
}

function selectOption(optionIndex) {
  userAnswers[currentQuestion] = optionIndex;
  const options = document.querySelectorAll('.option');
  options.forEach((opt) => opt.classList.remove('selected'));
  options[optionIndex].classList.add('selected');
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
    updateProgressBar();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
    updateProgressBar();
  }
}

function updateProgressBar() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function submitQuiz() {
  // Calcolo del punteggio
  score = 0;
  questions.forEach((question, index) => {
    if (userAnswers[index] === question.answer) score++;
  });

  // Mostra risultati
  quizContainer.style.display = 'none';
  resultsContainer.style.display = 'block';
  scoreElement.textContent = `${score}/${questions.length}`;

  // Testo di feedback in base al punteggio
  let text;
  if (score >= 9) {
    text =
      "Eccellente! Hai una profonda comprensione del carattere di Dio e della sua pazienza.";
  } else if (score >= 7) {
    text =
      "Ottimo lavoro! Hai una buona conoscenza del tema 'Lento all'Ira'.";
  } else if (score >= 5) {
    text =
      "Buono! Hai compreso i concetti principali ma potresti approfondire alcuni aspetti.";
  } else {
    text =
      "Continua a studiare! Rileggi il documento per comprendere meglio il carattere di Dio.";
  }
  scoreTextElement.textContent = text;

  // Riepilogo domande + risposte
  feedbackContent.innerHTML = '';
  questions.forEach((question, index) => {
    const feedbackItem = document.createElement('div');
    feedbackItem.classList.add('feedback-item');

    const questionElem = document.createElement('p');
    questionElem.innerHTML = `<strong>Domanda ${index + 1}:</strong> ${question.question}`;
    feedbackItem.appendChild(questionElem);

    const isCorrect = userAnswers[index] === question.answer;
    const userAnswerText =
      userAnswers[index] !== null
        ? question.options[userAnswers[index]]
        : '<i>Non hai risposto</i>';

    const userAnswerElem = document.createElement('p');
    userAnswerElem.innerHTML = `<strong>La tua risposta:</strong> <span style="color: ${
      isCorrect ? 'green' : 'red'
    }">${userAnswerText}</span>`;
    feedbackItem.appendChild(userAnswerElem);

    if (!isCorrect) {
      const correctAnswerElem = document.createElement('p');
      correctAnswerElem.innerHTML = `<strong>Risposta corretta:</strong> <span style="color: green">${
        question.options[question.answer]
      }</span>`;
      feedbackItem.appendChild(correctAnswerElem);
    }

    const explanationElem = document.createElement('p');
    explanationElem.innerHTML = `<strong>Spiegazione:</strong> ${question.explanation}`;
    feedbackItem.appendChild(explanationElem);

    feedbackContent.appendChild(feedbackItem);
  });
}

function restartQuiz() {
  currentQuestion = 0;
  userAnswers = new Array(questions.length).fill(null);
  score = 0;

  resultsContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  showQuestion(currentQuestion);
  updateProgressBar();
}

// ====================== EVENT LISTENERS ======================
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
submitBtn.addEventListener('click', submitQuiz);
restartBtn.addEventListener('click', restartQuiz);
