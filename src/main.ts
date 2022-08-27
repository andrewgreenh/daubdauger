import { areRectsOverlapping } from "./checkCollision";
import { Particle } from "./particle";
import { buildCircleStrategy } from "./strategies/circleStrategy";
import { buildDiagonalStrategy } from "./strategies/diagonalStrategy";
import { buildSimpleUpDownStrategy } from "./strategies/simpleUpDownStrategy";
import "./style.css";
import { Vacuum } from "./vaccum";

const canvas = document.createElement("canvas");

export const width = 1920;
export const height = 1080;

canvas.width = width;
canvas.height = height;

canvas.style.maxHeight = "100vh";
canvas.style.maxWidth = "100vw";
canvas.style.background = "#343434";

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d")!;

const levels = [
  buildSimpleUpDownStrategy(10),
  buildSimpleUpDownStrategy(15),
  buildSimpleUpDownStrategy(25),
  buildCircleStrategy(10),
  buildCircleStrategy(15),
  buildCircleStrategy(25),
  buildDiagonalStrategy(10),
  buildDiagonalStrategy(15),
  buildDiagonalStrategy(25),
];

let level = 0;

const vac = new Vacuum(levels[level]);
vac.movementStrategy.init(vac);

let particles = Array(10)
  .fill(0)
  .map(() => new Particle());

function loop() {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "white";
  ctx.strokeStyle = "none";

  ctx.font = "30px Arial";

  ctx.fillText(`Level ${level}`, 50, 50);

  vac.update();

  particles = particles.filter(
    (p) =>
      !areRectsOverlapping(
        {
          x: p.position[0],
          y: p.position[1],
          height: p.height,
          width: p.height,
        },
        {
          x: vac.position[0],
          y: vac.position[1],
          width: vac.size[0],
          height: vac.size[1],
        }
      )
  );

  if (particles.length === 0) {
    particles = Array(10)
      .fill(0)
      .map(() => new Particle());

    const nextLevel = levels[++level];
    if (nextLevel) {
      vac.movementStrategy = nextLevel;
      vac.movementStrategy.init(vac);
    }
  }

  for (const p of particles) p.paint(ctx);

  vac.paint(ctx);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
