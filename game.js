const canvas = document.getElementById("arena");
const ctx = canvas.getContext("2d");
const rate = 10;

const arenaSide = 300;
const botRadius = 16;

const rawBots = [
  {
    x: 20,
    y: 40,
    vx: 2,
    vy: 3,
    color: "#EE0000",
    aim: 0,
    dAim: 8,
    cpu: 15,
    rawCode:
      "the #it's a definite article \n quick \r brown\tfox :jumps\r over\nthe\r\n:really lazy dog 8 12 'dog '12 dog8",
  },
  {
    x: 20,
    y: 40,
    vx: -1,
    vy: -2,
    color: "#00CC33",
    aim: 180,
    dAim: -12,
    cpu: 10,
    rawCode: "",
  },
];

let bots;

const updateDim = (x, vx) => {
  x += vx;
  if (x > arenaSide + botRadius) {
    x = arenaSide + botRadius;
    vx = -(Math.floor(Math.random() * 3) + 1);
  }
  if (x < botRadius) {
    x = botRadius;
    vx = Math.floor(Math.random() * 3) + 1;
  }

  return [x, vx];
};

const init = () => {
  canvas.width = arenaSide + 2 * botRadius;
  canvas.height = arenaSide + 2 * botRadius;

  bots = rawBots.map(compile);
  console.log({ bots });

  setTimeout(update, 0);
};

const update = () => {
  const startTime = new Date().getTime();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bots.forEach((bot) => {
    let { x, y, vx, vy, color, aim, dAim } = bot;

    [x, vx] = updateDim(x, vx);
    [y, vy] = updateDim(y, vy);
    aim += dAim;

    Object.assign(bot, { x, y, vx, vy, aim, dAim });

    ctx.beginPath();
    ctx.rect(x - botRadius, y - botRadius, 2 * botRadius, 2 * botRadius);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + botRadius * Math.cos((aim * Math.PI) / 180),
      y + botRadius * Math.sin((aim * Math.PI) / 180)
    );
    ctx.stroke();
    ctx.closePath();
  });

  setTimeout(update, rate - (new Date().getTime() - startTime));
};

init();
