import { arenaSide } from '../game.js';
import { clamp } from '../math-geom/math.js';
import { SPEEDX, SPEEDY, X, Y } from '../rpn/keywords/constants.js';

export const moveBot = (bot) => {
  const r = bot.getRegisters()
  // console.log({r})
  let { [X]: x, [Y]: y, [SPEEDX]: speedx, [SPEEDY]: speedy } = bot.getRegisters();

  // console.log({ x, y, speedx, speedy })

  let ratio = 1.0
  let x2
  let y2

  if (speedx != 0) {
    x2 = clamp(x + speedx, 0, arenaSide)
    if (x2 == 0 || x2 == arenaSide) {
      let speedmax = x2 - x
      let ratiox = speedmax / speedx
      ratio = Math.min(ratio, ratiox)
    }
  }

  if (speedy != 0) {
    y2 = clamp(y + speedy, 0, arenaSide)
    if (y2 == 0 || y2 == arenaSide) {
      let speedmax = y2 - y
      let ratioy = speedmax / speedy
      ratio = Math.min(ratio, ratioy)
    }
  }

  // console.log({ x2, y2, ratio })

  x += Math.round(speedx * ratio)
  y += Math.round(speedy * ratio)

  bot.setRegisters({ X: x, Y: y })
}
