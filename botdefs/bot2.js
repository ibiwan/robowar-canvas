export const def = {
  x: 100,
  y: 120,
  speedx: 0,
  speedy: 0,
  color: "#EE0000",
  aim: 0,
  cpuSpeed: 20,
  rawCode: `
      Start:
        7 SPEEDX' STORE
        6 SPEEDY' STORE
      Loop:
        RANGE DROP
        0 X = LeftWall IFG
        300 X = RightWall IFG
      TopBott:
        0 Y = TopWall IFG
        300 Y = BottomWall IFG
        AIM 7 - AIM' STORE
        Loop JUMP
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
        AIM 55 + AIM' STORE
        Stop JUMP
    `
};
