export class Board {
  width;
  height;
  blocks = [];
  grid = []
  movingBlock = null;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    for (let i = 0; i < this.height; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.width; j++) {
        this.grid[i][j] = ".";
      }
    }
  }

  drop(block) {
    this.grid[0][1] = block;
    this.movingBlock = [block, 1, 0];
  }

  tick() {
    this.grid[this.movingBlock[2]][this.movingBlock[1]] = ".";
    this.grid[this.movingBlock[2] + 1][this.movingBlock[1]] = this.movingBlock[0];

  }

  toString() {

    // for (let block of this.blocks) {
    //   this.grid[block[1]][block[2]] = block[0];
    // }

    // convert grid to text for bottom
    let strings = this.grid.map(row => row.join(""));
    return strings.join("\n") + "\n";
  }
}
