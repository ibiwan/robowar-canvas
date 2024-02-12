export const BULLET = 'BULLET';
export const FIRE = 'FIRE';
export const MOVEX = 'MOVEX';
// Used to move the robot a given distance in the X direction without changing SPEEDX. Returns 0 if read, moves the robot the specified distance if written. Movement costs two points of energy per unit moved. Once this command is used, firing of weapons is impossible until the next chronon.
export const MOVEY = 'MOVEY';
// hellbore, mine, missile, nuke, stunner
// probe
// Long range probe of opponent's systems. Returns information about the target in the direction of the AIM register when read; no effect if written. The register to probe is chosen with the SETPARAM command (e.g. SHIELD' PROBE' SETPARAM to select the SHIELD register for probing); it may be one of DAMAGE, ENERGY, SHIELD, ID, TEAMMATES, AIM, LOOK, SCAN. Probes must be enabled in the hardware store at the cost of one hardware point. PROBE defaults to probing the DAMAGE register if no other parameter has been set.

export const vwo_operands = [
  BULLET, FIRE, MOVEX, MOVEY
];

export const REF_BULLET = BULLET + "'";
export const REF_MOVEX = MOVEX + "'";
export const REF_MOVEY = MOVEY + "'";
export const REF_FIRE = FIRE + "'";

export const wo_virtual_refs = {
  [REF_BULLET]: BULLET, // non-explosive bullet
  [REF_MOVEX]: MOVEX,
  [REF_MOVEY]: MOVEY,
  [REF_FIRE]: FIRE, // default bullet (explosive if available)
}

export const wo_virtual_functions = {
  [REF_BULLET]: () => {

  },
  // [REF_MOVEX]: () => { throw ("implement REF_MOVEX handler"); },
  // [REF_MOVEY]: () => { throw ("implement REF_MOVEY handler"); },
}


/*
Used to shoot bullets. Returns 0 if read, shoots bullet with energy investment equal to amount written. This energy investment is removed from the robot¹s energy supply. It may exceed the robot¹s current energy value (placing the robot at negative energy and immobilizing it), but may not exceed the robots energy maximum. Depending on the settings from the Hardware Store, bullets may be normal, rubber, or explosive. Explosive bullets explode like TacNukes in a 36 pixel radius when they hit their target. Whey they detonate (3 chronons after impact) they do damage of 2*energy investment to all robots in the blast radius. This is a larger, faster explosion than in versions of RoboWar before 3.0. Normal bullets do damage equal to the energy investment when they hit their targets. Rubber bullets only do half damage if they hit. Bullets move across the screen at a speed of 12 pixels per chronon, heading in the direction that the robot¹s turret pointed when the shot was fired. No weapons can be fired in the same chronon that a move command is executed.
Used to lay atomic land mines. Returns 0 if read, places a mine with energy investment equal to the amount written. The mine is stationary and becomes active ten chronons after placement. Once active, it will detonate against any target that hits it, causing damage equal to 2*(energy investment-5). This is twice as effective as mines in RoboWar 2.3 and earlier. Mines cannot be used unless they were first enabled at the hardware store. Mines cannot be used in the same chronon as a move command.
Used to launch hellbores. Returns 0 if read, shoots hellbore with speed equal to amount written (this is different than hellbores in RoboWar 2.1.2). This amount is removed from the robot's energy supply. Hellbores reduce the shield of any robot they hit to zero but do no other damage. They must move at a speed from 4 to 20 in the direction that the robot's turret pointed when the shot was fired. Hellbores cannot be used unless they were first enabled at the hardware store. Hellbores cannot be fired in the same chronon as a move command is used.
Used to shoot missiles. Returns 0 if read, shoots missile with energy investment equal to amount written. This energy investment is removed from the robot¹s energy supply. It may not exceed the robot's energy max; if it does, only EnergyMax energy is used (this is changed; prior to RoboWar 4.1.2, a maximum of 50 points could be used). Missiles do 2*energy investment in damage if they hit their targets. Missiles move across the screen at a speed of 5 pixels per chronon, heading in the direction that the robot¹s turret pointed when the shot was fired. Missiles cannot be used unless they were first enabled at the hardware store. Missiles cannot be fired in the same chronon as a move command is used.
Used to place TacNukes, or Tactical Nuclear Devices. Returns 0 if read, places TacNuke with energy investment equal to amount written. This energy investment is removed form the robot¹s energy supply. It may exceed the robot¹s current energy value (placing the robot at negative energy and immobilizing it), but may not exceed the robots energy maximum. TacNukes begin to explode as soon as they are placed, increasing in radius by 5 pixels each chronon. At the tenth chronon, when they have a radius of 50, they detonate and cause 2*energy investment in damage to all robots in the radius. Robots who lay TacNukes are well advised to hasten away and be out of the blast radius when the devices explode. TacNukes cannot be used unless they were first enabled at the hardware store. Nukes cannot be used in the same chronon as move commands.
Used to fire a stasis capsule. Returns 0 if read, shoots stasis capsule with speed 14 in the directon that the robot's turret points. The amound written is removed from the robot's energy supply; if a stasis capsule hits a robot, the robot is placed in stasis for one chronon for every four points of energy invested in the capsule. While in stasis, a robot does not move, interpret instructions, or regain energy; however, the robot's shields do not decay. Stunners cannot be used unless they are first enabled in the Hardware Store. Stunners cannot be fired in the same chronon as a move command execution.
*/