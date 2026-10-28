import { describe, expect, it } from "vitest";
import {
  focusScrollOffset,
  parallaxOffset,
  reelHeight,
  reelImageHeight,
  reelProgress,
} from "./reel";

describe("reelProgress", () => {
  it("is 0 before and at the start", () => {
    expect(reelProgress(200, 1000)).toBe(0);
    expect(reelProgress(0, 1000)).toBe(0);
  });
  it("follows the scroll", () => expect(reelProgress(-500, 1000)).toBe(0.5));
  it("stops at 1", () => expect(reelProgress(-1500, 1000)).toBe(1));
  it("is 0 when there is nothing to scroll", () =>
    expect(reelProgress(-10, 0)).toBe(0));
});

describe("reelHeight", () => {
  it("adds the travel to the viewport height", () =>
    expect(reelHeight(3000, 1280, 800)).toEqual({
      distance: 1720,
      height: 2520,
    }));
  it("never travels backwards", () =>
    expect(reelHeight(1000, 1280, 800)).toEqual({ distance: 0, height: 800 }));
});

describe("reelImageHeight", () => {
  it("keeps the cover whole when the card fits", () =>
    expect(reelImageHeight(460, 200, 900)).toBe(460));
  it("shrinks the cover so the card fits", () =>
    expect(reelImageHeight(460, 238, 800)).toBe(402));
  it("never shrinks it below half", () =>
    expect(reelImageHeight(460, 300, 500)).toBe(230));
});

describe("parallaxOffset", () => {
  it("is 0 at the center", () =>
    expect(parallaxOffset(640, 1280)).toBeCloseTo(0));
  it("moves against the travel", () => {
    expect(parallaxOffset(1280, 1280)).toBe(-20);
    expect(parallaxOffset(0, 1280)).toBe(20);
  });
});

describe("focusScrollOffset", () => {
  it("does not scroll for the first card", () =>
    expect(focusScrollOffset(0, 800, 1280, 3000)).toBe(0));
  it("centers a middle card", () =>
    expect(focusScrollOffset(2000, 800, 1280, 3000)).toBe(1760));
  it("stops at the end", () =>
    expect(focusScrollOffset(3500, 800, 1280, 3000)).toBe(3000));
});
