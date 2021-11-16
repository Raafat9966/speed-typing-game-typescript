const getRandomWord = require('./app.js');
// Add word to DOM
test('should get random word', () => {
	const words = ['apple', 'banana', 'orange'];
	expect(getRandomWord()).toBe('apple' || 'banana' || 'orange');
});
