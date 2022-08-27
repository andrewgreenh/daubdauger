export function areRectsOverlapping(
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number }
) {
  const xOverlap = areRangesOverlapping(
    { from: rect1.x, to: rect1.x + rect1.width },
    { from: rect2.x, to: rect2.x + rect2.width }
  );

  const yOverlap = areRangesOverlapping(
    { from: rect1.y, to: rect1.y + rect1.height },
    { from: rect2.y, to: rect2.y + rect2.height }
  );

  return xOverlap && yOverlap;
}

function areRangesOverlapping(
  range1: { from: number; to: number },
  range2: { from: number; to: number }
) {
  const m1 = (range1.from + range1.to) / 2;
  const r1 = Math.abs(range1.from - range1.to) / 2;
  const m2 = (range2.from + range2.to) / 2;
  const r2 = Math.abs(range2.from - range2.to) / 2;

  const distanceOfMidPoints = Math.abs(m1 - m2);

  return distanceOfMidPoints < r1 + r2;
}
