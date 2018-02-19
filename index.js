var Letter = require("./Letter.js");
var Word = require("./Word.js");
var inquirer = require("inquirer");

var wordBank = ["The Signal and The Noise", "On the Road", "Lord of the Rings", "Life of Pi", "The Hobbit",
"Foundation", "Atlas Shrugged", "The Scarlet Letter", "To Kill a Mockingbird", "The Big Short",
"The Autobiography of Malcolm X", "The Namesake", "War and Peace", "Crime and Punishment", "Lolita",
"Harry Potter and the Prisoner of Azkaban", "Harry Potter and the Order of the Phoenix", "The Fellowship of the Ring",
"The Return of the King", "A Game of Thrones", "On the Road", "A Midsummer Night's Dream", "Hamlet", "Othello",
"A Clash of Kings", "Between the World and Me", "Things Fall Apart", "Eragon", "The Girl on the Train", 
"The Kite Runner", "Frankenstein", "A Tale of Two Cities", "Oliver Twist", "Great Expectations", "Pride and Prejudice",
"A Midsummer Night's Dream", "Romeo and Juliet", "The Tempest", "Othello", "The Brothers Karamazov", "Infinite Jest"];

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", 
"s", "t", "u", "v", "w", "x", "y", "z"];

var guessedLetters = [];
var guessedLettersIncorrect = [];
var guessesRemaining = 9;
var gamesPlayed = 0;
var wordSelected;
var arrayOfLetters = [];

function initializeGame() {

	inquirer.prompt([
	{
		type: "confirm",
		message: "Would you like to play Hangman?",
		name: "play",
		default: true
	}
	]).then(function(response){
		if(response.play === true) {
			console.log("");
			setGame();
		}
	});
}

function setGame() {
	var random = Math.floor(Math.random() * wordBank.length);
	wordSelected = new Word(wordBank[random]);

	for(var i = 0; i < wordSelected.letterArray.length; i++) {
		var letter = wordSelected.letterArray[i].value;
		arrayOfLetters.push(letter.toLowerCase());
		if(alphabet.indexOf(letter.toLowerCase()) === -1)
			wordSelected.letterArray[i].guessedYet = true;
	}

	if(gamesPlayed === 0) {
		console.log("Guess this word:");
		console.log("");
	}
	
	console.log(wordSelected.displayString());
	console.log("");
	playRound();
}

function playRound() {

	inquirer.prompt([
	{
		name: "playerGuess",
		message: "Guess a letter!"
	}
	]).then(function(response){
		var input = response.playerGuess;
		if(checkValidInput(input) === false) {
			console.log("");
			console.log("Please enter a valid input that has not already been guessed");
			console.log("");
			playRound();
		}
		else {
			guessedLetters.push(input);

			if(arrayOfLetters.indexOf(input) === -1) {
				guessesRemaining--;
				guessedLettersIncorrect.push(input);
				console.log("");
				console.log(wordSelected.displayString());
				console.log("");
				console.log("\x1b[31m%s\x1b[0m", "INCORRECT!");
				console.log("");
				if(guessesRemaining > 0) {
					console.log("Guesses remaining: " + guessesRemaining);
					console.log("");
					console.log("Incorrect letters guessed: " + JSON.stringify(guessedLettersIncorrect));
					console.log("");
				}
			}
			else {
				wordSelected.isLetterInString(input);
				wordSelected.isLetterInString(input.toUpperCase());
				console.log("");
				console.log(wordSelected.displayString());
				console.log("");
				console.log("\x1b[32m%s\x1b[0m", "CORRECT!");
				console.log("");
				if(wordSelected.displayString().indexOf("_") > 0) {
					console.log("Incorrect letters guessed: " + JSON.stringify(guessedLettersIncorrect));
					console.log("");
				}
			}

			if(guessesRemaining === 0 || wordSelected.displayString().indexOf("_") === -1) {

				if(guessesRemaining === 0) {
					console.log("YOU LOST! Here's your next word:");
					console.log("");
				}
				else {
					console.log("YOU WON! Here's your next word:");
					console.log("");
				}

				guessedLetters = [];
				guessedLettersIncorrect = [];
				guessesRemaining = 9;
				arrayOfLetters = [];
				gamesPlayed++;

				setGame();
			}
			else 
				playRound();
		} 
	});
}

function checkValidInput(input) {
	if(input.length === 0 || input.length > 1 || alphabet.indexOf(input) === -1 || guessedLetters.indexOf(input) > -1)
		return false;
	else 
		return true;
}

initializeGame();