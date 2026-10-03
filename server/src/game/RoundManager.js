/**
 * RoundManager (Phase 7 Foundation)
 * Handles round timers, sudden death countdowns, and round transitions.
 */
export class RoundManager {
  constructor(totalRounds = 5) {
    this.totalRounds = totalRounds;
    this.currentRound = 1;
    this.roundDurationSec = 60;
    this.remainingSec = 60;
  }

  nextRound() {
    this.currentRound++;
    this.remainingSec = this.roundDurationSec;
  }

  isMatchComplete() {
    return this.currentRound >= this.totalRounds;
  }
}
