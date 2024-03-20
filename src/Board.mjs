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
      if (block instanceof Array) {
        const blockHeight = block.length
        const blockWidth = block[0].length
        const jStart = Math.floor(this.width / 2) - Math.floor(blockWidth / 2)
        const jEnd = jStart + blockWidth;
        const iStart = 0;
        const iEnd = blockHeight

      }

      this.grid[0][Math.floor(this.width / 2)] = block;
      this.movingBlock = [block, Math.floor(this.width / 2), 0];
    } else {
      throw new Error("already falling");
    }
  }

  tick() {
    if (this.movingBlock &&
       (this.movingBlock[2] === this.height - 1 ||
        this.grid[this.movingBlock[2] + 1][this.movingBlock[1]] !== ".")) {
      this.movingBlock = null;
    }
    else if (this.movingBlock) {
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
