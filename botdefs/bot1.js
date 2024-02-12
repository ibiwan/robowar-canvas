export const def = {
  x: 200,
  y: 40,
  speedx: 0,
  speedy: 0,
  color: "#0000DD",
  aim: 0,
  cpuSpeed: 20,
  rawCode: `
    Start:
      -5 SPEEDX' STORE
      7 SPEEDY' STORE
      AIM 3 - AIM' STORE
    Loop:
      # RANGE Fire IFG
      0 X = LeftWall IFG
      300 X = RightWall IFG
    TopBott:
      0 Y = TopWall IFG
      300 Y = BottomWall IFG
      AIM 7 + AIM' STORE
      Loop JUMP
    Fire:
      100 BULLET' STORE
      LOOP JUMP
    LeftWall:
      SPEEDX ABS SPEEDX' STORE
      TopBott JUMP
    RightWall:
      SPEEDX ABS CHS SPEEDX' STORE
      TopBott JUMP
    TopWall:
      SPEEDY ABS SPEEDY' STORE
      Loop JUMP
    BottomWall:
      SPEEDY ABS CHS SPEEDY' STORE
      Loop JUMP
    Stop:
      AIM 7 + AIM' STORE
      Stop JUMP
  `
  // parsertest:       "the #it's a definite article \n quick \r brown\tfox :jumps\r over\nthe\r\n:really lazy dog 8 12 'dog '12 dog8",
};