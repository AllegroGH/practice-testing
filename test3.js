import { promises } from 'node:dns';
import readline from 'node:readline';
import readlineSync from 'readline-sync';

const f = async () => {
  let exit = 0;
  const promise = new Promise((resolve, reject) => {
    const timerID = setInterval(() => {
      console.log('timer');
      exit += 1;
      if (exit === 5) {
        clearInterval(timerID);
        resolve('готово');
      }
    }, 1000);
  });
  const result = await promise;
  console.log(result);
  return result;
};

const foo = async () => {
  const wait = f();
  return await wait;
};

const wait = f();
await wait;
console.log('after straight code...');

foo();
console.log('after foo()');
