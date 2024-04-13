// Define winning combinations where the key beats the value
const WINNING_COMBINATIONS = {
    fire: "grass",
    water: "fire",
    grass: "water"
};

// Define available choices for the NPC
const NPC_CHOICES = ["water", "fire", "grass"];

// Declare variables for user and NPC choices, and scores
let userChoice;
let NPCChoice;
let userWins = 0;
let NPCWins = 0;

// Declare variables to update DOM
const userScore = document.querySelector("#userScore");
const NPCScore = document.querySelector("#NPCScore");

// Pokeballs
const userPokeballs =  document.querySelectorAll(".userPokeballs img")
const NPCPokeballs =  document.querySelectorAll(".NPCPokeballs img")


// Get the container element for choices
const choicesContainer = document.querySelector("#choices");

// Add event listener to the container element
choicesContainer.addEventListener("click", (event) => {
    // Check if the clicked element is a button within the choices container
    if (event.target.matches("input")) {
        const choice = event.target.id; // Get the id of the clicked button
        gameScore(choice); // Pass the choice to the gameScore function
    }
});


// Update score in the DOM
function updateScore(player, score) {
    player.textContent = score;
};

// Determine the winner of a game round
function determineWinner(userChoice, NPCChoice) {
    console.log("User: " + userChoice  + " vs NPC: " + NPCChoice)
    // Check for a tie
    if (userChoice === NPCChoice) {
        return "tie";
    }

    // Check if user wins
    if (WINNING_COMBINATIONS[userChoice] === NPCChoice) {
        return true; // Return true if user wins
    }

    // NPC wins
    return false; // Return false if NPC wins
}

// Loop through pokeballs and add grayed-out class to the first 'count' pokeballs
function grayOutPokeballs(pokeballs, count) {
    for (let i = pokeballs.length - 1; i >= pokeballs.length - count; i--) {
        pokeballs[i].classList.add('grayed-out');
    }
}

// Update game score based on user's choice
function gameScore(userChoice) {
    const results = determineWinner(userChoice, getNPCChoice()); // Calculate the result once
    
    // If results is true, user point. Else, NPC point.
    if (results == true) {
        userWins++;
        grayOutPokeballs(NPCPokeballs, userWins); // Gray out the correct number of NPC pokeballs
        console.log("You won!");
    } else if (results == false) {
        NPCWins++;
        grayOutPokeballs(userPokeballs, NPCWins); // Gray out the correct number of user pokeballs
        console.log("NPC wins!");
    } else {
        console.log("It's a tie!");
    }

    updateScore(userScore, userWins);
    updateScore(NPCScore, NPCWins);

    console.log("User Wins: " + userWins);
    console.log("NPC Wins: " + NPCWins);
    scoreCount(userWins, NPCWins);
}


// Check if NPC or User has reached 6 wins
function scoreCount(userWins, NPCWins) {
    // Check if either player has reached a score of 6
    if (userWins == 6 || NPCWins == 6) {
        console.log(userWins === 6 ? "You win!" : "NPC wins!");
        resetScores()
    }
}
// Randomly choose a hand for NPC to play
function getNPCChoice() {
    NPCChoice = NPC_CHOICES[(Math.floor(Math.random() * NPC_CHOICES.length))];
    return NPCChoice;
}

// Resets Scores to 0
function resetScores() {
    NPCWins = 0;
    userWins = 0;

    updateScore(userScore, userWins);
    updateScore(NPCScore, NPCWins);

    userPokeballs.forEach(pokeball => {
        pokeball.classList.remove('grayed-out');
    });
    NPCPokeballs.forEach(pokeball => {
        pokeball.classList.remove('grayed-out');
    });
}
