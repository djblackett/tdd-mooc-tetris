export class PlayerScore {
  MULTIPLIER = 100
  score = 0

  getScore() {
    return this.score
  }

  updateScore(rowsCleared) {
    this.score += rowsCleared * this.MULTIPLIER;
  }
}