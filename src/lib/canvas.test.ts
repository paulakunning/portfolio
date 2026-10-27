import { describe, expect, it } from "vitest";
import { dragPosition } from "./canvas";

const canvas = { left: 100, top: 50, width: 1000, height: 500 };
const tile = { width: 80, height: 80 };
const grab = { x: 10, y: 20 };

describe("dragPosition", () => {
  it("returns the position as a percentage of the canvas", () => {
    expect(dragPosition({ x: 610, y: 320 }, grab, tile, canvas)).toEqual({
      x: 50,
      y: 50,
    });
  });
  it("keeps the tile inside the right and bottom edges", () => {
    expect(dragPosition({ x: 5000, y: 5000 }, grab, tile, canvas)).toEqual({
      x: 92,
      y: 84,
    });
  });
  it("keeps the tile inside the left and top edges", () => {
    expect(dragPosition({ x: 0, y: 0 }, grab, tile, canvas)).toEqual({
      x: 0,
      y: 0,
    });
  });
});
