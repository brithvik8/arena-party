/**
 * Physics Engine Foundation (Phase 6)
 * Server-side tick calculations for momentum, friction, and delta-time updates.
 */

export const PHYSICS_CONFIG = {
  TICK_RATE: 60,
  DELTA_TIME: 1 / 60,
  DEFAULT_FRICTION: 0.92,
  MAX_VELOCITY: 800,
  BUMP_FORCE: 450,
};

export function applyFriction(velocity, friction = PHYSICS_CONFIG.DEFAULT_FRICTION) {
  return {
    vx: velocity.vx * friction,
    vy: velocity.vy * friction,
  };
}

export function updatePosition(position, velocity, dt = PHYSICS_CONFIG.DELTA_TIME) {
  return {
    x: position.x + velocity.vx * dt,
    y: position.y + velocity.vy * dt,
  };
}
