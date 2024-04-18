// Define winning combinations where the key beats the value
const WINNING_COMBINATIONS = {
    fire: "grass",
    water: "fire",
    grass: "water"
};

// Define available choices for the NPC
const NPC_CHOICES = ["water", "fire", "grass"];

// Declare variables for player and NPC choices, and scores
let playerChoice;
let NPCChoice;
let playerWins = 0;
let NPCWins = 0;

// Declare variables to update DOM
const playerScore = document.querySelector("#playerScore");
const NPCScore = document.querySelector("#NPCScore");

// Pokeballs
const playerPokeballs = document.querySelectorAll(".playerPokeballs img");
const NPCPokeballs = document.querySelectorAll(".NPCPokeballs img");

// NPC Pokemon
const NPCPokemon = document.querySelector("#NPCPokemon");
const npcImages = '';
const choicesContainer = document.getElementById("choices");
const playerPokemon = document.getElementsByClassName("playerPokemon");

// Log Container
const battleLogsContainer = document.getElementById("battleLogsContainer");
const textElement = document.createElement("span");

// Sounds and Song
var themeSong = new Audio('./music/theme.mp3');
var faintSound = new Audio('./music/faint.wav');
var winSound = new Audio('./music/win.wav');
var tieSound = new Audio('./music/tie.wav');
document.getElementById("playContainer").addEventListener("click", togglePlayPause);

// Play and Pause Music Toggle
function togglePlayPause() {
    // Play music if div is clicked
    if (themeSong.paused) {
        themeSong.play();
    } else {
        themeSong.pause();
    }
}

// Add event listener to the container element
choicesContainer.addEventListener("click", (event) => {
    // Check if the clicked element is a button within the choices container
    if (event.target.matches("input")) {
        const choice = event.target.id; // Get the id of the clicked button
        gameScore(choice); // Pass the choice to the gameScore function
    }
});

// Determine the winner of a game round
function determineWinner(playerChoice, NPCChoice) {
    console.log("Player: " + playerChoice + " vs NPC: " + NPCChoice);
    // Check for a tie
    if (playerChoice === NPCChoice) {
        return "tie";
    }

    // Check if player wins
    if (WINNING_COMBINATIONS[playerChoice] === NPCChoice) {
        return true; // Return true if player wins
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

// Create an image for the NPC Pokemon
function createImage(image) {
    const img = document.createElement("img");
    img.src = 'images/NPC' + image + '.png';
    NPCPokemon.appendChild(img)
}

// Remove the old NPC Pokemon
function removeImage() {
    const NPCImage = NPCPokemon.querySelector("img");

    if (NPCImage) {
        NPCPokemon.removeChild(NPCImage);
    }
}

// In control of the logs show in Console Log and the DOM
// In control of the logs show in Console Log and the DOM
function battleLogs(results, NPCChoice) {
    clearBattleLogs();

    if (results === true) {
        console.log("Point to player.");
        winSound.play();
        NPCPokemon.querySelector("img").classList.add('npc-pokemon');
        textElement.textContent = "Enemy used a " + NPCChoice + " type pokemon. Their pokemon has fainted.";
    } else if (results === false) {
        console.log("Point to NPC.");
        faintSound.play();
        textElement.textContent = "Enemy used a " + NPCChoice + " type pokemon. Your pokemon has fainted.";
    } else {
        console.log("It's a tie!");
        tieSound.play();
        textElement.textContent = "You both chose a " + NPCChoice + " type pokemon. Both pokemon have fainted.";
    }
    
    battleLogsContainer.appendChild(textElement);
    console.log("Player: " + playerWins + " - NPC: " + NPCWins);
}


// Update game score based on player's choice
function gameScore(playerChoice) {
    removeImage(NPCChoice)
    NPCChoice = getNPCChoice()
    createImage(NPCChoice)

    const results = determineWinner(playerChoice, NPCChoice); // Calculate the result once

    // If results is true, player point. Else, NPC point.
    if (results == true) {
        playerWins++;
        grayOutPokeballs(NPCPokeballs, playerWins); // Gray out the correct number of NPC pokeballs
    } else if (results == false) {
        NPCWins++;
        grayOutPokeballs(playerPokeballs, NPCWins); // Gray out the correct number of player pokeballs
    }

    // Displays the Scores - Used during development
    // updateScore(playerScore, playerWins);
    // updateScore(NPCScore, NPCWins);

    battleLogs(results, NPCChoice)
    scoreCount(playerWins, NPCWins);
}

// Check if NPC or Player has reached 6 wins
function scoreCount(playerWins, NPCWins) {
    // Check if either player has reached a score of 6
    if (playerWins > 5 || NPCWins > 5) {
        let winner;
        console.log(playerWins === 6 ? winner = "You" : winner = "NPC");
        if (confirm(winner + " won the game! Would you like to play again?")) {
            resetScores()
        } else {
            
        }
    }
}
// Randomly choose a hand for NPC to play
function getNPCChoice() {
    NPCChoice = NPC_CHOICES[(Math.floor(Math.random() * NPC_CHOICES.length))];
    return NPCChoice;
}

// Clears the text from the previous battle
function clearBattleLogs() {
    if (textElement != "") {
        textElement.textContent = ""
    }

    battleLogsContainer.appendChild(textElement)
}

// Resets Scores to 0
function resetScores() {
    NPCWins = 0;
    playerWins = 0;
    setTimeout(clearBattleLogs, 2000);

    // USED DURING DEVELOPMENT ONLY
    //updateScore(playerScore, playerWins);
    //updateScore(NPCScore, NPCWins);

    playerPokeballs.forEach(pokeball => {
        pokeball.classList.remove('grayed-out');
    });
    NPCPokeballs.forEach(pokeball => {
        pokeball.classList.remove('grayed-out');
    });
}

// USED DURING DEVELOPMENT ONLY
// Update score in the DOM
function updateScore(player, score) {
    player.textContent = score;
};