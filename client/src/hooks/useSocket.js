import { useState, useEffect } from 'react';
import { socket } from '../socket/socket.js';

/**
 * React hook to listen for Socket.IO connection status.
 * Gracefully handles offline or disconnected states.
 */
export function useSocket() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [connectionError, setConnectionError] = useState(null);
  const [socketId, setSocketId] = useState(socket.id || null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setConnectionError(null);
      setSocketId(socket.id);
    }

    function onDisconnect(reason) {
      setIsConnected(false);
      setSocketId(null);
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, reconnect manually
        socket.connect();
      }
    }

    function onConnectError(err) {
      setIsConnected(false);
      setConnectionError(err.message || 'Server unreachable');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);

    // Initial check
    if (socket.connected) {
      setIsConnected(true);
      setSocketId(socket.id);
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
    };
  }, []);

  return {
    socket,
    isConnected,
    socketId,
    connectionError,
  };
}
