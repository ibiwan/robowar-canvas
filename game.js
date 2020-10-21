const canvas = document.getElementById("arena");
const ctx = canvas.getContext("2d");
const rate = 10;

const arenaSide = 300;
const botRadius = 16;

const rawBots = [
  {
    x: 200,
    y: 40,
    speedx: 0,
    speedy: 0,
    color: "#EE0000",
    aim: 0,
    dAim: 8,
    cpu: 5,
    rawCode: `
      Start:
        -1 speedx' STORE
      Loop:
        0 x = LeftWall IFG
        300 x = RightWall IFG
        Loop JUMP
      LeftWall:
        1 speedx' STORE
        Loop Jump
      RightWall:
        -1 speedx' STORE
        Loop Jump
      Stop:
        AIM 7 + AIM' STORE
        Stop JUMP
    `
    // parsertest:       "the #it's a definite article \n quick \r brown\tfox :jumps\r over\nthe\r\n:really lazy dog 8 12 'dog '12 dog8",
  },
  // {
  //   x: 20,
  //   y: 40,
  //   speedx: -1,
  //   speedy: -2,
  //   color: "#00CC33",
  //   aim: 180,
  //   dAim: -12,
  //   cpu: 10,
  //   rawCode: "",
  // },
];

let bots;

const updateDim = (x, speedx) => {
  x += speedx;
  if (x > arenaSide) {
    x = arenaSide;
    speedx = 0;
  }
  if (x < 0) {
    x = 0;
    speedx = 0;
  }

  // console.log([x, speedx])

  return [x, speedx];
};

const init = () => {
  canvas.width = arenaSide + 2 * botRadius;
  canvas.height = arenaSide + 2 * botRadius;

  bots = rawBots.map(compile);
  console.log({ bots });

  setTimeout(update, 0);
};

const drawBot = (ctx, bot) => {
  let { x, y, speedx, speedy, color, aim, dAim } = bot;

  ctx.beginPath();
  ctx.rect(x , y, 2 * botRadius, 2 * botRadius);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(x + botRadius, y+botRadius);
  ctx.lineTo(
    x + botRadius + botRadius * Math.cos((aim * Math.PI) / 180),
    y + botRadius + botRadius * Math.sin((aim * Math.PI) / 180)
  );
  ctx.stroke();
  ctx.closePath();
}

const update = () => {
  const startTime = new Date().getTime();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bots.forEach((bot) => {
    
    execChronon(bot, {});
    
    // console.log({bot})
    // throw new Error('purple')
    
    // console.log({x, speedx});
    
      let { x, y, speedx, speedy, aim, dAim } = bot;
      [x, speedx] = updateDim(x, speedx);
      [y, speedy] = updateDim(y, speedy);
      aim += dAim;
      Object.assign(bot, {x, speedx, y, speedy, aim, dAim})
            
      drawBot(ctx, bot);
    });

  setTimeout(update, rate - (new Date().getTime() - startTime));
};

init();
