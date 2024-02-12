import { arenaSide, botRadius } from '../game.js';
import { point } from '/lib/flatten-js-core.mjs';
import { AIM, X, Y } from '../rpn/keywords/constants.js';

export const drawBot = (ctx, bot) => {
  let { X, Y, [AIM]: aim } = bot.getRegisters();
  let { color } = bot.getSpecs()

  const botCenter = point(X + botRadius, Y + botRadius);

  // // lookline
  // ctx.beginPath();
  // ctx.moveTo(botCenter.x, botCenter.y);
  // ctx.lineTo(
  //   botCenter.x + 2 * arenaSide * Math.cos((aim * Math.PI) / 180),
  //   botCenter.y + 2 * arenaSide * Math.sin((aim * Math.PI) / 180),
  // );
  // ctx.strokeStyle = '#000000';
  // ctx.lineWidth = 1;
  // ctx.stroke();
  // ctx.closePath();

  // rangeline
  if (bot.getNotes().range) {
    const { closestIsct, closestBot } = bot.getNotes().range;
    ctx.beginPath();
    ctx.moveTo(botCenter.x, botCenter.y);
    ctx.lineTo(closestIsct.x, closestIsct.y);
    ctx.strokeStyle = closestBot.getSpecs().color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    bot.addNotes({range:null});
  }

  // body
  ctx.beginPath();
  ctx.rect(X, Y, 2 * botRadius, 2 * botRadius);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();

  // turret
  ctx.beginPath();
  ctx.moveTo(botCenter.x, botCenter.y);
  ctx.lineTo(
    botCenter.x + 1.2 * botRadius * Math.cos((aim * Math.PI) / 180),
    botCenter.y + 1.2 * botRadius * Math.sin((aim * Math.PI) / 180),
  );

  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.closePath();
}
