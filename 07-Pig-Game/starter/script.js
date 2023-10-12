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

console.log("ciao");


const game = {
    winner: false,
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
            if (this.current === 0) {
                current0.textContent = Number(current0.textContent) + number;
            } else {
                current1.textContent = Number(current1.textContent) + number;
            }
        }
    },
    switch: function () {
        if (this.current === 0) {
            current0.textContent = 0;
            player0.classList.remove('player--active');
            player1.classList.add('player--active');
            this.current = 1;
        } else {
            current1.textContent = 0;
            player1.classList.remove('player--active');
            player0.classList.add('player--active');
            this.current = 0;
        }
    },
    hold: function () {
        if (this.winner) return;
        if (this.current === 0) {
            score0.textContent = Number(score0.textContent) + Number(current0.textContent);
            if (Number(score0.textContent) >= 100) this.win();
            else this.switch();
        } else {
            score1.textContent = Number(score1.textContent) + Number(current1.textContent);
            if (Number(score1.textContent) >= 100) this.win();
            else this.switch();
        }
    },
    win: function () {
        this.winner = true;
        if (this.current === 0) {
            player0.classList.add('player--winner');
        } else {
            player1.classList.add('player--winner');
        }
    }
}

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

