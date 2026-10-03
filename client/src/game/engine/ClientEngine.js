/**
 * Client Game Engine (Phase 6 Foundation)
 * Manages requestAnimationFrame render loop and interpolation.
 */
export class ClientEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }
}
