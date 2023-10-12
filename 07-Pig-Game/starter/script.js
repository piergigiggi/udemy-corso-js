'use strict';

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');

console.log('ciao');

const game = {
  winner: false,
  scores: [0, 0],
  currentScore: 0,
  current: 0,
  reset: function () {
    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    dice.classList.add('hidden');
    this.winner = false;
    this.current = 0;
  },
  roll: function () {
    if (this.winner) return;
    const number = Math.trunc(Math.random() * 6) + 1;
    dice.setAttribute('src', `dice-${number}.png`);
    dice.classList.remove('hidden');
    if (number === 1) {
      this.switch();
    } else {
      this.currentScore += number;
      document.getElementById('current--' + this.current).textContent =
        this.currentScore;
    }
  },
  switch: function () {
    this.currentScore = 0;
    document.getElementById('current--' + this.current).textContent = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    this.current = this.current === 0 ? 1 : 0;
  },
  hold: function () {
    if (this.winner) return;

    this.scores[this.current] += this.currentScore;
    document.getElementById('score--' + this.current).textContent =
      this.scores[this.current];
    if (this.scores[this.current] >= 100) this.win();
    else this.switch();
  },
  win: function () {
    this.winner = true;
    dice.classList.add('hidden');
    document
      .querySelector(`.player--${this.current}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${this.current}`)
      .classList.remove('player--active');
  },
};

btnNew.addEventListener('click', function () {
  game.reset();
});

btnRoll.addEventListener('click', function () {
  game.roll();
});

btnHold.addEventListener('click', function () {
  game.hold();
});

game.reset();
