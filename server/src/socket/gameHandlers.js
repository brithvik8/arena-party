import { roomManager } from '../rooms/roomManager.js';
import { SOCKET_EVENTS } from '../utils/constants.js';

/**
 * Architecture placeholder for match and gameplay handlers.
 * NOTE: Phase 1 establishes the event architecture; gameplay loop is scheduled for Phase 6+.
 *
 * Future Server-Authoritative Loop:
 * Client sends player:input (movement vector / dash trigger)
 * Server validates input within physics tick (60Hz)
 * Server calculates collision, momentum, arena boundaries
 * Server broadcasts authoritative game state
 *
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
export function registerGameHandlers(io, socket) {
  // Host Start Match trigger (Phase 6+)
  socket.on(SOCKET_EVENTS.HOST_START_MATCH, () => {
    const room = roomManager.getRoomByPlayerId(socket.id);
    if (!room || room.hostId !== socket.id) return;

    console.log(`[Game] Host ${socket.id} initiated match in room ${room.id} (Phase 6 implementation)`);
    // Placeholder transition to countdown in future phase
    room.status = 'countdown';
    io.to(room.id).emit(SOCKET_EVENTS.MATCH_COUNTDOWN, { countdown: 3 });
  });

  // Player Input (movement, bump trigger - Phase 6+)
  socket.on(SOCKET_EVENTS.PLAYER_INPUT, (inputPayload) => {
    // Will be routed through physics/engine in Phase 6
  });

  // Player Bump Event (collision verification - Phase 6+)
  socket.on(SOCKET_EVENTS.PLAYER_BUMP, (bumpPayload) => {
    // Authoritative collision validation in Phase 6
  });
}
