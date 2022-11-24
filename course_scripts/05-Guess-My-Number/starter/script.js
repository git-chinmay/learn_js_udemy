'use strict';
/*
console.log("Hello Live server!")
console.log(document.querySelector(".between").textContent);
document.querySelector(".between").textContent = "Between 100 and 200"
console.log(document.querySelector(".between").textContent);
*/

// EventListener

// We want some event(click) to happen when check button clicked
// document.querySelector('.check').addEventListener('click', function(){
//     console.log(document.querySelector('.guess').value)
// })

//Add reaction as a function expression
// const x = function(){
//     console.log(document.querySelector('.guess').value)
// }

// document.querySelector('.check').addEventListener('click', x)

// Random number generator
// Mul 20 to generate no between 0-19, +1 because we want 20 included, trunc for removing decimal
const secret_number = Math.trunc(Math.random() * 20) + 1

// Displaying the random number
document.querySelector('.number').textContent = secret_number

//Score
let score = 20;

// Add a message when no input given
document.querySelector('.check').addEventListener('click', function(){
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof(guess))
    if (!guess){
        document.querySelector('.message').textContent = "Enter a number!"
    }
    else if (guess === secret_number){
        document.querySelector('.message').textContent = "Congratz!! Correct Number"
    }
    else if (guess > secret_number){

        if (score > 1){
            document.querySelector('.message').textContent = "Too high."
            score--;
            document.querySelector('.score').textContent = score
        }
        else{
            document.querySelector('.message').textContent = "you lost!"
            document.querySelector('.score').textContent = 0
        }

    }
    else if (guess < secret_number){
        if (score > 1){
            document.querySelector('.message').textContent = "Too low."
            score--;
            document.querySelector('.score').textContent = score
        }
        else{
            document.querySelector('.message').textContent = "you lost!"
            document.querySelector('.score').textContent = 0
        }

    }
    else{
        console.log(document.querySelector('.guess').value)
    }

})

