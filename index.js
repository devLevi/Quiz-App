// 'use strict';
const STORE = [{
        question: '41% of all children are engaged in child labor on this Continent:',
        answers: [
            'Asia',
            'South America',
            'Africa',
            'Jamaica'
        ],
        correctAnswer: 'Africa',
    },
    {
        question: '¼ of the entire global prison population resides in this country:',
        answers: [
            'America',
            'China',
            'Brazil',
            'India'
        ],
        correctAnswer: 'America',
    },
    {
        question: 'This is the largest country in Europe (excluding Russia):',
        answers: [
            'Spain',
            'Ukraine',
            'France',
            'Turkey'
        ],
        correctAnswer: 'Ukraine',
    },
    {
        question: 'This country has the most McDonalds per capita in all of Europe:',
        answers: [
            'France',
            'Greece',
            'Sweden',
            'Germany'
        ],
        correctAnswer: 'Sweden',
    },
    {
        question: 'This country is made up of 790 islands:',
        answers: [
            'Scotland',
            'Japan',
            'Philippines',
            'Falkland Islands'
        ],
        correctAnswer: 'Scotland',
    },
    {
        question: 'It is common for wealthy people in this country to hire doubles to serve their time in prison:',
        answers: [
            'China',
            'Argentina',
            'India',
            'Nigeria'
        ],
        correctAnswer: 'China',
    },
    {
        question: 'This country does not have any rivers running through it:',
        answers: [
            'Saudi Arabia',
            'Morocco',
            'Madagascar',
            'Greenland'
        ],
        correctAnswer: 'Saudi Arabia',
    }
];

let score = 0;
let currentQuestionNumber = 0;

function generateQuestionHtmlPure(questionObj) {
    return `<div class="questionsAndOptionsContainer">
    <div class=questionContainer>${questionObj.question}</div>
    <form id="quizForm">
                <div class=question-wrap>

                    <div class="row">
                        <div class="col-6">
                            <label class="answerOption">
                                <input type="radio" value="${questionObj.answers[0]}" name="answer" required/>
                                <span>${questionObj.answers[0]}</span>
                            </label>
                            </div>
                            <div class="col-6">
                            <label class="answerOption">
                                <input type="radio" value="${questionObj.answers[1]}" name="answer" required/>
                                <span>${questionObj.answers[1]}</span>
                            </label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <label class="answerOption">
                                <input type="radio" value="${questionObj.answers[2]}" name="answer" required/>
                                <span>${questionObj.answers[2]}</span>
                            </label>
                            </div>

                            <div class="col-6">
                            <label class="answerOption">
                                <input type="radio" value="${questionObj.answers[3]}" name="answer" required/>
                                <span>${questionObj.answers[3]}</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="submitAnswerButtonContainer">
                    <input type="submit" class="submit">
                </div>
    </form>
    </div>`
}

function renderView(viewHtml) {
    $('.full-view-container').html(viewHtml);
}

function generateResultsHtml() {
    return `
    <div class="results">
        <h2>You have finished the quiz!</h2><br></br>
        <h2>You got ${score} out of 7 Correct</h2><br></br>
        <button type="submit" class="retakeQuiz">Start Over</button>
    </div>`
}

function renderResults() {
    renderView(generateResultsHtml());
}

function renderNextQuestion() {
    currentQuestionNumber++;
    if (currentQuestionNumber <= STORE.length) {
        let currentQuestionObj = STORE[currentQuestionNumber - 1];
        const questionHTML = generateQuestionHtmlPure(currentQuestionObj);
        renderView(questionHTML);
        $('.questionNumber').text(currentQuestionNumber);
    } else {
        renderResults();
    }
}

function generateFeedbackHtml(isCorrect) {
    let userFeedbackString = ' ';
    if (isCorrect) {
        userFeedbackString = `<h3>You got it right! The correct answer is ${STORE[currentQuestionNumber - 1].correctAnswer}!</h3>`;
    } else {
        userFeedbackString = `<h3>You got it wrong! The correct answer is ${STORE[currentQuestionNumber - 1].correctAnswer}! </h3>`
    }
    return `
        <div class="answerResponse">
         <form>
            ${userFeedbackString}
            <button id="nextQuestionBtn" class="submit">Next
            </button>
         </form>
        </div> `;
}

function renderFeedbackHtml(userSelection) {
    let feedbackHtml = generateFeedbackHtml(userSelection);
    renderView(feedbackHtml);
}

function handleUserSelection() {
    // event.preventDefault();
    let $selected = $('input:checked');
    let answer = $selected.val();
    let correctAnswer = STORE[currentQuestionNumber - 1].correctAnswer;
    let answerIsCorrect = false;
    if (answer === correctAnswer) {
        answerIsCorrect = true;
        score++;
        $('.scoreNumber').text(score);
        STORE[currentQuestionNumber].userAnswerIsCorrect = answerIsCorrect;
    }
    renderFeedbackHtml(answerIsCorrect);
}

function registerEventHandlers() {
    // set up event handlers for buttons
    $('.full-view-container').on('click', '#nextQuestionBtn', renderNextQuestion);
    $('.full-view-container').on('submit', '#quizForm', handleUserSelection);
    $('.full-view-container').on('click', '.retakeQuiz', (event) => {
        location.reload()
    });
}

function runQuiz() {
    registerEventHandlers();
}

runQuiz();
