import { height, width } from "../main";
import { Vector } from "../vector";
import {
  directionVectors,
  MovementStrategy,
  PlainDirection,
} from "./movementStrategies";

export function buildSimpleUpDownStrategy(velocity: number): MovementStrategy {
  let lastDirection: PlainDirection = "RIGHT";
  let currentDirection: PlainDirection = "RIGHT";

  return {
    init(vac) {
      vac.position = [0, height - vac.size[1]];
    },
    handleInput() {
      if (currentDirection !== "UP" && currentDirection !== "DOWN") {
        currentDirection = "UP";
      }
    },
    update(vacuum) {
      vacuum.position = Vector.add(
        vacuum.position,
        Vector.scale(directionVectors[currentDirection], velocity)
      );

      const updatesByDirection = {
        RIGHT: () => {
          if (vacuum.position[0] + vacuum.size[0] >= width) {
            lastDirection = "LEFT";
            currentDirection = "LEFT";
            vacuum.position[0] = width - vacuum.size[0];
          }
        },
        LEFT: () => {
          if (vacuum.position[0] <= 0) {
            lastDirection = "RIGHT";
            currentDirection = "RIGHT";
            vacuum.position[0] = 0;
          }
        },
        UP: () => {
          if (vacuum.position[1] <= 0) {
            currentDirection = "DOWN";
            vacuum.position[1] = 0;
          }
        },
        DOWN: () => {
          if (vacuum.position[1] + vacuum.size[1] >= height) {
            currentDirection = lastDirection;
            vacuum.position[1] = height - vacuum.size[1];
          }
        },
      };

      updatesByDirection[currentDirection]();
    },
  };
}
