export type Point = { x: number; y: number };
export type Box = { left: number; top: number; width: number; height: number };

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** Top-left of a dragged tile as a % of the canvas, kept inside it. */
export function dragPosition(
  pointer: Point,
  grab: Point,
  tile: { width: number; height: number },
  canvas: Box,
): Point {
  const x = clamp(
    pointer.x - grab.x - canvas.left,
    0,
    canvas.width - tile.width,
  );
  const y = clamp(
    pointer.y - grab.y - canvas.top,
    0,
    canvas.height - tile.height,
  );
  return { x: (x / canvas.width) * 100, y: (y / canvas.height) * 100 };
}
