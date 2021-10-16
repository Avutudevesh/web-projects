/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var firstPlayerScore = 0,
	secondPlayerScore = 0;
var firstPlayerCurrentScore = 0;
var secondPlayerCurrentScore = 0;
var playerTurn = 1;

var playerOneScoreElement = document.getElementById("score-0");
var playerOneCurrentScoreElement = document.getElementById("current-0");

var playerTwoScoreElement = document.getElementById("score-1");
var playerTwoCurrentScoreElement = document.getElementById("current-1");

document.querySelector(".btn-roll").addEventListener("click", rollRandomNumber);
document.querySelector(".btn-hold").addEventListener("click", holdClicked);

function rollRandomNumber() {
	const randomNumber = Math.floor(Math.random() * 6 + 1);
	console.log(randomNumber);
	setDiceImage(randomNumber);
	if (randomNumber === 1) {
		resetScore();
		changeTurn();
	} else {
		changeCurrentScore(randomNumber);
	}
}

function changeCurrentScore(score) {
	if (playerTurn == 1) {
		firstPlayerCurrentScore += score;
		setPlayerOneCurrentScore();
	} else {
		secondPlayerCurrentScore += score;
		setPlayerTwoCurrentScore();
	}
}

function setDiceImage(number) {
	var imageSrc;
	switch (number) {
		case 1:
			imageSrc = "dice-1.png";
			break;
		case 2:
			imageSrc = "dice-2.png";
			break;
		case 3:
			imageSrc = "dice-3.png";
			break;
		case 4:
			imageSrc = "dice-4.png";
			break;
		case 5:
			imageSrc = "dice-5.png";
			break;
		default:
			imageSrc = "dice-6.png";
			break;
	}
	document.querySelector(".dice").src = imageSrc;
}

function changeTurn() {
	if (playerTurn === 1) {
		playerTurn = 2;
		document.querySelector(".player-0-panel").classList.remove("active");
		document.querySelector(".player-1-panel").classList.add("active");
	} else {
		playerTurn = 1;
		document.querySelector(".player-0-panel").classList.add("active");
		document.querySelector(".player-1-panel").classList.remove("active");
	}
}

function holdClicked() {
	if (playerTurn === 1) {
		firstPlayerScore += firstPlayerCurrentScore;
		firstPlayerCurrentScore = 0;
		setPlayerOneTotalScore();
		setPlayerOneCurrentScore();
	} else {
		secondPlayerScore += secondPlayerCurrentScore;
		secondPlayerCurrentScore = 0;
		setPlayerTwoTotalScore();
		setPlayerTwoCurrentScore();
	}
	changeTurn();
}

function resetScore() {
	if (playerTurn === 1) {
		firstPlayerScore = 0;
		firstPlayerCurrentScore = 0;
		setPlayerOneCurrentScore();
		setPlayerOneTotalScore();
	} else {
		secondPlayerCurrentScore = 0;
		secondPlayerScore = 0;
		setPlayerTwoCurrentScore();
		setPlayerTwoTotalScore();
	}
}

function setPlayerOneTotalScore() {
	playerOneScoreElement.innerText = firstPlayerScore;
}

function setPlayerTwoTotalScore() {
	playerTwoScoreElement.innerText = secondPlayerScore;
}

function setPlayerOneCurrentScore() {
	playerOneCurrentScoreElement.innerText = firstPlayerCurrentScore;
}

function setPlayerTwoCurrentScore() {
	playerTwoCurrentScoreElement.innerText = secondPlayerCurrentScore;
}
