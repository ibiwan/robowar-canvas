export const SHIELD = 'SHIELD';

/*
Robot¹s current shield level. May be read or written. 

If read, it returns the current level of the shield, or 0 if no shields are up. 

If written, is sets the shield level to the value written. 

If the current level is less than the level written, 
  a point of energy is used for each point added to the shields. 
  If not enough energy is available to set the shields, 
  the shields are only strengthened as far as remaining energy permits. 
  
If the current level is greater than the level written, 
  a point of energy is regained for each point of difference, 
  although energy cannot exceed the maximum energy value set in the Hardware Store. 
  
Shields can absorb damage from bullets, missiles, or TacNukes that 
  otherwise would have been deducted from a robot¹s damage score. 
  Each point of damage that is done deducts one point from the shield level, 
  until no power is left in the shields. 
  The remaining damage is then done to a robot¹s damage score. 

  Even if shields are not hit, 
    they decrease by one half point each chronon from natural energy decay. 
  
  Note that this replaces the old drain of one point per chronon in previous versions of RoboWar. 
  
  Shields may be charged above the maximum shield value set in the Hardware Store 
    (although they may never exceed 150), but if they are above maximum, 
    they decrease by two points instead of one half per chronon. 
  
  Shields are set to 0 when the battle begins.
*/

export const vrw_operands = [
  SHIELD,
  // SIGNAL
];

export const REF_SHIELD = SHIELD + "'";

export const rw_virtual_refs = {
  [REF_SHIELD]: SHIELD,
}

export const rw_virtual_functions = {
  [REF_BULLET]: () => {

  },
  // [REF_MOVEX]: () => { throw ("implement REF_MOVEX handler"); },
  // [REF_MOVEY]: () => { throw ("implement REF_MOVEY handler"); },
}
