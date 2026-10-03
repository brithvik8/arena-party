/**
 * Collision Engine Foundation (Phase 6)
 * Detects bumper puck collisions and applies rebound impulses.
 */

export function checkCircleCollision(p1, p2, radius = 24) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const distSq = dx * dx + dy * dy;
  const minDist = radius * 2;
  return distSq <= minDist * minDist;
}

export function resolveElasticBump(p1, p2, elasticity = 1.2) {
  // Elastic momentum exchange placeholder for Phase 6
  return { p1Impulse: { vx: 0, vy: 0 }, p2Impulse: { vx: 0, vy: 0 } };
}
