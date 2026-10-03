/**
 * Client-Side Interpolation (Phase 6 Foundation)
 * Smooths position snapshots received from server ticks.
 */
export function lerp(start, end, factor) {
  return start + (end - start) * factor;
}
