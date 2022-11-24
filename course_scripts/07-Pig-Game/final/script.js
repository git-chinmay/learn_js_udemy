'use strict';

////// Select elements ////////////////
//Selecting by Id can be done in two ways
const score0El = document.querySelector('#score--0');
//or const score0El = document.getElementById('name--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const sectionPlayer0El = document.querySelector('.player--0');
const sectionPlayer1El = document.querySelector('.player--1');

//Selecting all button element
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');



///// Set the initial default values for elements /////
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let FinalScore = [0, 0];
let gameState = true;

//Player switch and current score reset
const switchPlayer = function(){
    //making current active player score =0
    document.getElementById(`current--${activePlayer}`).textContent = 0; 
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    //Toggle the section activation
    sectionPlayer0El.classList.toggle('player--active');
    sectionPlayer1El.classList.toggle('player--active');
}

//// Rolling the dice functionality ////
btnRollEl.addEventListener('click', function(){

    if (gameState)
    {
        //1- Generate a random dice number 0-6
        const dice = Math.trunc(Math.random() * 6) + 1
        console.log(dice);

        //2-Display the dice with number
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`

        //3-If 1 generate swicth the player
        if (dice !== 1){
            // Add the dice to score

            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else{
            //Switch the player
            switchPlayer();
        }
    }
})

/////What happen when use click hold score button/////

btnHoldEl.addEventListener('click', function(){

    if (gameState)
    {
        //1- Current score saved in Final score
        FinalScore[activePlayer] += currentScore

        //2-Display the Final score
        document.getElementById(`score--${activePlayer}`).textContent = FinalScore[activePlayer];

        //3- If Final score >= 100 end the Game
        if (FinalScore[activePlayer] >= 100){
            gameState = false;
            //Hide the dice
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            //document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else{
            //4-Make Current score of current active player zero & Swicth the Active player section
            switchPlayer();

        }
    }
})


//// Reseting the Game on New Game button click ////

btnNewEl.addEventListener('click', function(){
    // Reset current scores to zero
    current0El.textContent = 0;
    current1El.textContent = 0;
    currentScore = 0;

    // Rset Final scores to zero
    score0El.textContent = 0;
    score1El.textContent = 0;
    FinalScore = [0, 0];

    // Remove the player winner class
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');

    // Reset Active player to 0
    activePlayer = 0;

    // Setting the gamesttaus to true for new game
    gameState = true;
})




