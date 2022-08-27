export type Vector = [number, number];

export const Vector = {
  to: (x: number, y: number): Vector => [x, y],
  add: (a: Vector, b: Vector): Vector => [a[0] + b[0], a[1] + b[1]],
  scale: (a: Vector, b: number): Vector => [a[0] * b, a[1] * b],
  length: (a: Vector) => (a[0] ** 2 + a[1] ** 2) ** 0.5,
  normalize: (a: Vector): Vector => {
    const length = Vector.length(a);
    return [a[0] / length, a[1] / length];
  },
};

Object.assign(window, { Vector });
