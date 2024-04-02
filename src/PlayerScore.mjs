export class PlayerScore {
  MULTIPLIER = 100
  score = 0

  subscribe(board) {
    board.subscribe(this);
  }
}