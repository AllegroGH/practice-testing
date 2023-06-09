import color from 'bash-color';
import readline from 'node:readline';

const getRandomDamage = (min, max) => Math.round(Math.random() * (max - min)) + min;

const getDamage = (who, whom) => {
  if (!whom.bashed) {
    if (Math.random() <= whom.dodge) return 'dodged';
    if (Math.random() <= whom.block) return 'blocked';
  }
  const damage = getRandomDamage(who.minDamage, who.maxDamage) * (whom.bashed ? 2 : 1);
  whom.curHP -= damage;
  return damage;
};

const getDamageStrength = (damage) => {
  if (damage <= 30) return '';
  if (damage > 30 && damage <= 40) return ' сильно';
  if (damage > 40 && damage <= 50) return ' очень сильно';
  if (damage > 50 && damage <= 60) return color.red(' БОЛЬНО');
  if (damage > 60 && damage <= 80) return color.red(' ОЧЕНЬ БОЛЬНО');
  if (damage > 80 && damage <= 100) return color.red(' НЕВЫНОСИМО БОЛЬНО');
  return color.red(' **************** БОЛЬНО', true);
};

const getPlayerOutputString = (player, mob, damage) => {
  if (damage === 'dodged')
    return `(${player.curHP > 0 ? player.curHP : 0} HP) ${color.green('Ты')} попытался ударить ${color.purple(mob.name2)}, но он ${color.yellow('уклонился')}.`;
  if (damage === 'blocked')
    return `(${player.curHP > 0 ? player.curHP : 0} HP) ${color.green('Ты')} попытался ударить ${color.purple(mob.name2)}, но он ${color.blue('блокировал', true)} удар.`;
  return `(${player.curHP > 0 ? player.curHP : 0} HP) ${color.green('Ты')}${getDamageStrength(damage)} ударил ${color.purple(mob.name2)}.`;
};

const getMobOutputString = (player, mob, damage) => {
  if (damage === 'dodged') return `(${mob.curHP > 0 ? mob.curHP : 0} HP) ${color.purple(mob.name)} попытался ударить ${color.green('тебя')}, но ты ${color.yellow('уклонился')}.`;
  if (damage === 'blocked')
    return `(${mob.curHP > 0 ? mob.curHP : 0} HP) ${color.purple(mob.name)} попытался ударить ${color.green('тебя')}, но ты ${color.blue('блокировал', true)} удар.`;
  return `(${mob.curHP > 0 ? mob.curHP : 0} HP) ${color.purple(mob.name)}${getDamageStrength(damage)} ударил ${color.green('тебя')}.`;
};

const round = (player, mob, runAway, timerId = false) => {
  if (runAway) {
    clearInterval(timerId);
    return true;
  }
  console.log();
  if (mob.lag > 0) {
    mob.lag -= 1;
    if (!mob.lag) {
      mob.bashed = false;
      console.log(color.purple(`${mob.name} встал на ноги.`, true));
    }
  }
  const playerDamage = getDamage(player, mob);
  const mobDamage = getDamage(mob, player);

  console.log(getPlayerOutputString(player, mob, playerDamage));
  console.log(getMobOutputString(player, mob, mobDamage));
  if (player.curHP < 1 || mob.curHP < 1) {
    if (timerId) clearInterval(timerId);
    return true;
  }
  if (player.bashed) console.log(color.yellow(`Тебе лучше встать на ноги!`, true));
  if (player.lag > 0) player.lag -= 1;
  return false;
};

const battle = async (player, mob) => {
  let runAway = false;

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') process.exit();
    if (key.name === 'b' && !player.lag) {
      if (player.bashed) {
        console.log(color.yellow(`Тебе лучше встать на ноги!`, true));
      } else {
        if (Math.random() <= (mob.bashed ? player.bash / 2 : player.bash)) {
          console.log(color.green(`Своим мощным ударом ты повалил ${mob.name2} на землю!`, true));
          mob.bashed = true;
          mob.lag = 4;
          player.lag = 2;
        } else {
          console.log(color.red(`Ты попытался повалить ${mob.name2}, но в результате упал сам!`, true));
          player.bashed = true;
          player.lag = 3;
        }
      }
    }
    if (key.name === 'u' && !player.lag && player.bashed) {
      player.bashed = false;
      console.log(color.green(`Ты встал на ноги.`, true));
    }
    if (key.name === 'r' && !player.lag) {
      if (player.bashed) {
        console.log(color.yellow(`Тебе лучше встать на ноги!`, true));
      } else {
        runAway = true;
        player.lag = 1;
        console.log('Ты убежал...');
        mob.curHP = mob.maxHP;
      }
    }
  });

  let promise = new Promise((resolve) => {
    if (round(player, mob, runAway)) resolve(true);
    const timerId = setInterval(() => {
      if (round(player, mob, runAway, timerId)) resolve(true);
    }, 2500);
  });
  return await promise;
};

export default battle;
