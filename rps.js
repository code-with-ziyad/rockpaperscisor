// Initialize scores
let userScore = 0;
let computerScore = 0;

// Function to get the computer's choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissor'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to play a round of Rock-Paper-Scissors
function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    let result;

    if (userChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissor') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissor' && computerChoice === 'paper')
    ) {
        result = "You win!";
        userScore++;
    } else {
        result = "Computer wins!";
        computerScore++;
    }

    // Update the scores in the HTML
    document.getElementById('you').innerText = userScore;
    document.getElementById('computer').innerText = computerScore;
    document.getElementById('move').innerText = `You chose ${userChoice}, Computer chose ${computerChoice}. ${result}`;

    // Save the game state to JSON
    saveGameState();
}

// Function to save the game state in JSON format
function saveGameState() {
    const gameState = {
        userScore: userScore,
        computerScore: computerScore,
    };
    localStorage.setItem('rpsGameState', JSON.stringify(gameState));
}

// Load the game state from JSON
function loadGameState() {
    const gameState = JSON.parse(localStorage.getItem('rpsGameState'));
    if (gameState) {
        userScore = gameState.userScore;
        computerScore = gameState.computerScore;
        document.getElementById('you').innerText = userScore;
        document.getElementById('computer').innerText = computerScore;
    }
}


// Add event listeners to the choices
document.getElementById('rock').addEventListener('click', () => playRound('rock'));
document.getElementById('paper').addEventListener('click', () => playRound('paper'));
document.getElementById('scissor').addEventListener('click', () => playRound('scissor'));


function resetGame() {
    userScore = 0;
    computerScore = 0;
    document.getElementById('you').innerText = userScore;
    document.getElementById('computer').innerText = computerScore;
    document.getElementById('move').innerText = "Game reset. Play your move!";
    
    // Clear the saved game state
    localStorage.removeItem('rpsGameState');
}

// Load the game state when the page is loaded
window.onload = loadGameState;