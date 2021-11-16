'use strict';
exports.__esModule = true;
exports.getRandomWord = exports.words = void 0;
var word = document.getElementById('word');
var text = document.getElementById('text');
var scoreEl = document.getElementById('score');
var timeEl = document.getElementById('time');
var endgameEl = document.getElementById('end-game-container');
var settingsBtn = document.getElementById('settings-btn');
var settings = document.getElementById('settings');
var settingsForm = document.getElementById('settings-form');
var difficultySelect = document.getElementById('difficulty');
// List of words for game
exports.words = [
	'sigh',
	'tense',
	'airplane',
	'ball',
	'pies',
	'juice',
	'warlike',
	'bad',
	'north',
	'dependent',
	'steer',
	'silver',
	'highfalutin',
	'superficial',
	'quince',
	'eight',
	'feeble',
	'admit',
	'drag',
	'loving',
];
var randomWord;
var score = 0;
var time = 10;
var difficulty =
	localStorage.getItem('difficulty') !== null
		? localStorage.getItem('difficulty')
		: 'medium';
text.focus();
var timeInterval = setInterval(updateTime, 1000);
// Generate random word from array
function getRandomWord() {
	return exports.words[Math.floor(Math.random() * exports.words.length)];
}
exports.getRandomWord = getRandomWord;
// Add word to DOM
function addWordToDOM() {
	randomWord = getRandomWord();
	word.innerHTML = randomWord;
}
// Update score
function updateScore() {
	score++;
	scoreEl.innerHTML = score.toString();
}
// Update time
function updateTime() {
	time--;
	timeEl.innerHTML = time + 's';
	if (time === 0) {
		clearInterval(timeInterval);
		gameOver();
	}
}
// Game over, show end screen
function gameOver() {
	endgameEl.innerHTML =
		'\n    <h1>Time ran out</h1>\n    <p>Your final score is ' +
		score +
		' in ' +
		difficulty +
		'</p>\n    <button onclick="location.reload()">Reload</button>\n  ';
	endgameEl.style.display = 'flex';
}
addWordToDOM();
// Event listeners
// Typing
text.addEventListener('input', function (event) {
	var insertedText = event.target.value;
	if (insertedText === randomWord) {
		addWordToDOM();
		updateScore();
		event.target.value = '';
		if (difficulty === 'hard') {
			time += 1;
		} else if (difficulty === 'medium') {
			time += 3;
		} else {
			time += 5;
		}
		updateTime();
	}
});
// Settings btn click
settingsBtn.addEventListener('click', function () {
	return settings.classList.toggle('hide');
});
// Settings select
settingsForm.addEventListener('change', function (event) {
	difficulty = event.target.value;
	localStorage.setItem('difficulty', difficulty);
});
