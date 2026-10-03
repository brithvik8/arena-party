import { Room } from './Room.js';
import { generateRoomCode } from '../utils/roomCode.js';

/**
 * In-memory room manager for Party Arena.
 */
class RoomManager {
  constructor() {
    this.rooms = new Map(); // roomId -> Room
  }

  /**
   * Create a new room with a unique room code.
   * @param {string} hostId Socket ID of creator
   * @returns {Room}
   */
  createRoom(hostId) {
    let roomId;
    let attempts = 0;
    do {
      roomId = generateRoomCode();
      attempts++;
    } while (this.rooms.has(roomId) && attempts < 100);

    const room = new Room(roomId, hostId);
    this.rooms.set(roomId, room);
    return room;
  }

  getRoom(roomId) {
    if (!roomId) return null;
    return this.rooms.get(roomId.toUpperCase().trim()) || null;
  }

  removeRoom(roomId) {
    if (!roomId) return false;
    return this.rooms.delete(roomId.toUpperCase().trim());
  }

  getRoomByPlayerId(playerId) {
    for (const room of this.rooms.values()) {
      if (room.players.has(playerId)) {
        return room;
      }
    }
    return null;
  }

  getAllRooms() {
    return Array.from(this.rooms.values());
  }
}

export const roomManager = new RoomManager();
