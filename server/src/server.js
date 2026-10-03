import http from 'node:http';
import express from 'express';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import { registerRoomHandlers } from './socket/roomHandlers.js';
import { registerLobbyHandlers } from './socket/lobbyHandlers.js';
import { registerGameHandlers } from './socket/gameHandlers.js';
import { SOCKET_EVENTS } from './utils/constants.js';

const app = express();
const httpServer = http.createServer(app);

// CORS configuration for local development & preview environments
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or same-origin)
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Socket.IO Server Initialization
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  pingTimeout: 30000,
  pingInterval: 25000,
});

// REST Health Check & Server Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'PARTY ARENA',
    activeSockets: io.engine.clientsCount,
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// Socket.IO Connection Handler
io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
  console.log(`[Party Arena Socket] Client connected: ${socket.id} (Transport: ${socket.conn.transport.name})`);

  // Notify the newly connected client
  socket.emit(SOCKET_EVENTS.PLAYER_CONNECTED, {
    socketId: socket.id,
    serverTime: Date.now(),
  });

  // Register modular domain handlers
  registerRoomHandlers(io, socket);
  registerLobbyHandlers(io, socket);
  registerGameHandlers(io, socket);

  // Client Disconnect Handling
  socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
    console.log(`[Party Arena Socket] Client disconnected: ${socket.id} (Reason: ${reason})`);
  });
});

/**
 * Start the standalone Party Arena server
 * @param {number} port
 * @returns {http.Server}
 */
export function startServer(port = process.env.PORT || 3001) {
  return httpServer.listen(port, () => {
    console.log(`[Party Arena Server] Running on http://localhost:${port}`);
    console.log(`[Party Arena Server] Socket.IO listening on port ${port}`);
  });
}

// Allow direct execution: `node server/src/server.js`
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  startServer();
}

export { app, httpServer, io };
