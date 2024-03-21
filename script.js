// Define winning combinations where the key beats the value
const WINNING_COMBINATIONS = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
};

// Define available choices for the computer
const COMPUTER_CHOICES = ["rock", "paper", "scissors"];

// Declare variables for user and computer choices, and scores
let userChoice;
let computerChoice;
let userWins;
let computerWins;

// Determine the winner of a game round
function determineWinner(userChoice, computerChoice) {
    // Check for a tie
    if (userChoice === computerChoice) {
        return "tie";
    }

    // Check if user wins
    if (WINNING_COMBINATIONS[userChoice] === computerChoice) {
        return true; // Return true if user wins
    }

    // Computer wins
    return false; // Return false if computer wins
}

// Update game score based on user's choice
function gameScore(userChoice) {
    const results = determineWinner(userChoice, getComputerChoice()); // Calculate the result once
    
    // If results is true, user point. Else, computer point.
    if (results == true) {
        userWins++;
        console.log("user wins");
    } else if (results == false) {
        computerWins++;
        console.log("computer wins");
    } else {
        console.log("tie");
    }

    // Check if either player has reached a score of 5
    if (userWins === 5 || computerWins === 5) {
        console.log(userWins === 5 ? "You win!" : "Computer wins!");
        resetScores()
    }
}

// Randomly choose a hand for computer to play
function getComputerChoice() {
    computerChoice = COMPUTER_CHOICES[(Math.floor(Math.random() * COMPUTER_CHOICES.length))];
    return computerChoice;
}

// Resets Scores to 0
function resetScores() {
    computerWins = 0;
    userWins = 0;
}
