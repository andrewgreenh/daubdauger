import { height, width } from "./main";
import { Vector } from "./vector";

const directions = {
  RIGHT: Vector.to(1, 0),
  LEFT: Vector.to(-1, 0),
  UP: Vector.to(0, -1),
  DOWN: Vector.to(0, 1),
};

export class Vacuum {
  lastSide: keyof typeof directions = "RIGHT";
  mode: keyof typeof directions = "RIGHT";
  size = Vector.to(192, 102);

  position = Vector.to(0, height - this.size[1]);

  velocity = 8;

  constructor() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") this.turn();
    });
    document.addEventListener("click", () => this.turn());
  }

  turn() {
    if (this.mode !== "UP" && this.mode !== "DOWN") {
      this.mode = "UP";
    }
  }

  update() {
    this.position = Vector.add(
      this.position,
      Vector.scale(directions[this.mode], this.velocity)
    );
    this.checkWalls[this.mode]();
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

  checkWalls = {
    RIGHT: () => {
      if (this.position[0] + this.size[0] >= width) {
        this.lastSide = "LEFT";
        this.mode = "LEFT";
        this.position[0] = width - this.size[0];
      }
    },
    LEFT: () => {
      if (this.position[0] <= 0) {
        this.mode = "RIGHT";
        this.lastSide = "RIGHT";
        this.position[0] = 0;
      }
    },
    UP: () => {
      if (this.position[1] <= 0) {
        this.mode = "DOWN";
        this.position[1] = 0;
      }
    },
    DOWN: () => {
      if (this.position[1] + this.size[1] >= height) {
        this.mode = this.lastSide;
        this.position[1] = height - this.size[1];
      }
    },
  };
}
