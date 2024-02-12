export const CHRONON = 'CHRONON';
export const DOPPLER = 'DOPPLER'; // perpendicular to aim
export const RADAR = 'RADAR';
/*
Range to nearest bullet, missile, or TacNuke in the path of AIM. May only be read. RADAR checks a path 40 degrees wide centered on the AIM (actually AIM+SCAN, but SCAN defaults to 0). It returns the distance to the nearest bullet, missile, or TacNuke in this path. If there are none, it returns 0. Note that the weapon detected might be moving perpendicular to the aim, not toward the robot.
*/
export const RANDOM = 'RANDOM'; // 0 ... 359
export const RANGE = 'RANGE'; // dist to first target in direction AIM+LOOK
export const WALL = 'WALL';
// damage
// teammates (# excl self)
// collision, friend

export const vro_operands = [CHRONON, DOPPLER, RADAR, RANDOM, RANGE, WALL];
