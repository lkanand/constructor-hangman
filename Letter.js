var Letter = function(value) {
	this.value = value;
	this.guessedYet = false;
	this.returnCharacter = function() {
		if(this.guessedYet === false)
			return " _ ";
		else
			return value;
	};
	this.checkCharacter = function(guessedCharacter) {
		if(guessedCharacter.toLowerCase() === this.value.toLowerCase())
			this.guessedYet = true;
	};
};

module.exports = Letter;