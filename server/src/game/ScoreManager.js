/**
 * ScoreManager (Phase 7 Foundation)
 * Tracks round wins, survival times, knockouts, and total leaderboard points.
 */
export class ScoreManager {
  constructor() {
    this.scores = new Map(); // playerId -> { points, wins, knockouts }
  }

  initPlayer(playerId) {
    if (!this.scores.has(playerId)) {
      this.scores.set(playerId, { points: 0, wins: 0, knockouts: 0 });
    }
  }

  addKnockout(playerId) {
    const stats = this.scores.get(playerId);
    if (stats) stats.knockouts++;
  }

  addRoundWin(playerId) {
    const stats = this.scores.get(playerId);
    if (stats) stats.wins++;
  }

  getStandings() {
    return Array.from(this.scores.entries()).map(([playerId, stats]) => ({
      playerId,
      ...stats,
    }));
  }
}
