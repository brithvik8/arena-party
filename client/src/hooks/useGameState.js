import { useState, useEffect } from 'react';
import { socket } from '../socket/socket.js';
import { gameStore } from '../state/gameStore.js';

/**
 * Hook to manage local player state and synchronize with room state updates.
 */
export function useGameState() {
  const [playerName, setPlayerNameState] = useState(gameStore.getPlayerName());
  const [playerColor, setPlayerColorState] = useState(gameStore.getPlayerColor());
  const [room, setRoom] = useState(null);

  useEffect(() => {
    function onRoomState(updatedRoom) {
      setRoom(updatedRoom);
    }

    socket.on('room:stateUpdated', onRoomState);

    return () => {
      socket.off('room:stateUpdated', onRoomState);
    };
  }, []);

  const updateName = (name) => {
    setPlayerNameState(name);
    gameStore.setPlayerName(name);
    if (socket.connected) {
      socket.emit('player:updateName', { name });
    }
  };

  const updateColor = (color) => {
    setPlayerColorState(color);
    gameStore.setPlayerColor(color);
    if (socket.connected) {
      socket.emit('player:updateColor', { color });
    }
  };

  return {
    playerName,
    playerColor,
    updateName,
    updateColor,
    room,
  };
}
