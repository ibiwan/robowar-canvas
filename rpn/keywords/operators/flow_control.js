export const CALL = 'CALL';
export const IF = 'IF';
export const IFE = 'IFE';
export const IFG = 'IFG';
export const JUMP = 'JUMP';
export const NOP = 'NOP';
export const RETURN = 'RETURN';
export const SYNC = 'SYNC';

export const flowcontrol_operators = [
  // branch and leave return address
  CALL, // pop target addr, push curr addr, jump target
  IF,   // pop target, pop condition, (push curr and jump tgt) if cond
  IFE,  // pop targetfalse, pop targettrue, pop cmp, 
        // push curr, jump targettrue if cond else jump targetfalse

  // branch with NO return address
  IFG,     // as if, but no return
  IFEG,    // as ife, but no return
  JUMP,    // as call, but no return address
  RETURN,  // same as jump!
  // setint, rti

/*
COLLISION, WALL, DAMAGE, SHIELD, TOP, BOTTOM, LEFT, RIGHT, RADAR, RANGE, TEAMMATES, ROBOTS, SIGNAL, CHRONON
All of these, except for range and radar, trigger at the beginning of a chronon. The range and radar interrupts can also trigger as the turret is turned and a target or shot comes into view.
The range, radar and chronon interrupts are slightly different from the others. They are never queued, and are thus not affected by the flushint command. Also, they will not trigger if an interrupt of higher priority occurs first.
setparam: damage, shield, top(etc), radar, range, teammates, robots, signal, chronon
*/

  // other
  NOP,     // do nothing
  SYNC,    // do nothing for remainder of chronon
  // beep, debug, debugger
  // inton, intoff, flushint, icon0 .. icon9, snd0 .. snd9
  // setparam 2 -> 0
  // Sets a parameter controlling when interrupts occur. The top of the stack must have the name of the register corresponding to the interrupt. The second item on the stack is the value to which the parameter will be set. Note that COLLISION and WALL ignore their parameters. The remaining default parameters are 150 for DAMAGE, 20 for TOP, 280 for BOTTOM, 20 for LEFT, 280 for RIGHT, 600 for RADAR and RANGE, and 0 for SIGNAL. SETPARAM may also be used to set information for the PROBE and HISTORY registers. Ex: "100 RANGE' SETPARAM" leaves nothing on the stack.
];
