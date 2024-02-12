import { makeBot } from './bot.js';

const bots = [];

export const initBots = (rawBots) => {
  rawBots.forEach((rawBot, i) => bots.push(makeBot(rawBot, i)))
}

export const getBots = () => bots;
