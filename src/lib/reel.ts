const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** 0 when the section reaches the top of the viewport, 1 when the strip has fully moved. */
export function reelProgress(sectionTop: number, distance: number): number {
  return distance <= 0 ? 0 : clamp(-sectionTop / distance, 0, 1);
}

/** Horizontal travel of the strip and the section height that scrolls it. */
export function reelHeight(
  stripWidth: number,
  viewportWidth: number,
  viewportHeight: number,
): { distance: number; height: number } {
  const distance = Math.max(stripWidth - viewportWidth, 0);
  return { distance, height: distance + viewportHeight };
}

/** Image drift in px for a card, opposite to the direction of travel. */
export function parallaxOffset(
  cardCenter: number,
  viewportWidth: number,
  strength = 40,
): number {
  return ((cardCenter - viewportWidth / 2) / viewportWidth) * -strength;
}

/** Scroll offset into the section that centers a focused card. */
export function focusScrollOffset(
  cardOffset: number,
  cardWidth: number,
  viewportWidth: number,
  distance: number,
): number {
  return clamp(cardOffset - (viewportWidth - cardWidth) / 2, 0, distance);
}
