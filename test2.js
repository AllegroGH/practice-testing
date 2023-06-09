import { promises } from 'node:dns';
import readline from 'node:readline';
import readlineSync from 'readline-sync';

const f = async () => {
  let exit = 0;
  const promise = new Promise((resolve, reject) => {
    // setTimeout(() => resolve('готово!'), 1000);
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
  const result = f();
  return await result;
};
// const fooo = foo();
// await fooo;
// console.log('sd');

export { foo };
