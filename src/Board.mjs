export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    const grid = [];
    for (let i = 0; i < this.height; i++) {
      grid[i] = [];
      for (let j = 0; j < this.width; j++) {
        grid[i][j] = ".";
      }
    }
    // convert grid to text for bottom
    let strings = grid.map(row => row.join(""));
    return strings.join("\n") + "\n";
  }
}
