import { Tetromino } from "./Tetromino.mjs";
import { MovableBlock } from "./MovableBlock.mjs";
import { Point } from "./Point.mjs";
export class Board {
  width;
  height;
  blocks = [];
  grid = []
  movingBlock = null;
  legacy = true;

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
        this.legacy = false;
        const newBlock = new MovableBlock(block.shape(), 0, Math.floor((this.width - block.getWidth()) / 2), this.width, this.height)
        this.blocks.push(newBlock);
        this.movingBlock = newBlock;
        this.applyBlockToGrid(newBlock)
      } else {
        this.grid[0][Math.floor(this.width / 2)] = block;
        this.movingBlock = [block, Math.floor(this.width / 2), 0];
      }
    } else {
      throw new Error("already falling");
    }
  }

  tick() {
    if (this.movingBlock === null) {
      return;
    }
    if (this.movingBlock instanceof MovableBlock || !this.legacy) {
      if (this.movingBlock.row + this.movingBlock.shape.getHeight() > this.height) {
        this.applyBlockToGrid(this.movingBlock)
        this.movingBlock = null;
      } else {
        const oldBlock =    this.blocks.pop();
        this.removeBlock(oldBlock)
        const newBlock = this.movingBlock.moveDown();
        const valid = this.canBlockMove(newBlock);

        if (valid) {

          this.blocks.push(newBlock);
          this.movingBlock = newBlock
        } else {
          this.blocks.push(oldBlock)
          this.applyBlockToGrid(oldBlock)
          this.movingBlock = null;
        }
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

  moveLeft() {
    if (this.movingBlock) {
      const oldBlock = this.blocks.pop();
      this.removeBlock(oldBlock)
      const newBlock = this.movingBlock.moveLeft();
      if (newBlock.col >= 0 && this.canBlockMove(newBlock)) {
        this.blocks.push(newBlock);
        this.movingBlock = newBlock
        this.applyBlockToGrid(newBlock)
      } else {
        this.blocks.push(oldBlock);
        this.applyBlockToGrid(oldBlock)
        // console.table(this.grid)
      }
    }
  }

  moveRight() {
    if (this.movingBlock) {
      const oldBlock = this.blocks.pop();
      this.removeBlock(oldBlock)
      const newBlock = this.movingBlock.moveRight();
      if (newBlock.col + newBlock.shape.getWidth() <= this.width && this.canBlockMove(newBlock)) {
        this.blocks.push(newBlock);
        this.movingBlock = newBlock
        this.applyBlockToGrid(newBlock)
      } else {
        this.blocks.push(oldBlock)
        this.applyBlockToGrid(oldBlock)
      }
    }
  }

  moveDown() {
    if (this.movingBlock) {
      const oldBlock = this.blocks.pop();
      this.removeBlock(oldBlock)
      const newBlock = this.movingBlock.moveDown();
      if (this.canBlockMove(newBlock)) {
        this.blocks.push(newBlock);
        this.movingBlock = newBlock
        this.applyBlockToGrid(newBlock)
      } else {
        this.blocks.push(oldBlock);
        this.applyBlockToGrid(oldBlock)
        this.movingBlock = null;
      }
    }
  }

  rotate() {
    if (this.movingBlock) {
      const oldBlock = this.blocks.pop();
      this.removeBlock(oldBlock)
      const rotatedBlock = this.movingBlock.rotateRight()
      if (this.canBlockMove(rotatedBlock)) {
        this.blocks.push(rotatedBlock);
        this.movingBlock = rotatedBlock
        this.applyBlockToGrid(rotatedBlock)
      }


      else {
        const rightBlock = rotatedBlock.moveRight()
        const leftBlock = rotatedBlock.moveLeft()
        if (this.canBlockMove(rightBlock)) {
          this.blocks.push(rightBlock);
          this.movingBlock = rightBlock
          this.applyBlockToGrid(rightBlock)
        } else if (this.canBlockMove(leftBlock)) {
          this.blocks.push(leftBlock);
          this.movingBlock = leftBlock
          this.applyBlockToGrid(leftBlock)
        } else {
          this.blocks.push(oldBlock);
          this.applyBlockToGrid(oldBlock)
        }
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

  canBlockMove(testBlock) {
    const blockSet = new Map()
    for (let block of this.blocks) {
      for (let point of block.getFilledCoordinates()) {
        blockSet.set(point.toString(), point);
      }
    }
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.grid[i][j] !== ".") {
          let point = new Point(i, j)
          blockSet.set(point.toString(), point)
        }
      }
    }
    for (let point of testBlock.getFilledCoordinates()) {
      if (point.col < 0 || point.col >= this.width || point.row >= this.height || this.grid[point.row][point.col] !== "." ){return false;}
      if (blockSet.has(point.toString())) {
        return false;
      }

      if (point.row === this.height) {
        return false;
      }

    }
    return true;
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
    // this.applyBlocks()
    let strings = this.grid.map(row => row.join(""));
    return strings.join("\n") + "\n";
  }

  printPretty() {
    // this.resetGrid()
    this.applyBlocks()
    console.table(this.grid);
    console.log();
  }

  applyBlocks() {
    for (let block of this.blocks) {
      for (let point of block.getFilledCoordinates()) {
          this.grid[point.row][point.col] = block.symbol
      }
    }
  }

  resetGrid() {
    for (let i = 0; i < this.height; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.width; j++) {
        this.grid[i][j] = ".";
      }
    }
  }

  applyBlockToGrid(block) {
    for (let point of block.getFilledCoordinates()) {
      this.grid[point.row][point.col] = block.symbol;
    }
  }

  removeBlock(block) {
    for (let point of block.getFilledCoordinates()) {
      this.grid[point.row][point.col] = ".";
    }
  }

  clearRow(row) {
    this.grid.splice(row, 1)
  }

  // does not do anything because the grid is only filled when printed
  // must refactor so that grid stays filled
  // use points instead of blocks except movingBlock
  checkRows() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.grid[i][j] === ".") {
          break;
        }
        if (j === this.width - 1) {
          this.clearRow(i)
          this.grid.unshift(".".repeat(this.width).split(""))
          return
        }
      }
    }
  }
}

