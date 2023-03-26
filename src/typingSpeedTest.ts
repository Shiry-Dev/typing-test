import * as readline from 'readline';
import fetch from 'node-fetch';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const gitHubURL = 'https://raw.githubusercontent.com/Shiry-Dev/typing-test/main/src/typingSpeedTest.ts'

const fetchText = async (url: string): Promise<string> => {
	try {
		const response = await fetch(url);
		return await response.text();
	} catch (error) {
		console.error('Error fetching text:', error);
		return '';
	}
};

(async () => {
  const sentence = await fetchText(gitHubURL);

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
})();
