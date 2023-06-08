import { promises } from 'node:dns';
import readline from 'node:readline';
import readlineSync from 'readline-sync';

const myFoo = async () => {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    } else {
      console.log(`You pressed the "${str}" key`);
      console.log(key);
      console.log();
      if (key.name === 'c') {
        process.stdin.setRawMode(false);
        process.exit();
      }
    }
  });

  console.log('Press any key...');
  let exit = 0;

  setInterval(() => {
    console.log('timer');
    exit += 1;
    if (exit === 5) process.exit();
  }, 1000);
  // let result = (await exit) === 5;
};

myFoo();

/*
import * as readline1 from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
const rl = readline1.createInterface({ input, output });
const answer = await rl.question('What do you think of Node.js? ');
console.log(`Thank you for your valuable feedback: ${answer}`);
rl.close();
*/

const menuId = readlineSync.keyIn('Hit 1...5 key: ', { limit: '$<1-5>' });
console.log(menuId);

//==============
