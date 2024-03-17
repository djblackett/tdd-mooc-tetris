export class Board {
  width;
  height;
  blocks = [];
  grid = []

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
    for (let i = 0; i < this.height; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.width; j++) {
        this.grid[i][j] = ".";
      }
    }
    for (let block of this.blocks) {
      this.grid[block[1]][block[2]] = block[0];
    }
    // convert grid to text for bottom
    let strings = this.grid.map(row => row.join(""));
    return strings.join("\n") + "\n";
  }
}
