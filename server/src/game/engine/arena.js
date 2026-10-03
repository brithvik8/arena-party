/**
 * Arena Boundary & Shrinking Ring Foundation (Phase 6)
 */

export const ARENA_CONFIG = {
  INITIAL_RADIUS: 420,
  MIN_RADIUS: 120,
  SHRINK_RATE: 2.5, // pixels per second during sudden death
};

export function isOutOfBounds(position, currentRadius = ARENA_CONFIG.INITIAL_RADIUS, center = { x: 0, y: 0 }) {
  const dx = position.x - center.x;
  const dy = position.y - center.y;
  return (dx * dx + dy * dy) > (currentRadius * currentRadius);
}
