'use strict';

// console.log('Hello . 😊')

// // Accessing the DOM Elements
// console.log(document.querySelector('.between').textContent)
// let x = document.querySelector('.between').textContent
// x = "I am hacked."
// console.log(x)

// console.log(document.querySelector('.message').textContent)
// console.log(document.querySelector('.label-score').textContent)
// console.log(document.querySelector('.label-highscore').textContent)
// console.log(document.querySelector('.score').textContent)
// document.querySelector('.score').textContent = 100
// console.log(document.querySelector('.score').textContent)

//Event Listener
// Messing with check event.
// want to see the same no in console what you feed to guess box

//seq 2-Generating Random number
let secretNumber = Math.trunc(Math.random() * 20) + 1;


//seq 3-Score
let score = 20

//seq-5 Add High score
let highScore = 0

//Refactoring
const displayMessage = function (message) {
    console.log(document.querySelector('.message').textContent = message);
}

// seq 1- event listen
document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    if (!guess) {
        displayMessage("No number input!");
    }
    else if (guess === secretNumber) {
        //console.log(document.querySelector('.message').textContent = "Correct Guess!")
        displayMessage("Correct Guess!")
        //Display the secret number on the box when successful
        document.querySelector('.number').textContent = secretNumber;
        // seq 4- change background color to green when success , change width
        document.querySelector('body').style.backgroundColor = '#60b347'
        document.querySelector('.number').style.width = '30rem'

        // Set current score as highscore when gretaerthan
        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
    }
    // seq - 6 Refactoring the repeated code
    else {

        if (score > 1) {
            score--;
            //console.log(document.querySelector('.message').textContent = guess > secretNumber ? "Too high." : "Too Low.");
            displayMessage(guess > secretNumber ? "Too high." : "Too Low.")
            console.log(document.querySelector('.score').textContent = score);
        }
        else {
            //console.log(document.querySelector('.message').textContent = "You lost!")
            displayMessage("You lost!");
            document.querySelector('.score').textContent = 0;
            console.log(document.querySelector('.score').textContent);
        }

    }


    // else if (guess > secretNumber) {
    //     if (score > 1) {
    //         score--;
    //         console.log(document.querySelector('.message').textContent = "Too high.")
    //         console.log(document.querySelector('.score').textContent = score);
    //     }
    //     else {
    //         console.log(document.querySelector('.message').textContent = "You lost!")
    //         document.querySelector('.score').textContent = 0;
    //         console.log(document.querySelector('.score').textContent);
    //     }

    // }
    // else {
    //     if (score > 1) {
    //         score--;
    //         console.log(document.querySelector('.message').textContent = "Too Low.")
    //         console.log(document.querySelector('.score').textContent = score);
    //     }
    //     else {
    //         console.log(document.querySelector('.message').textContent = "You lost!")
    //         document.querySelector('.score').textContent = 0;
    //         console.log(document.querySelector('.score').textContent);
    //     }
    // }
})


// Coding challenge
// Game Reset Functionality
document.querySelector('.again').addEventListener('click', function () {
    // Reseting score
    score = 20
    document.querySelector('.score').textContent = score

    // Reseting secret field number and width
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.number').textContent = '?'
    document.querySelector('.number').style.width = '15rem'

    //Reseting the message
    //document.querySelector('.message').textContent = 'Start guessing...'
    displayMessage('Start guessing...')

    //Reseting the guessing number to empty
    document.querySelector('.guess').value = ""

    //Reseting the Background color
    document.querySelector('body').style.backgroundColor = '#222'
})