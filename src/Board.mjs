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


        const blockGrid = block.shape().shape;
        const blockHeight = blockGrid.length;
        const blockWidth = blockGrid[0].length;

        const jStart = Math.floor(this.width / 2) - Math.floor(blockWidth / 2) - 1;
        const jEnd = jStart + blockWidth;
        const iStart = 0;
        const iEnd = blockHeight


        for (let i = iStart; i < iEnd; i++) {
          for (let j = jStart; j < jEnd; j++) {
            this.grid[i][j] = blockGrid[i][j - jStart]
          }
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
    if (this.movingBlock.block instanceof Tetromino) {
      if (this.movingBlock.row + this.movingBlock.block.shape().length === this.height) {
        console.log("At bottom - stopped moving");
          return;
      } else {
        const blockGrid = this.movingBlock.block.shape().shape;
        const blockHeight = blockGrid.length;
        const blockWidth = blockGrid[0].length;
        const jStart = this.movingBlock.col;
        const jEnd = jStart + blockWidth;
        const iStart = this.movingBlock.row + 1;
        const iEnd = blockHeight

        for (let i = iStart; i < iEnd; i++) {
          for (let j = jStart; j < jEnd; j++) {
            this.grid[i][j] = blockGrid[i][j - jStart]
          }
        }
      }
    }
    else if (this.movingBlock &&
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



