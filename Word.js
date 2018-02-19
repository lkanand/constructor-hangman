var Letter = require("./Letter.js");

var Word = function(word) {
	var arrayOfLetters = [];
	for(var i = 0; i < word.length; i++) {
		var newLetter = new Letter(word.charAt(i));
		arrayOfLetters.push(newLetter);
	}

	this.letterArray = arrayOfLetters;
	
	this.displayString = function() {
		var stringRepresentation = "";
		for(var i = 0; i < this.letterArray.length; i++)
			stringRepresentation += this.letterArray[i].returnCharacter();
		return stringRepresentation;
	};

	this.isLetterInString = function(guessedCharacter) {
		for(var i = 0; i < this.letterArray.length; i++)
			this.letterArray[i].checkCharacter(guessedCharacter);
	};
};

module.exports = Word;
