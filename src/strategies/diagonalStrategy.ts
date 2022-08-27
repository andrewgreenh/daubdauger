import { height, width } from "../main";
import { Vector } from "../vector";
import { directionVectors, MovementStrategy } from "./movementStrategies";

export function buildDiagonalStrategy(velocity: number): MovementStrategy {
  let dir = directionVectors.RIGHT;

  return {
    init(vac) {
      vac.position = [0, height - vac.size[1]];
    },
    handleInput(vac) {
      if (vac.position[1] + vac.size[1] === height) {
        dir = Vector.normalize([dir[0], -1]);
      }
    },
    update(vacuum) {
      vacuum.position = Vector.add(
        vacuum.position,
        Vector.scale(dir, velocity)
      );

      if (vacuum.position[0] + vacuum.size[0] > width) {
        vacuum.position[0] = width - vacuum.size[0];
        dir = [dir[0] * -1, dir[1]];
      } else if (vacuum.position[0] < 0) {
        vacuum.position[0] = 0;
        dir = [dir[0] * -1, dir[1]];
      } else if (vacuum.position[1] < 0) {
        vacuum.position[1] = 0;
        dir = [dir[0], dir[1] * -1];
      } else if (vacuum.position[1] + vacuum.size[1] > height) {
        vacuum.position[1] = height - vacuum.size[1];
        dir = Vector.normalize([dir[0], 0]);
      }
    },
  };
}
