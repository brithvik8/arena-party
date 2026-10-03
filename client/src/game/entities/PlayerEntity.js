/**
 * PlayerEntity (Phase 6 Foundation)
 * Client-side representation of a player's bumper disc for rendering.
 */
export class PlayerEntity {
  constructor({ id, name, color, x = 0, y = 0, radius = 24 }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}
