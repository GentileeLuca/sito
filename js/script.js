/* ============================================================
   Definizione DOM ELEMENTS
============================================================ */
const introSection = document.getElementById('intro');
const startBtn = document.getElementById('start-btn');

const quizContainer = document.getElementById('quiz-container');
const questionWrapper = document.getElementById('question-wrapper');
const optionsForm = document.getElementById('options-form');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const resultsContainer = document.getElementById('results-container');
const scoreSpan = document.getElementById('score');
const retryBtn = document.getElementById('retry-btn');
const reviewWrapper = document.getElementById('review-wrapper');

/* ============================================================
   ARRAY DI DOMANDE
   (sostituisci i testi e le opzioni con quelle reali)
============================================================ */
const quizData = [
  {
    question: '1. Che cosa significa “Erek Apaim”?',
    options: [
      '“Il Santo di Israele”',
      '“Colui che è paziente nell’ira”',
      '“Padre misericordioso”',
      '“Grazia abbondante”',
    ],
    correctIndex: 1,
  },
  {
    question:
      '2. Nella Bibbia, l’ira di Dio è frequentemente usata come metafora per:',
    options: [
      'Il giudizio finale',
      'La giustizia divina che purifica',
      'La guarigione del popolo',
      'Il perdono incondizionato',
    ],
    correctIndex: 1,
  },
  // ... aggiungi qui tutte le 10 domande sullo stesso modello ...
  {
    question:
      '3. Un esempio della pazienza di Dio nell’Antico Testamento è:',
    options: [
      'L’episodio del Diluvio Universale',
      'La distruzione di Sodoma e Gomorra',
      'L’esodo dall’Egitto',
      'La ribellione di Israele nel deserto per 40 anni',
    ],
    correctIndex: 3,
  },
  {
    question:
      '4. Quale passaggio della Lettera ai Romani parla dell’ira di Dio?',
    options: [
      'Romani 3:23',
      'Romani 5:8',
      'Romani 1:18',
      'Romani 8:28',
    ],
    correctIndex: 2,
  },
  {
    question:
      '5. Secondo l’insegnamento di Gesù, come si concilia l’ira con l’amore di Dio?',
    options: [
      'L’ira è un’illusione; esiste solo l’amore',
      'L’ira di Dio è un segno del suo affetto profondo',
      'L’amore di Dio giace “sotto” l’ira, portando al pentimento',
      'L’ira di Dio e l’amore sono mutuamente esclusivi',
    ],
    correctIndex: 2,
  },
  {
    question:
      '6. “Lento all’Ira” sottolinea che Dio dà agli uomini:',
    options: [
      'Una seconda possibilità immediata',
      'Tempo per pentirsi prima del giudizio',
      'La capacità di ignorare il male',
      'La salvezza garantita',
    ],
    correctIndex: 1,
  },
  {
    question:
      '7. Un’altra traduzione di “Erek Apaim” è:',
    options: [
      '“Paziente nell’amore”',
      '“Lento a giudicare”',
      '“Colmo di misericordia”',
      '“Giusto e santo”',
    ],
    correctIndex: 1,
  },
  {
    question:
      '8. Quale profeta dell’Antico Testamento enfatizza la lunga pazienza di Dio?',
    options: [
      'Isaia',
      'Geremia',
      'Giona',
      'Abacuc',
    ],
    correctIndex: 2,
  },
  {
    question:
      '9. Nel Nuovo Testamento, l’ira di Dio è vista soprattutto come:',
    options: [
      'Punizione per i peccatori incalliti',
      'Prova della sua inesistenza',
      'Sfida alla fede dei credenti',
      'Segno della sua debolezza',
    ],
    correctIndex: 0,
  },
  {
    question:
      '10. Alla fine del quiz, un credente dovrebbe comprendere che la “lentezza all’ira” di Dio è:',
    options: [
      'Una debolezza divina',
      'Solo un’espressione poetica',
      'Manifestazione del suo amore e giustizia insieme',
      'Un concetto solo per esperti teologi',
    ],
    correctIndex: 2,
  },
];

/* ============================================================
   VARIABILI DI STATO DEL QUIZ
============================================================ */
let currentQuestionIndex = 0;
const userAnswers = new Array(quizData.length).fill(null);

/* ============================================================
   INIZIALIZZA EVENT LISTENERS
============================================================ */
startBtn.addEventListener('click', startQuiz);
prevBtn.addEventListener('click', showPrevious);
nextBtn.addEventListener('click', showNextOrFinish);
retryBtn.addEventListener('click', resetQuiz);

/* ============================================================
   FUNZIONE startQuiz: Nasconde la sezione intro e mostra la 1ª domanda
============================================================ */
function startQuiz() {
  introSection.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  renderQuestion();
}

/* ============================================================
   FUNZIONE renderQuestion: Mostra la domanda corrente e le opzioni
============================================================ */
function renderQuestion() {
  const qData = quizData[currentQuestionIndex];
  // Imposta il testo della domanda
  questionWrapper.innerHTML = `<h2>Domanda ${
    currentQuestionIndex + 1
  } di ${quizData.length}</h2>
  <p class="question-text">${qData.question}</p>`;

  // Ricostruisci le opzioni nel form
  optionsForm.innerHTML = '';
  qData.options.forEach((optText, idx) => {
    const optionId = `option-${idx}`;
    const isChecked = userAnswers[currentQuestionIndex] === idx ? 'checked' : '';

    const optionHTML = `
      <label class="option" for="${optionId}">
        <input
          type="radio"
          name="answer"
          id="${optionId}"
          value="${idx}"
          ${isChecked}
        />
        ${optText}
      </label>
    `;
    optionsForm.insertAdjacentHTML('beforeend', optionHTML);
  });

  // Abilita/disabilita pulsante “Precedente”
  prevBtn.disabled = currentQuestionIndex === 0;

  // Cambia testo di “Prossima” in “Mostra Risultati” se è l’ultima domanda
  nextBtn.textContent =
    currentQuestionIndex === quizData.length - 1 ? 'Mostra Risultati' : 'Prossima';
}

/* ============================================================
   FUNZIONE showPrevious: Torna alla domanda precedente (se esiste)
============================================================ */
function showPrevious() {
  saveCurrentAnswer();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

/* ============================================================
   FUNZIONE showNextOrFinish: Validazione + avanti o risultati
============================================================ */
function showNextOrFinish() {
  const selected = optionsForm.answer.value;
  if (selected === undefined) {
    // Nessuna opzione selezionata: mostro un alert o un messaggio di errore
    alert('Seleziona una risposta prima di andare avanti.');
    return;
  }

  saveCurrentAnswer();

  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    // Ultima domanda: mostra risultati
    displayResults();
  }
}

/* ============================================================
   FUNZIONE saveCurrentAnswer: Memorizza la risposta dell’utente
============================================================ */
function saveCurrentAnswer() {
  const formData = new FormData(optionsForm);
  const answerValue = formData.get('answer');
  userAnswers[currentQuestionIndex] = answerValue !== null ? Number(answerValue) : null;
}

/* ============================================================
   FUNZIONE calculateScore: Restituisce punteggio totale corretto
============================================================ */
function calculateScore() {
  return userAnswers.reduce((sum, ans, idx) => {
    if (ans === quizData[idx].correctIndex) {
      return sum + 1;
    }
    return sum;
  }, 0);
}

/* ============================================================
   FUNZIONE displayResults: Mostra la sezione dei risultati
============================================================ */
function displayResults() {
  saveCurrentAnswer();
  quizContainer.classList.add('hidden');
  resultsContainer.classList.remove('hidden');

  const totalScore = calculateScore();
  scoreSpan.textContent = `${totalScore}/${quizData.length}`;

  // Costruisco il riepilogo per ogni domanda
  reviewWrapper.innerHTML = '';
  quizData.forEach((qData, idx) => {
    const userAns = userAnswers[idx];
    const isCorrect = userAns === qData.correctIndex;
    const wrapperClass = isCorrect ? 'review-item correct' : 'review-item wrong';

    // Testo della risposta scelta (o “Non risposta” se null)
    const userText = userAns !== null ? qData.options[userAns] : '<i>Non hai risposto</i>';
    const correctText = qData.options[qData.correctIndex];

    const reviewHTML = `
      <div class="${wrapperClass}">
        <p><strong>Domanda ${idx + 1}:</strong> ${qData.question}</p>
        <p><strong>La tua risposta:</strong> ${userText}</p>
        <p><strong>Risposta corretta:</strong> ${correctText}</p>
      </div>
    `;
    reviewWrapper.insertAdjacentHTML('beforeend', reviewHTML);
  });
}

/* ============================================================
   FUNZIONE resetQuiz: Riporta tutto allo stato inziale
============================================================ */
function resetQuiz() {
  // Reimposto indici e risposte
  currentQuestionIndex = 0;
  for (let i = 0; i < userAnswers.length; i++) {
    userAnswers[i] = null;
  }

  resultsContainer.classList.add('hidden');
  introSection.classList.remove('hidden');

  // Ripristino pulsanti prev/next
  prevBtn.disabled = true;
  nextBtn.textContent = 'Prossima';
}
