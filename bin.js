import battle from './index.js';
import readlineSync from 'readline-sync';

const player = {
  name: 'Вася',
  name2: 'Васю',
  curHP: 1000,
  maxHP: 1000,
  minDamage: 20,
  maxDamage: 100,
  dodge: 0.2,
  block: 0.2,
  bash: 0.75,
  bashed: false,
  lag: 0,
};

const mob = {
  name: 'Оборотень',
  name2: 'Оборотня',
  curHP: 1000,
  maxHP: 1000,
  minDamage: 20,
  maxDamage: 100,
  dodge: 0.2,
  block: 0.2,
  bashed: false,
  lag: 0,
};

const wait = battle(player, mob);
await wait;

const menuId = readlineSync.keyIn('Hit 1...5 key: ', { limit: '$<1-5>' });
console.log(menuId);
console.log(mob.curHP);
console.log(mob.maxHP);
