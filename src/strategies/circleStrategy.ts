import { height, width } from "../main";
import { Vector } from "../vector";
import {
  clockWisePlainDirectionVectors,
  directionVectors,
  MovementStrategy,
} from "./movementStrategies";

export function buildCircleStrategy(velocity: number): MovementStrategy {
  let dir = directionVectors.UP;

  function turnLeft() {
    dir =
      clockWisePlainDirectionVectors[
        (clockWisePlainDirectionVectors.indexOf(dir) + 1) %
          clockWisePlainDirectionVectors.length
      ];
  }

  return {
    init(vac) {
      vac.position = [0, height - vac.size[1]];
    },
    handleInput(vac) {
      if (
        vac.position[0] === 0 ||
        vac.position[0] + vac.size[0] === width ||
        vac.position[1] === 0 ||
        vac.position[1] + vac.size[1] === height
      ) {
        turnLeft();
      }
    },
    update(vacuum) {
      vacuum.position = Vector.add(
        vacuum.position,
        Vector.scale(dir, velocity)
      );

      if (vacuum.position[0] + vacuum.size[0] > width) {
        turnLeft();
        vacuum.position[0] = width - vacuum.size[0];
      } else if (vacuum.position[0] < 0) {
        turnLeft();
        vacuum.position[0] = 0;
      } else if (vacuum.position[1] < 0) {
        turnLeft();
        vacuum.position[1] = 0;
      } else if (vacuum.position[1] + vacuum.size[1] > height) {
        turnLeft();
        vacuum.position[1] = height - vacuum.size[1];
      }
    },
  };
}
