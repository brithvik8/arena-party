/**
 * Slippery Arena Mode (Phase 8)
 * Near-zero friction surface where players drift and skate with high momentum.
 */
export const SlipperyArenaMode = {
  id: 'slippery_arena',
  name: 'Slippery Ice Arena',
  badge: 'FRICTION: -80%',
  friction: 0.985, // minimal deceleration
  bumpMultiplier: 1.3,
  gravity: 1.0,
  hasShrinkingRing: false,
};
