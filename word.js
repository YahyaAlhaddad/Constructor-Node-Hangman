var Letter = require("./letter.js");

function Word(wrd) {
    this.word = wrd,
    this.letters = [],
    this.wordFound = false,

    this.getNewLetters = function () {
        for (var i = 0; i < this.word.length; i++) {
            var newLetter = new Letter(this.word[i]);
            this.letters.push(newLetter);
        }
    },

    this.checkWord = function () {
        if (this.letters.every(function (lttr) {
            return lttr.state === true;
        })) {
            this.wordFound = true;
            return true;
        }
    }

    this.checkIfLetterFound = function (guessedLetter) {
        var lettersMatched = 0;

        this.letters.forEach(function (lttr) {
            if (lttr.letter === guessedLetter) {
                lttr.state = true;
                lettersMatched++;
            }
        })

        return lettersMatched;
    }

    this.wordDisplay = function () {
        var display = "";
        
        this.letters.forEach(function (lttr) {
            var currentLetter = lttr.letterDisplay();
            display += currentLetter;
        })
        return display;
    }
}

module.exports = Word;
