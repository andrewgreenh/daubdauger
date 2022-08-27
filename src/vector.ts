export type Vector = [number, number];

export const Vector = {
  to: (x: number, y: number): Vector => [x, y],
  add: (a: Vector, b: Vector): Vector => [a[0] + b[0], a[1] + b[1]],
  scale: (a: Vector, b: number): Vector => [a[0] * b, a[1] * b],
};
