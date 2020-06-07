/*
GAME RULES:

- The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score.
- If the player rolls a 1, all their ROUND score is lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that their ROUND score gets added to their GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Game Variables
var scores, roundScore, activePlayer, gameIsActive, finalScore;

// Initializing new game
gameInit();

// Roll Dice button Event Listener
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gameIsActive) {
        setWinScore();

        // Generating two random numbers between 1 and 6
        var dice1 = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);

        // Displaying the corresponding dice images
        var diceDOM1 = document.getElementById('dice-1');
        var diceDOM2 = document.getElementById('dice-2');
        diceDOM1.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        if (dice1 !== 1 && dice2 !== 1) {
            // Updating the roundScore if dice roll is greater than 1
            roundScore += (dice1 + dice2);
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            alert('You have rolled 1! Next player\'s turn!');
            // Passing turn the next player
            nextPlayer();
        }

    } else {
        alert('Please press the \'NEW GAME\' button.');
    }
});

// Hold button Event Listener
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gameIsActive) {
        setWinScore();
        // Adding player's currentScore to the scores array and displaying it
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // Checking if the player has won the game
        if (scores[activePlayer] >= finalScore) {

            document.getElementById('name-' + activePlayer).textContent = 'Winner!';

            // hiding the dice images
            hideDice();

            // Adding the winner CSS class to the player panel
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            // Removing the active CSS class from the player panel
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            alert('Player ' + (activePlayer + 1) + ' has won the game!');

            gameIsActive = false;

        } else {
            // Passing turn the next player
            nextPlayer();
        }
    } else {
        alert('Please press the \'NEW GAME\' button.');
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

    // hiding the dice images
    hideDice();
}

// New Game button Event Listener
document.querySelector('.btn-new').addEventListener('click', gameInit);

function gameInit() {

    gameIsActive = true;

    // Removing the winner CSS class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    // Adding back the active CSS class
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    // Hiding the dice image
    hideDice();

    // Resetting the scores
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // Reseting player names
    document.getElementById('name-0').textContent = 'player 1';
    document.getElementById('name-1').textContent = 'player 2';
}

function setWinScore() {

    var input = document.querySelector('.final-score').value;

    if (input) {
        finalScore = input;
    } else {
        finalScore = 100;
    }
}

function hideDice() {
    // hiding the dice images
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}