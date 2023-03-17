import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sentence = 'This is my first typing test';

console.log('Welcome to the typing speed test!');
console.log(`Type the following sentence as quickly and accurately as you can:`);
console.log('\n' + sentence + '\n');

const startTime = Date.now();

rl.question('Start typing: ', (userInput: string) => {
  const endTime = Date.now();
  const timeTaken = (endTime - startTime) / 1000;

  const wordsPerMinute = (userInput.length / 5) / (timeTaken / 60);
  const accuracy = (100 * userInput.split('').filter((char, index) => char === sentence[index]).length) / sentence.length;

  console.log(`\nTime taken: ${timeTaken.toFixed(2)} seconds`);
  console.log(`Words per minute: ${wordsPerMinute.toFixed(2)}`);
  console.log(`Accuracy: ${accuracy.toFixed(2)}%`);

  rl.close();
});

