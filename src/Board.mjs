export class Board {
  width;
  height;
  blocks = [];

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(block) {
    this.blocks.push([block, 0, 1])
  }

  tick() {

  }

  toString() {
    const grid = [];
    for (let i = 0; i < this.height; i++) {
      grid[i] = [];
      for (let j = 0; j < this.width; j++) {
        grid[i][j] = ".";
      }
    }
    for (let block of this.blocks) {
      grid[block[1]][block[2]] = block[0];
    }
    // convert grid to text for bottom
    let strings = grid.map(row => row.join(""));
    return strings.join("\n") + "\n";
  }
}
