export const AIM = 'AIM'; // look, scan
/*
Targeting offset from AIM. The RANGE command returns a distance to the nearest robot in the direction AIM+LOOK. This might be useful for some tracking algorithm. If not otherwise set, LOOK defaults to 0. LOOK may be read or written.
Similar to LOOK, the radar offset from the AIM. The RADAR command searches for projectiles in the directon AIM+SCAN. This might be useful if a robot wants to look for targets in one direction, but check for danger in another direction. If not otherwise set, SCAN defaults to 0. SCAN may be read or written.
*/
export const SPEEDX = 'SPEEDX'; // Speeds must be in the range of -20 to 20. Each point of change in speed costs 2 points of energy
export const SPEEDY = 'SPEEDY';
// channel

export const arw_operands = [AIM, SPEEDX, SPEEDY];

const aCode = 'A'.charCodeAt(0);
for (let i = 0; i < 26; i++) {
  const char = String.fromCharCode(aCode + i);
  if (!['X', 'Y'].includes(char)) {
    arw_operands.push(char)
  }
}

export const REF_AIM = AIM + "'";
export const REF_SPEEDX = SPEEDX + "'";
export const REF_SPEEDY = SPEEDY + "'";

export const rw_actual_refs = {
  [REF_AIM]: AIM,
  [REF_SPEEDX]: SPEEDX,
  [REF_SPEEDY]: SPEEDY,
}
