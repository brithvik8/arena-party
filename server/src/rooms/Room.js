import { ROOM_CONSTANTS, GAME_MODES } from '../utils/constants.js';

/**
 * Room state container for a Party Arena session.
 */
export class Room {
  /**
   * @param {string} id Room code (e.g., 'X7K9P')
   * @param {string} hostId Socket ID of the room creator
   */
  constructor(id, hostId) {
    this.id = id;
    this.hostId = hostId;
    this.players = new Map(); // socketId -> Player
    this.status = 'waiting'; // 'waiting' | 'countdown' | 'in_progress' | 'ended'
    this.currentRound = 0;
    this.createdAt = Date.now();

    this.settings = {
      totalRounds: ROOM_CONSTANTS.DEFAULT_ROUNDS,
      maxPlayers: ROOM_CONSTANTS.MAX_PLAYERS,
      selectedModes: [
        GAME_MODES.CLASSIC_BUMP,
        GAME_MODES.SLIPPERY_ARENA,
        GAME_MODES.SHRINKING_ARENA,
      ],
      randomizeModes: true,
    };
  }

  addPlayer(player) {
    if (this.players.size >= this.settings.maxPlayers) {
      throw new Error('Room is at maximum player capacity.');
    }
    this.players.set(player.id, player);
    return player;
  }

  removePlayer(playerId) {
    const player = this.players.get(playerId);
    if (!player) return null;

    this.players.delete(playerId);

    // If host left, elect the next joined player as new host
    if (this.hostId === playerId && this.players.size > 0) {
      const nextHost = this.players.values().next().value;
      if (nextHost) {
        this.hostId = nextHost.id;
        nextHost.isHost = true;
      }
    }

    return player;
  }

  getPlayer(playerId) {
    return this.players.get(playerId) || null;
  }

  updateSettings(newSettings = {}) {
    if (typeof newSettings.totalRounds === 'number') {
      this.settings.totalRounds = Math.max(
        ROOM_CONSTANTS.MIN_ROUNDS,
        Math.min(ROOM_CONSTANTS.MAX_ROUNDS, newSettings.totalRounds)
      );
    }
    if (Array.isArray(newSettings.selectedModes)) {
      this.settings.selectedModes = newSettings.selectedModes;
    }
    if (typeof newSettings.randomizeModes === 'boolean') {
      this.settings.randomizeModes = newSettings.randomizeModes;
    }
  }

  isEmpty() {
    return this.players.size === 0;
  }

  toJSON() {
    return {
      id: this.id,
      hostId: this.hostId,
      status: this.status,
      currentRound: this.currentRound,
      settings: this.settings,
      players: Array.from(this.players.values()).map(p => p.toJSON()),
      playerCount: this.players.size,
      maxPlayers: this.settings.maxPlayers,
    };
  }
}
