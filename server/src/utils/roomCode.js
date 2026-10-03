import { ROOM_CONSTANTS } from './constants.js';

// Avoid ambiguous characters like O, 0, I, 1
const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/**
 * Generate a random uppercase alphanumeric room code.
 * @param {number} length Length of room code
 * @returns {string} Clean alphanumeric room code (e.g. "X7K9P")
 */
export function generateRoomCode(length = ROOM_CONSTANTS.ROOM_CODE_LENGTH) {
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * CHARSET.length);
    result += CHARSET[randomIndex];
  }
  return result;
}

/**
 * Validate room code format.
 * @param {string} code 
 * @returns {boolean}
 */
export function isValidRoomCode(code) {
  if (!code || typeof code !== 'string') return false;
  const trimmed = code.trim().toUpperCase();
  return trimmed.length === ROOM_CONSTANTS.ROOM_CODE_LENGTH && /^[A-Z0-9]+$/.test(trimmed);
}
