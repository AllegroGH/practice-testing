import color from 'bash-color';
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
};

const getRandomDamage = (min, max) => Math.round(Math.random() * (max - min)) + min;

const getDamage = (who, whom) => {
  if (Math.random() <= whom.dodge) return 'dodged';
  if (Math.random() <= whom.block) return 'blocked';
  const damage = getRandomDamage(who.minDamage, who.maxDamage);
  whom.curHP -= damage;
  return damage;
};

const getDamageStrength = (damage) => {
  if (damage <= 30) return '';
  if (damage > 30 && damage <= 40) return ' сильно';
  if (damage > 40 && damage <= 50) return ' очень сильно';
  if (damage > 50 && damage <= 60) return color.red(' БОЛЬНО');
  if (damage > 60 && damage <= 80) return color.red(' ОЧЕНЬ БОЛЬНО');
  return color.red(' НЕВЫНОСИМО БОЛЬНО', true);
};

const getPlayerOutputString = (player, mob, damage) => {
  if (damage === 'dodged') return `(${player.curHP} HP) ${color.green('Ты')} попытался ударить ${color.purple(mob.name2)}, но он ${color.yellow('уклонился')}.`;
  if (damage === 'blocked') return `(${player.curHP} HP) ${color.green('Ты')} попытался ударить ${color.purple(mob.name2)}, но он ${color.blue('блокировал', true)} удар.`;
  return `(${player.curHP} HP) ${color.green('Ты')}${getDamageStrength(damage)} ударил ${color.purple(mob.name2)}.`;
};

const getMobOutputString = (player, mob, damage) => {
  if (damage === 'dodged') return `(${mob.curHP} HP) ${color.purple(mob.name)} попытался ударить ${color.green('тебя')}, но ты ${color.yellow('уклонился')}.`;
  if (damage === 'blocked') return `(${mob.curHP} HP) ${color.purple(mob.name)} попытался ударить ${color.green('тебя')}, но ты ${color.blue('блокировал', true)} удар.`;
  return `(${mob.curHP} HP) ${color.purple(mob.name)}${getDamageStrength(damage)} ударил ${color.green('тебя')}.`;
};

const round = (timerId, player, mob) => {
  const playerDamage = getDamage(player, mob);
  const mobDamage = getDamage(mob, player);

  console.log();
  console.log(getPlayerOutputString(player, mob, playerDamage));
  console.log(getMobOutputString(player, mob, mobDamage));
  if (player.curHP < 1 || mob.curHP < 1) clearInterval(timerId);
};

const timerId = setInterval(() => round(timerId, player, mob), 2500);

// const menuId = readlineSync.keyIn('Hit 1...5 key: ', { limit: '$<1-5>' });
// console.log(menuId);

/*

rl.addCommands(
  {
    name: 'stop',
    description: '...',
    func: function () {
      clearInterval(timerId);
      rl.close();
    },
  },
  {
    name: 'echo',
    argNames: ['<string>'],
    description: 'Write <string> to the standard output.',
    func: function (string) {
      console.log(string || '');
    },
  },
);

*/
// Listen for when the user hits `return` and the input is not a registered command.
/*
rl.onLine(function (line) {
  console.log('Thank you for your input:', line);
});
*/
