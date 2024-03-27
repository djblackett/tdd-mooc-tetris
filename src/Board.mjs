import { Tetromino } from "./Tetromino.mjs";
import { MovableBlock } from "./MovableBlock.mjs";
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
      if (block instanceof Tetromino) {
        console.log("Inside Tetromino block of drop()");
        const newBlock = new MovableBlock(block.shape(), 0, Math.floor(this.width - block.getWidth() / 2))
        this.blocks.push(newBlock);
        this.movingBlock = newBlock;
        const points = newBlock.getFilledCoordinates();

        for (let point of points) {
          this.grid[point.row][point.col + block.getWidth()] = block.blockAt(point.row, point.col)
        }

      } else {
        this.grid[0][Math.floor(this.width / 2)] = block;
        this.movingBlock = [block, Math.floor(this.width / 2), 0];
      }
    } else {
      throw new Error("already falling");
    }
  }

  tick() {
    if (this.movingBlock instanceof MovableBlock) {
      if (this.movingBlock.row + this.movingBlock.shape.shape.length === this.height - 1) {
        console.log("At bottom - stopped moving");
        return;
      } else {
        this.movingBlock.moveDown();
      }
    } else {

      // legacy code for passing early tests
      if (this.movingBlock[2] >= this.height - 1 ||
        this.grid[this.movingBlock[2] + 1][this.movingBlock[1]] !== ".") {
        this.movingBlock = null;
      } else if (this.movingBlock && this.movingBlock instanceof Array && this.movingBlock.length >= 3) {
        this.grid[this.movingBlock[2]][this.movingBlock[1]] = ".";
        this.grid[this.movingBlock[2] + 1][this.movingBlock[1]] = this.movingBlock[0];
        this.movingBlock[2]++;
      }
    }
  }

  blockAt(row, col) {
    if (this.movingBlock) {
      const block = this.movingBlock.blockAt(row, col);
      if (block !== ".") {
        return block;
      }
    }
    return "."
  }

  hasFalling() {
    return this.movingBlock !== null;
  }

  toString() {
    let strings = this.grid.map(row => row.join(""));
    return strings.join("\n") + "\n";
  }

  printPretty() {
    console.table(this.grid);
    console.log();
  }
}

// const board = new Board(10, 6);
// board.drop(Tetromino.T_SHAPE)
// board.printPretty()
// board.tick()
// board.printPretty()

