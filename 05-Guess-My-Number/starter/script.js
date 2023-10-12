'use strict';

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'nuovo messaggio';

// evento click per button check
// document
//   .querySelector('.check')
//   .addEventListener('click', () => console.log('bu bu settete!'));

const game = {
  secretNumber: 0,
  score: 0,
  highscore: 0,
  reset: function () {
    this.secretNumber = Math.trunc(Math.random() * 20) + 1;
    this.score = 20;
    //this.highscore = 0;
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.score').textContent = this.score;
    document.querySelector('.highscore').textContent = this.highscore;
    document.querySelector('.number').textContent = '?';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.guess').value = '';
  },
  sbagliato: function (messaggio) {
    if (this.score > 1) {
      document.querySelector('.message').textContent = messaggio;
      this.score--;
      document.querySelector('.score').textContent = this.score;
    } else {
      document.querySelector('.message').textContent = '🛑 hai perso!';
      document.querySelector('.score').textContent = 0;
    }
  },
  indovinato: function () {
    document.querySelector('.message').textContent = '🎉🎉indovinato!';
    document.querySelector('.number').textContent = this.secretNumber;
    if (this.score > this.highscore) this.highscore = this.score;
    document.querySelector('.highscore').textContent = this.highscore;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
  },
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);
  // nessun numero inserito
  if (!guess) {
    document.querySelector('.message').textContent = '🛑 No number!';
    // numero diverso da secret number
  } else if (guess !== game.secretNumber) {
    game.sbagliato(guess < game.secretNumber ? '🛑 piccolo!' : '🛑 grande!');
    // numero corretto
  } else {
    game.indovinato();
  }
});

document.querySelector('.again').addEventListener('click', function () {
  game.reset();
});

game.reset();
