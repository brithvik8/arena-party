import { roomManager } from '../rooms/roomManager.js';
import { SOCKET_EVENTS } from '../utils/constants.js';

/**
 * Register lobby configuration and player profile handlers.
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
export function registerLobbyHandlers(io, socket) {
  // Update Player Name
  socket.on(SOCKET_EVENTS.PLAYER_UPDATE_NAME, (payload) => {
    const room = roomManager.getRoomByPlayerId(socket.id);
    if (!room) return;

    const player = room.getPlayer(socket.id);
    if (player && payload?.name) {
      player.setName(payload.name);
      io.to(room.id).emit(SOCKET_EVENTS.ROOM_STATE_UPDATED, room.toJSON());
    }
  });

  // Update Player Color
  socket.on(SOCKET_EVENTS.PLAYER_UPDATE_COLOR, (payload) => {
    const room = roomManager.getRoomByPlayerId(socket.id);
    if (!room) return;

    const player = room.getPlayer(socket.id);
    if (player && payload?.color) {
      player.setColor(payload.color);
      io.to(room.id).emit(SOCKET_EVENTS.ROOM_STATE_UPDATED, room.toJSON());
    }
  });

  // Toggle Ready Status
  socket.on(SOCKET_EVENTS.PLAYER_READY, (payload) => {
    const room = roomManager.getRoomByPlayerId(socket.id);
    if (!room) return;

    const player = room.getPlayer(socket.id);
    if (player) {
      player.setReady(payload?.ready ?? !player.ready);
      io.to(room.id).emit(SOCKET_EVENTS.ROOM_STATE_UPDATED, room.toJSON());
    }
  });

  // Host: Configure Rounds
  socket.on(SOCKET_EVENTS.HOST_SET_ROUNDS, (payload) => {
    const room = roomManager.getRoomByPlayerId(socket.id);
    if (!room || room.hostId !== socket.id) return;

    room.updateSettings({ totalRounds: payload?.rounds });
    io.to(room.id).emit(SOCKET_EVENTS.ROOM_STATE_UPDATED, room.toJSON());
  });

  // Host: Configure Game Modes / Randomize
  socket.on(SOCKET_EVENTS.HOST_SET_RANDOM_MODE, (payload) => {
    const room = roomManager.getRoomByPlayerId(socket.id);
    if (!room || room.hostId !== socket.id) return;

    room.updateSettings({ randomizeModes: Boolean(payload?.randomize) });
    io.to(room.id).emit(SOCKET_EVENTS.ROOM_STATE_UPDATED, room.toJSON());
  });
}
