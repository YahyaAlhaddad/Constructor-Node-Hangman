var Letter = function (letter) {
    this.letter = letter;
    this.state = false;

    
    this.letterDisplay = function () {
        if (this.letter === "") { 
            this.state = true;
            return "";
        } if (this.state === false) { 
            return " _ ";
        } else { 
            return this.letter;
        }
    }
}

module.exports = Letter;