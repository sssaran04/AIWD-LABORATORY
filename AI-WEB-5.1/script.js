const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        correct: 2
    },
    {
        question: "Who wrote Romeo and Juliet?",
        options: ["Jane Austen", "William Shakespeare", "Mark Twain", "Charles Dickens"],
        correct: 1
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correct: 2
    }
];

let timeRemaining = 10;
let timerInterval;
let quizSubmitted = false;
let selectedAnswers = [null, null, null, null, null];

function initializeQuiz() {
    renderQuestions();
    startTimer();
}

function renderQuestions() {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = '';

    quizData.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.innerHTML = `<span class="question-number">Q${index + 1}.</span> ${q.question}`;
        questionDiv.appendChild(questionText);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        q.options.forEach((option, optIndex) => {
            const label = document.createElement('label');
            label.className = 'option-label';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question${index}`;
            radio.value = optIndex;
            radio.dataset.questionIndex = index;
            radio.onchange = (e) => {
                selectedAnswers[index] = parseInt(e.target.value);
            };

            const span = document.createElement('span');
            span.className = 'option-text';
            span.textContent = option;

            label.appendChild(radio);
            label.appendChild(span);
            optionsDiv.appendChild(label);
        });

        questionDiv.appendChild(optionsDiv);
        questionContainer.appendChild(questionDiv);
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining === 5) {
            displayWarningMessage();
        }

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            autoSubmitQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timeRemaining;

    if (timeRemaining <= 5) {
        timerElement.style.color = '#ff6b6b';
    } else {
        timerElement.style.color = '#667eea';
    }
}

function displayWarningMessage() {
    const warningMessage = document.getElementById('warningMessage');
    warningMessage.textContent = 'Only 5 seconds remaining!';
}

function submitQuiz() {
    if (quizSubmitted) return;

    clearInterval(timerInterval);
    quizSubmitted = true;
    updateTimerDisplay();
    disableAllOptions();
    calculateScore();
    showScorePage();
}

function autoSubmitQuiz() {
    submitQuiz();
}

function disableAllOptions() {
    const allRadios = document.querySelectorAll('input[type="radio"]');
    allRadios.forEach(radio => {
        radio.disabled = true;
    });

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
}

function calculateScore() {
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            score++;
        }
    });
    return score;
}

function showScorePage() {
    const quizContent = document.getElementById('quizContent');
    const scoreSection = document.getElementById('scoreSection');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const warningMessage = document.getElementById('warningMessage');

    const finalScore = calculateScore();
    scoreDisplay.textContent = `${finalScore}/5`;

    warningMessage.style.display = 'none';
    quizContent.style.display = 'none';
    scoreSection.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', initializeQuiz);
