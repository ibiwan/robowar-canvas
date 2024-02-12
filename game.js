import { def as bot1_def } from './botdefs/bot1.js'
import { def as bot2_def } from './botdefs/bot2.js'

import { initBots, getBots } from './entities/bots.js'

import { execChronon } from './rpn/brain.js';

import { drawBot } from './draw/drawbot.js';
import { drawCanvas } from './draw/drawcanvas.js';

import { moveBot } from './motion/moveBot.js';

const canvas = document.getElementById("arena");
const ctx = canvas.getContext("2d");

const rate = 40; // ms per frame

export const arenaSide = 300;
export const botRadius = 16;

const rawBots = [
  bot1_def,
  bot2_def,
];

const init = () => {
  canvas.width = arenaSide + 2 * botRadius;
  canvas.height = arenaSide + 2 * botRadius;

  initBots(rawBots);

  console.log(getBots());

  setTimeout(update, 0);
};

const update = () => {
  const startTime = new Date().getTime();

  drawCanvas(ctx, canvas);

  getBots().forEach((bot) => {
    execChronon(bot, {});
    drawBot(ctx, bot);
    moveBot(bot);
  });

  setTimeout(update, rate - (new Date().getTime() - startTime));
};

init();
