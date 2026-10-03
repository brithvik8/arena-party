/**
 * Client Game State Store
 * In-memory store for client player preferences and active room cache.
 */

const STORAGE_KEYS = {
  PLAYER_NAME: 'party_arena_name',
  PLAYER_COLOR: 'party_arena_color',
};

export const gameStore = {
  getPlayerName() {
    try {
      return localStorage.getItem(STORAGE_KEYS.PLAYER_NAME) || 'VIPER_01';
    } catch {
      return 'VIPER_01';
    }
  },

  setPlayerName(name) {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAYER_NAME, name);
    } catch {}
  },

  getPlayerColor() {
    try {
      return localStorage.getItem(STORAGE_KEYS.PLAYER_COLOR) || '#B9121B';
    } catch {
      return '#B9121B';
    }
  },

  setPlayerColor(color) {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAYER_COLOR, color);
    } catch {}
  },
};
