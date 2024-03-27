import { Tetromino } from "./Tetromino.mjs";
import { MovableBlock } from "./MovableBlock.mjs";
import { Point } from "./Point.mjs";
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
      } else {
        const newBlock = this.movingBlock.moveDown();
        this.blocks.pop();
        this.blocks.push(newBlock);
        this.movingBlock = newBlock
      }
    }

    else {

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

  isValidPosition(x, y) {
    // Check if (x, y) is within the board's bounds and not occupied
    if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
      // in bounds and empty
      if (this.grid[y][x] === ".") {
        return true;
      }
    }
  }

  // Translates block positions from MovableBlock's local coordinate system to the Board's
  mapBlockPositions(movableBlock) {
    const mappedPositions = [];
    const blockPositions = movableBlock.getFilledCoordinates(); // this returns local positions
    blockPositions.forEach(pos => {
      const mappedX = movableBlock.col + pos.x; // Translate X position
      const mappedY = movableBlock.row + pos.y; // Translate Y position
      if (this.isValidPosition(mappedX, mappedY)) {
        mappedPositions.push(new Point(mappedX, mappedY));
      } else {
        // Handle invalid position (e.g., out of bounds or collision)
      }
    return mappedPositions;
    })
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
    this.applyBlocks()
    let strings = this.grid.map(row => row.join(""));
    return strings.join("\n") + "\n";
  }

  printPretty() {
    this.applyBlocks()
    console.table(this.grid);
    console.log();
  }

  applyBlocks() {
    for (let block of this.blocks) {
      for (let point of block.getFilledCoordinates()) {
        this.grid[point.row][point.col + block.shape.getWidth()] = block.shape.blockAt(point.row, point.col)
      }
    }
  }
}

// const board = new Board(10, 6);
// board.drop(Tetromino.T_SHAPE)
// board.printPretty()
// board.tick()
// board.printPretty()

