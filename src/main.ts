import { areRectsOverlapping } from "./checkCollision";
import { Particle } from "./particle";
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

const vac = new Vacuum();

let particles = Array(10)
  .fill(0)
  .map(() => new Particle());

function loop() {
  ctx.clearRect(0, 0, width, height);

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

    vac.velocity += 3;
  }

  for (const p of particles) p.paint(ctx);

  vac.paint(ctx);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
