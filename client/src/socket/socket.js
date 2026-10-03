import { io } from 'socket.io-client';

/**
 * Socket.IO Client Singleton
 * Resolves server URL using VITE_SERVER_URL env or current browser origin.
 * Ensures only a single socket connection instance exists.
 */

function getServerUrl() {
  if (typeof window === 'undefined') return 'http://localhost:3000';
  
  // Custom environment variable override
  if (import.meta.env?.VITE_SERVER_URL) {
    return import.meta.env.VITE_SERVER_URL;
  }
  
  // If Vite is on port 5173 in standard split local dev, backend is typically on 3001
  if (window.location.port === '5173') {
    return 'http://localhost:3001';
  }

  // Default to current host & port (e.g. unified full-stack port 3000)
  return window.location.origin;
}

const SERVER_URL = getServerUrl();

export const socket = io(SERVER_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  transports: ['websocket', 'polling'],
});

// Diagnostic lifecycle logging
socket.on('connect', () => {
  console.log(`[Socket Client] Connected to Party Arena server (${SERVER_URL}) with ID: ${socket.id}`);
});

socket.on('disconnect', (reason) => {
  console.warn(`[Socket Client] Disconnected from server: ${reason}`);
});

socket.on('connect_error', (error) => {
  console.error(`[Socket Client] Connection failed: ${error.message}`);
});

export default socket;
