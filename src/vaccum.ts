import { height } from "./main";
import { MovementStrategy } from "./strategies/movementStrategies";
import { Vector } from "./vector";

export class Vacuum {
  size = Vector.to(192, 102);
  position = Vector.to(0, height - this.size[1]);

  constructor(public movementStrategy: MovementStrategy) {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ")
        this.movementStrategy.handleInput(this);
    });
    document.addEventListener("pointerdown", () =>
      this.movementStrategy.handleInput(this)
    );
  }

  update() {
    this.movementStrategy.update(this);
  }

  paint(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.position[0],
      this.position[1],
      this.size[0],
      this.size[1]
    );
  }
}
