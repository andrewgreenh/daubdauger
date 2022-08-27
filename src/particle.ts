import { height, width } from "./main";
import { random } from "./math";
import { Vector } from "./vector";

const padding = 50;

export class Particle {
  position = Vector.to(
    random(padding, width - padding),
    random(padding, height - padding)
  );
  height = 20;
  width = 4;

  paint(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    const [x, y] = this.position;
    const w = this.width;
    const h = this.height;

    ctx.save();

    ctx.translate(x, y);
    ctx.fillRect(-w / 2, -h / 2, w, h);

    ctx.rotate(Math.PI / 4);

    ctx.fillRect(-w / 2, -h / 2, w, h);

    ctx.rotate(Math.PI / 4);

    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.rotate(Math.PI / 4);

    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.restore();
  }
}
