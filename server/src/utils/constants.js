/**
 * Party Arena Server Constants & Socket Event Names
 * Defines event channels, room limits, and game mode identifiers.
 */

export const SOCKET_EVENTS = {
  // Connection events
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  PLAYER_CONNECTED: 'player:connected',
  PLAYER_DISCONNECTED: 'player:disconnected',
  PLAYER_RECONNECTED: 'player:reconnected',

  // Room lifecycle
  ROOM_CREATE: 'room:create',
  ROOM_JOIN: 'room:join',
  ROOM_LEAVE: 'room:leave',
  ROOM_GET_STATE: 'room:getState',
  ROOM_STATE_UPDATED: 'room:stateUpdated',
  ROOM_ERROR: 'room:error',

  // Player lobby customizations
  PLAYER_UPDATE_NAME: 'player:updateName',
  PLAYER_UPDATE_COLOR: 'player:updateColor',
  PLAYER_READY: 'player:ready',

  // Host room configurations
  HOST_SET_ROUNDS: 'host:setRounds',
  HOST_SET_GAMES: 'host:setGames',
  HOST_SET_RANDOM_MODE: 'host:setRandomMode',
  HOST_START_MATCH: 'host:startMatch',

  // Match progression
  MATCH_STARTED: 'match:started',
  MATCH_COUNTDOWN: 'match:countdown',
  MATCH_ROUND_STARTED: 'match:roundStarted',
  MATCH_ROUND_ENDED: 'match:roundEnded',
  MATCH_ENDED: 'match:ended',

  // Gameplay actions (Phase 6+)
  PLAYER_INPUT: 'player:input',
  PLAYER_BUMP: 'player:bump',
  PLAYER_ELIMINATED: 'player:eliminated',
  GAME_STATE_TICK: 'game:stateTick',
};

export const ROOM_CONSTANTS = {
  MIN_PLAYERS: 2,
  MAX_PLAYERS: 8,
  ROOM_CODE_LENGTH: 5,
  DEFAULT_ROUNDS: 5,
  MIN_ROUNDS: 1,
  MAX_ROUNDS: 15,
};

export const PLAYER_COLORS = [
  { id: 'cyan', name: 'Neon Cyan', hex: '#00DAF3' },
  { id: 'scarlet', name: 'Scarlet Red', hex: '#B9121B' },
  { id: 'amber', name: 'Electric Amber', hex: '#FFB300' },
  { id: 'lime', name: 'Toxic Lime', hex: '#39FF14' },
  { id: 'pink', name: 'Hot Pink', hex: '#FF2A85' },
  { id: 'purple', name: 'Vivid Purple', hex: '#B026FF' },
  { id: 'blue', name: 'Midnight Navy', hex: '#3C486D' },
  { id: 'white', name: 'Stark White', hex: '#FDFDFD' },
];

export const GAME_MODES = {
  CLASSIC_BUMP: 'classic_bump',
  SLIPPERY_ARENA: 'slippery_arena',
  SHRINKING_ARENA: 'shrinking_arena',
  LOW_GRAVITY: 'low_gravity',
  BOUNCY_WALLS: 'bouncy_walls',
};
