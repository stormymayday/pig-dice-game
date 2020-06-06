/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Game Variables
var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

// Hiding the dice image
document.querySelector('.dice').style.display = 'none';

// Setting scores to zero
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;

// Roll Dice button Event Listener
document.querySelector('.btn-roll').addEventListener('click', function () {

    // Generating a random number between 1 and 6
    var dice = Math.floor(Math.random() * 6 + 1);

    // Displaying the corresponding dice image
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    if (dice > 1) {
        // Updating the roundScore if dice roll is greater than 1
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        alert('You have rolled 1! Next player\'s turn!');
        // Passing turn the next player
        nextPlayer();
    }
});

// Hold button Event Listener
document.querySelector('.btn-hold').addEventListener('click', function () {
    // Adding player's currentScore to the scores array and displaying it
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    // Checking if the player has won the game
    if (scores[activePlayer] >= 100) {

        document.getElementById('name-' + activePlayer).textContent = 'Winner!';

        // hiding the dice image
        document.querySelector('.dice').style.display = 'none';

        // Adding the winner CSS class to the player panel
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

        // Removing the active CSS class from the player panel
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        alert('Player ' + (activePlayer + 1) + ' has won the game!');
    } else {
        // Passing turn the next player
        nextPlayer();
    }

});

function nextPlayer() {
    // Setting roundScore to zero and displaying it
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;

    // Changing the active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // Adding / Removing / Toggling active class
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // hiding the dice image
    document.querySelector('.dice').style.display = 'none';
}