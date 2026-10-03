/**
 * GameManager (Phase 6 Foundation)
 * Orchestrates match flow, active modes, and game loop tick.
 */
export class GameManager {
  constructor(room) {
    this.room = room;
    this.isActive = false;
    this.currentMode = null;
  }

  startMatch() {
    this.isActive = true;
    console.log(`[GameManager] Match initialization queued for room ${this.room?.id}`);
  }

  tick(deltaTime) {
    // 60Hz server tick loop placeholder
  }

  endMatch() {
    this.isActive = false;
  }
}
