import { getBots } from '../entities/bots.js'
import { arenaSide, botRadius } from '../game.js';
import { circle, point, ray, segment, vector } from '/lib/flatten-js-core.mjs';
import { AIM, DOPPLER, RANGE, SPEEDX, SPEEDY, X, Y } from './keywords/constants.js';

const storedValues = [X, Y, SPEEDX, SPEEDY, AIM];
const computedValues = [RANGE, DOPPLER];

export const readFrom = (register, stack, bot) => {
  if (storedValues.includes(register)) {
    stack.pushNumber(bot.getRegister(register));
    return;
  }
  switch (register) {
    case 'RANGE':
      let minDistance = Number.MAX_VALUE;
      let closestBot = null;
      let closestIsct = null;

      const b1 = bot.getRegisters();
      const { [X]: Bx, [Y]: By, [AIM]: aim } = b1
      const gaze = vector(
        Math.cos((aim * Math.PI) / 180),
        Math.sin((aim * Math.PI) / 180),
      )

      const me = point(Bx + botRadius, By + botRadius)
      const gazeRay = ray(me, gaze.rotate90CCW())

      getBots().forEach((bot2) => {
        if (bot2 === bot) {
          return;
        }

        const { [X]: Px, [Y]: Py } = bot2.getRegisters();

        const them = circle(point(Px + botRadius, Py + botRadius), botRadius)

        const iPoints = gazeRay.intersect(them)
        if (iPoints.length > 0) {
          iPoints.forEach((ip) => {
            const [d] = me.distanceTo(ip); // tuple returned, second is nearest point
            if (d < minDistance) {
              minDistance = d;
              closestIsct = ip;
              closestBot = bot2;
            }
          })
        }
      })

      if (closestBot !== null) {
        bot.addNotes({
          range: {
            minDistance,
            closestBot,
            closestIsct,
          }
        });
        stack.pushNumber(Math.floor(minDistance))
        break;
      }

      break;
    default:
      throw new Error("don't know how to read from operand: " + currInstr);
  }
}
