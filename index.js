
var wordList = ["CAVALIERS", "BULLS", "BUCKS", "PACERS", "PISTONS", "KNICKS", "NETS", "CELTICS", "HORNETS", "HEAT", "MAGIC", "HAWKS", "WIZARDS", "RAPTORS", "SIXERS", "WARRIORS", "ROCKETS", "BLAZERS", "THUNDER", "JAZZ", "PELICANS", "SPURS", "TIMBERWOLVES", "NUGGETS", "CLIPPERS", "LAKERS", "GRIZZLIES", "MAVRICKS", "KINGS", "SUNS"];
var Word = require("./word.js");

var inquirer = require("inquirer");
var isLetter = require("is-letter");

var guessesRemaining = 5;
var guessedLetters = [];
var displayCounter = 0;
var currentWord = "";

newGame();

function newGame() {
    
    console.log("");
    console.log("Welcome to NBA Hangman!");
    console.log("");

    if (guessedLetters.length > 0) {
        guessedLetters = [];
    }

    inquirer.prompt([
        {
            name: "play",
            type: "confirm",
            message: "Do you want to play?"
        }
    ]).then(function (answer) {
        if (answer.play) {
            console.log("");
            
            startPlaying();
        } else {
            console.log("Bye!!");
        }
    });
}

function startPlaying() {
    if (guessesRemaining === 5) {
        console.log("---------------------------------");

        selectedWord = new Word(wordList[Math.floor(Math.random() * wordList.length)]);
        selectedWord.getNewLetters();

        console.log("");
        console.log(selectedWord.wordDisplay());
        console.log("");
        promptUser();
    } else {
        reset();
        newGame();
    }
}

function reset() {
    guessesRemaining = 5;
}

function promptUser() {
    inquirer.prompt([
        {
            name: "chosenLetter",
            type: "input",
            message: "Enter a letter",
            validate: function(value) {
                if (isLetter(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]).then(function(ltr) {
  
        var letterReturned = (ltr.chosenLetter).toUpperCase();

        var guessedAlready = false;
        for (var i = 0; i < guessedLetters.length; i++) {
            if(letterReturned === guessedLetters[i]) {
                guessedAlready = true;
            }
        }
        if (guessedAlready === false) {
            
            guessedLetters.push(letterReturned);

            var correctLetter = selectedWord.checkIfLetterFound(letterReturned);

            if (correctLetter === 0) {
                console.log("Wrong guess!")
                guessesRemaining--;
                displayCounter++;

                console.log("Guesses remaining: " + guessesRemaining);

                console.log("--------------------------------");
                console.log("");
                console.log(selectedWord.wordDisplay());
                console.log("");
                console.log("--------------------------------");
                console.log("Letters guessed: " + guessedLetters);
            } else {
                console.log("You are correct!");

                if (selectedWord.checkWord() === true) {
                    console.log("");
                    console.log(selectedWord.wordDisplay());
                    console.log("");
                    console.log("----- YOU WIN -----");
                    newGame();
                } else {
                    console.log("Guesses remaining: " + guessesRemaining);
                    console.log("");
                    console.log(selectedWord.wordDisplay());
                    console.log("");
                    console.log("------------------------------");
                    console.log("Letters guessed: " + guessedLetters);
                }
            }
            if (guessesRemaining > 0 && selectedWord.wordFound === false) {
                promptUser();
            } else if (guessesRemaining === 0) { 
                console.log("");                
                console.log("----- GAME OVER -----");           
            }
        } else { 
            console.log("Try another letter");
            promptUser();
        }
    })
}
