import { Vacuum } from "../vaccum";
import { Vector } from "../vector";

export type MovementStrategy = {
  handleInput: (vacuum: Vacuum) => void;
  update: (vacuum: Vacuum) => void;
  init: (vacuum: Vacuum) => void;
};

export const directionVectors = {
  UP: Vector.to(0, -1),
  UP_RIGHT: Vector.normalize(Vector.to(1, -1)),
  RIGHT: Vector.to(1, 0),
  DOWN_RIGHT: Vector.normalize(Vector.to(1, 1)),
  DOWN: Vector.to(0, 1),
  DOWN_LEFT: Vector.normalize(Vector.to(-1, 1)),
  LEFT: Vector.to(-1, 0),
  UP_LEFT: Vector.normalize(Vector.to(1, 1)),
};

export type PlainDirection = "UP" | "RIGHT" | "DOWN" | "LEFT";

export const clockWisePlainDirectionVectors = [
  directionVectors.UP,
  directionVectors.RIGHT,
  directionVectors.DOWN,
  directionVectors.LEFT,
];
