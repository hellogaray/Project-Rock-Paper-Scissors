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
let userWins = 0;
let computerWins = 0;

// Declare variables to update DOM
const userScore = document.querySelector("#userScore");
const computerScore = document.querySelector("#computerScore");


// Determine the winner of a game round
function determineWinner(userChoice, computerChoice) {
    console.log("User: " + userChoice  + " vs Computer: " + computerChoice)
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
        console.log("You won!");
    } else if (results == false) {
        computerWins++;
        console.log("Computer wins!");
    } else {
        console.log("It's a tie!");
    }

    userScore.textContent = userWins;
    computerScore.textContent = computerWins;

    console.log("User Wins: " + userWins)
    console.log("Computer Wins: " + computerWins)
    scoreCount(userWins, computerWins)
}

// Check if Computer or User has reached 5 wins
function scoreCount(userWins, computerWins) {
    // Check if either player has reached a score of 5
    if (userWins == 5 || computerWins == 5) {
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

gameScore("paper")
gameScore("paper")
gameScore("paper")
gameScore("paper")