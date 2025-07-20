// DOM Elements
const menu = document.getElementById('menu');
const quizContainer = document.getElementById('quiz-container');
const cardQuizBtn = document.getElementById('card-quiz-btn');
const yakuQuizBtn = document.getElementById('yaku-quiz-btn');
const cardToYakuQuizBtn = document.getElementById('card-to-yaku-quiz-btn');
const backToTopBtn = document.getElementById('back-to-top-btn');

const scoreArea = document.getElementById('score-area');
const questionArea = document.getElementById('question-area');
const imageArea = document.getElementById('image-area');
const optionsArea = document.getElementById('options-area');
const feedbackArea = document.getElementById('feedback-area');
const nextBtn = document.getElementById('next-btn');

// Quiz State
let currentQuizType = '';
let currentQuizMode = '';
let currentCard;
let currentYaku;
let score = 0;

// --- Event Listeners ---
cardQuizBtn.addEventListener('click', () => startQuiz('card'));
yakuQuizBtn.addEventListener('click', () => startQuiz('yaku'));
cardToYakuQuizBtn.addEventListener('click', () => startQuiz('card-to-yaku'));
nextBtn.addEventListener('click', () => nextQuestion());
backToTopBtn.addEventListener('click', () => {
    quizContainer.classList.add('hidden');
    menu.classList.remove('hidden');
});

// --- Functions ---
function startQuiz(type) {
    currentQuizType = type;
    score = 0;
    updateScore();
    menu.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    nextQuestion();
}

function updateScore() {
    scoreArea.textContent = `スコア: ${score}`;
}

function nextQuestion() {
    feedbackArea.innerHTML = '';
    nextBtn.classList.add('hidden');
    optionsArea.innerHTML = '';
    imageArea.innerHTML = '';

    if (currentQuizType === 'card') {
        currentQuizMode = Math.random() < 0.5 ? 'month' : 'type';
        if (currentQuizMode === 'month') {
            showCardMonthQuestion();
        } else {
            showCardTypeQuestion();
        }
    } else if (currentQuizType === 'yaku') {
        showYakuQuestion();
    } else if (currentQuizType === 'card-to-yaku') {
        showCardToYakuQuestion();
    }
}

function showCardMonthQuestion() {
    currentCard = cards[Math.floor(Math.random() * cards.length)];
    questionArea.innerHTML = '<h2>この札は何月？</h2>';
    imageArea.innerHTML = `<img src="${currentCard.image}" alt="花札">`;

    const correctAnswer = currentCard.month;
    const options = generateOptions(correctAnswer, () => Math.floor(Math.random() * 12) + 1);
    displayOptions(options, val => `${val}月`, (selected) => checkAnswer(selected, correctAnswer, 'month'));
}

function showCardTypeQuestion() {
    currentCard = cards[Math.floor(Math.random() * cards.length)];
    questionArea.innerHTML = '<h2>この札の種類は？</h2>';
    imageArea.innerHTML = `<img src="${currentCard.image}" alt="花札">`;

    const typeMap = { 'hikari': '光札', 'tane': 'タネ札', 'tanzaku': '短冊札', 'kasu': 'カス札' };
    const correctAnswer = currentCard.type;
    const allTypes = Object.keys(typeMap);
    const options = generateOptions(correctAnswer, () => allTypes[Math.floor(Math.random() * allTypes.length)]);
    displayOptions(options, val => typeMap[val], (selected) => checkAnswer(selected, correctAnswer, 'type'));
}

function showYakuQuestion() {
    currentYaku = yaku[Math.floor(Math.random() * yaku.length)];
    questionArea.innerHTML = '<h2>この役は何？</h2>';
    imageArea.innerHTML = currentYaku.cards.map(img => `<img src="${img}" alt="花札" class="yaku-card">`).join('');

    const correctAnswer = currentYaku.name;
    const options = generateOptions(correctAnswer, () => yaku[Math.floor(Math.random() * yaku.length)].name);
    displayOptions(options, val => val, (selected) => checkAnswer(selected, correctAnswer, 'yaku'));
}

function showCardToYakuQuestion() {
    // Find a card that is part of at least one yaku
    let cardWithYaku;
    let containingYaku = [];
    while (containingYaku.length === 0) {
        cardWithYaku = cards[Math.floor(Math.random() * cards.length)];
        containingYaku = yaku.filter(y => y.cards.includes(cardWithYaku.image));
    }
    currentCard = cardWithYaku;

    questionArea.innerHTML = `<h2>この札が含まれる役は次のうちどれ？</h2>`;
    imageArea.innerHTML = `<img src="${currentCard.image}" alt="花札">`;

    const correctAnswer = containingYaku[Math.floor(Math.random() * containingYaku.length)].name;
    const options = generateOptions(correctAnswer, () => yaku[Math.floor(Math.random() * yaku.length)].name);
    displayOptions(options, val => val, (selected) => checkAnswer(selected, correctAnswer, 'card-to-yaku'));
}

// --- Helper Functions for Quiz Generation ---
function generateOptions(correctAnswer, randomGenerator) {
    const options = [correctAnswer];
    while (options.length < 4) {
        const randomOption = randomGenerator();
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }
    return options.sort(() => Math.random() - 0.5);
}

function displayOptions(options, formatter, onClickHandler) {
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = formatter(option);
        button.onclick = () => onClickHandler(option);
        optionsArea.appendChild(button);
    });
}

function checkAnswer(selected, correct, mode) {
    const buttons = optionsArea.getElementsByTagName('button');
    for (let btn of buttons) {
        btn.disabled = true;
    }

    if (selected === correct) {
        feedbackArea.innerHTML = '<p class="correct">正解！</p>';
        score++;
        updateScore();
        if (mode === 'yaku') {
            const correctYaku = yaku.find(y => y.name === correct);
            feedbackArea.innerHTML += `<p><strong>${correctYaku.name}</strong>: ${correctYaku.points}点</p>`;
        }
    } else {
        let correctAnswerText = '';
        if (mode === 'month') {
            correctAnswerText = `${correct}月`;
        } else if (mode === 'type') {
            const typeMap = { 'hikari': '光札', 'tane': 'タネ札', 'tanzaku': '短冊札', 'kasu': 'カス札' };
            correctAnswerText = typeMap[correct];
        } else if (mode === 'yaku' || mode === 'card-to-yaku') {
            const correctYaku = yaku.find(y => y.name === correct);
            correctAnswerText = correctYaku ? `${correctYaku.name} (${correctYaku.points}点)` : correct;
        }
        feedbackArea.innerHTML = `<p class="incorrect">不正解... 正解は ${correctAnswerText} でした。</p>`;
    }
    nextBtn.classList.remove('hidden');
}

// --- Initialization ---
function init() {
    console.log('App initialized.');
}

init();