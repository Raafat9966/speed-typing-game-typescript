const word = document.getElementById('word')!;
const text = document.getElementById('text')!;
const scoreEl = document.getElementById('score')!;
const timeEl = document.getElementById('time')!;
const endgameEl = document.getElementById('end-game-container')!;
const settingsBtn = document.getElementById('settings-btn')!;
const settings = document.getElementById('settings')!;
const settingsForm = document.getElementById('settings-form')!;
const difficultySelect = document.getElementById('difficulty')!;

// List of words for game
export const words: string[] = [
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

let randomWord: string;
let score: number = 0;
let time: number = 10;

let difficulty: string =
	localStorage.getItem('difficulty') !== null
		? localStorage.getItem('difficulty')
		: 'medium';

text.focus();

const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
export function getRandomWord(): string {
	return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM(): void {
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
	endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score} in ${difficulty}</p>
    <button onclick="location.reload()">Reload</button>
  `;

	endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', (event) => {
	const insertedText: string = (<HTMLInputElement>event.target).value;

	if (insertedText === randomWord) {
		addWordToDOM();
		updateScore();
		(<HTMLInputElement>event.target).value = '';

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
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', (event) => {
	difficulty = (<HTMLInputElement>event.target).value;
	localStorage.setItem('difficulty', difficulty);
});
