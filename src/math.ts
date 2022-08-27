export function random(min: number, max: number) {
  const diff = max - min + 1;
  return Math.round(Math.random() * diff + min);
}
