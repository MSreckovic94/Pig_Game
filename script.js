'use strict';

//Selecting elements
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // const score0El = document.getElementById('score--0);
const score1El = document.querySelector('#score--1'); // const score1El = document.getElementById('score--1);
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden'); //adding a hidden class from style.css to be hidden
  player0el.classList.add('player--active');
  player1el.classList.remove('player--active');
  player0el.classList.remove('player--winner');
  player1el.classList.remove('player--winner');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1, if true, switch to next player
    if (dice !== 1) {
      //Add dice to current score

      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //1. Add current score to active player's score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    diceEl.classList.add('hidden');
    //2.Check if player's score is >= 100
    //Finish the game
    if (scores[activePlayer] >= 20
      ) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      currentScore = 0;
      diceEl.classList.add('hidden');
    }
    //3.Switch to the next player
    else {
      switchPlayer();
    }
  }
});

//Creating new game (reseting values to first state)
btnNew.addEventListener('click', init);
