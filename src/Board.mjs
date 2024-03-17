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
    if (this.movingBlock === null) {
      this.grid[0][1] = block;
      this.movingBlock = [block, 1, 0];
    } else {
      throw new Error("already falling");
    }
  }

  tick() {
    if (this.movingBlock) {
      this.grid[this.movingBlock[2]][this.movingBlock[1]] = ".";
      this.grid[this.movingBlock[2] + 1][this.movingBlock[1]] = this.movingBlock[0];
      this.movingBlock[2]++;
    }
  }

  hasFalling() {
    return this.movingBlock !== null;
  }

  toString() {
    let strings = this.grid.map(row => row.join(""));
    return strings.join("\n") + "\n";
  }
}
