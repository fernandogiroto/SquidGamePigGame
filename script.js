'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

diceEl.classList.add('hidden');
score0El.textContent = 0
score1El.textContent = 0

let scores = [0,0];
let playing = true;
let canRoll = false;
let currentScore = 0;
let activePlayer = 0;

const init = function(){
    scores = [0,0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

btnRoll.addEventListener('click', function(){
    if(playing){
        canRoll = true;
        const dice = Math.trunc((Math.random() * 6) + 1);
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
     
        if(dice != 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else{
            changePLayer();
        }
    }
}); 

const changePLayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    canRoll = false;
}

btnNew.addEventListener('click',init);

btnHold.addEventListener('click', function(){
    if(playing){
        if(canRoll){
            scores[activePlayer] += currentScore;
            document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
            if(scores[activePlayer]>100){
                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
                playing = false;
                diceEl.classList.add('hidden');
            }else{
                changePLayer();
            }
        }

    }
});


// MODAL 
const modal = document.querySelector('.modal'); 
const overlay = document.querySelector('.overlay'); 
const btnCloseModal = document.querySelector('.close-modal'); 
const btnOpenModal = document.querySelectorAll('.show-modal'); 

const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
const openModal = function(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
} 
btnOpenModal.forEach(e => {
    e.addEventListener('click',openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown',function(e){
    if(e.key === 'Escape' && !modal.classList.contains('hidden')){
        closeModal(); 
    }
})
