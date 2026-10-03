import { roomManager } from '../rooms/roomManager.js';
import { Player } from '../players/Player.js';
import { SOCKET_EVENTS } from '../utils/constants.js';

/**
 * Register room lifecycle handlers for a connected socket client.
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
export function registerRoomHandlers(io, socket) {
  // Create Room
  socket.on(SOCKET_EVENTS.ROOM_CREATE, (payload, callback) => {
    try {
      const room = roomManager.createRoom(socket.id);
      const player = new Player({
        id: socket.id,
        name: payload?.playerName,
        color: payload?.playerColor,
        isHost: true,
      });

      room.addPlayer(player);
      socket.join(room.id);

      console.log(`[Room] Room created: ${room.id} by host ${socket.id}`);

      const state = room.toJSON();
      if (typeof callback === 'function') {
        callback({ success: true, room: state, playerId: socket.id });
      }

      io.to(room.id).emit(SOCKET_EVENTS.ROOM_STATE_UPDATED, state);
    } catch (err) {
      console.error(`[Room] Error creating room:`, err.message);
      if (typeof callback === 'function') {
        callback({ success: false, error: err.message });
      }
    }
  });

  // Join Room
  socket.on(SOCKET_EVENTS.ROOM_JOIN, (payload, callback) => {
    try {
      const roomCode = payload?.roomCode?.toUpperCase()?.trim();
      const room = roomManager.getRoom(roomCode);

      if (!room) {
        if (typeof callback === 'function') {
          return callback({ success: false, error: 'Room not found. Check your 5-digit code.' });
        }
        return;
      }

      const player = new Player({
        id: socket.id,
        name: payload?.playerName,
        color: payload?.playerColor,
        isHost: false,
      });

      room.addPlayer(player);
      socket.join(room.id);

      console.log(`[Room] Player ${player.name} (${socket.id}) joined room ${room.id}`);

      const state = room.toJSON();
      if (typeof callback === 'function') {
        callback({ success: true, room: state, playerId: socket.id });
      }

      io.to(room.id).emit(SOCKET_EVENTS.ROOM_STATE_UPDATED, state);
    } catch (err) {
      console.error(`[Room] Error joining room:`, err.message);
      if (typeof callback === 'function') {
        callback({ success: false, error: err.message });
      }
    }
  });

  // Leave Room
  socket.on(SOCKET_EVENTS.ROOM_LEAVE, (_, callback) => {
    const room = roomManager.getRoomByPlayerId(socket.id);
    if (!room) return;

    room.removePlayer(socket.id);
    socket.leave(room.id);
    console.log(`[Room] Player ${socket.id} left room ${room.id}`);

    if (room.isEmpty()) {
      roomManager.removeRoom(room.id);
      console.log(`[Room] Room ${room.id} cleaned up (empty)`);
    } else {
      io.to(room.id).emit(SOCKET_EVENTS.ROOM_STATE_UPDATED, room.toJSON());
    }

    if (typeof callback === 'function') {
      callback({ success: true });
    }
  });

  // Get Room State
  socket.on(SOCKET_EVENTS.ROOM_GET_STATE, (payload, callback) => {
    const room = roomManager.getRoom(payload?.roomCode) || roomManager.getRoomByPlayerId(socket.id);
    if (typeof callback === 'function') {
      if (room) {
        callback({ success: true, room: room.toJSON() });
      } else {
        callback({ success: false, error: 'Room not found' });
      }
    }
  });
}
