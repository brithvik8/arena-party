import { PLAYER_COLORS } from '../utils/constants.js';

/**
 * Player model representing a participant in Party Arena.
 */
export class Player {
  /**
   * @param {Object} options
   * @param {string} options.id Socket ID or unique client token
   * @param {string} [options.name] Screen display name
   * @param {string} [options.color] Player accent color hex
   * @param {boolean} [options.isHost=false] Whether this player is the room host
   */
  constructor({ id, name, color, isHost = false }) {
    this.id = id;
    this.name = name || `Player_${id.slice(-4).toUpperCase()}`;
    this.color = color || PLAYER_COLORS[0].hex;
    this.isHost = isHost;
    this.ready = false;
    this.score = 0;
    this.position = { x: 0, y: 0 };
    this.velocity = { vx: 0, vy: 0 };
    this.alive = true;
    this.connected = true;
    this.joinedAt = Date.now();
  }

  setReady(readyStatus) {
    this.ready = Boolean(readyStatus);
  }

  setName(newName) {
    if (typeof newName === 'string' && newName.trim().length > 0) {
      this.name = newName.trim().slice(0, 16);
    }
  }

  setColor(newColor) {
    if (typeof newColor === 'string') {
      this.color = newColor;
    }
  }

  resetForRound() {
    this.alive = true;
    this.velocity = { vx: 0, vy: 0 };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      isHost: this.isHost,
      ready: this.ready,
      score: this.score,
      position: this.position,
      alive: this.alive,
      connected: this.connected,
    };
  }
}
