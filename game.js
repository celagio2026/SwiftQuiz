
const choices = Array.from(document.getElementsByClassName('choice-text'));
const scoreText = document.getElementById('score');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: "Who is Taylor Swift's main producer?",
        choice1: "Jack Antonoff",
        choice2: "Lana Del Rey",
        choice3: "Steve Jobs",
        choice4: "Manny Pacquiao",
        answer: 1
    },
    {
        question: "What is the total revenue of Taylor Swift's Reputation tour?",
        choice1: "$355.7 million",
        choice2: "$102.84 million",
        choice3: "$345.7 million",
        choice4: "562.49 million",
        answer: 3
    },
    {
        question: "Who is the cat of Taylor that appeared in her 'Midnight Mayhem With Me' series?",
        choice1: "Chiyo Ortega",
        choice2: "Meredith Grey",
        choice3: "Olivia Benson",
        choice4: "Benjamin Button",
        answer: 2
    },
    {
        question: "Up until what Taylor album did Sir JM collect?",
        choice1: "Lover",
        choice2: "Fearless (Taylor's Version)",
        choice3: "RED",
        choice4: "none of the above",
        answer: 3
    },
    {
        question: "Complete the Taylor song: Meet me at ________.",
        choice1: "Philippine Science High School",
        choice2: "SM Supermarket, we got it all for you",
        choice3: "at the back of the church",
        choice4: "Midnight",
        answer: 4
    },
    {
        question: "When was Taylor Swift's MTV VMA speech interrupted?",
        choice1: "September 16, 2009",
        choice2: "September 13, 2009",
        choice3: "October 13, 2009",
        choice4: "October 18, 2009",
        answer: 2
    }
];

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 6;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        if (classToApply === 'incorrect') {
            incrementScore(-1);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startGame();
