import { Tetromino } from "./Tetromino.mjs";
import { MovableBlock } from "./MovableBlock.mjs";
import { Point } from "./Point.mjs";
import { ShuffleBag } from "./ShuffleBag.mjs";
import { getMatrixFromString } from "./utils.mjs";

export class Board {
  width;
  height;
  blocks = [];
  grid = []
  movingBlock = null;
  legacy = true;

  constructor(width, height, grid) {
    this.width = width;
    this.height = height;
    this.observers = []
    this.shuffleBag = new ShuffleBag([Tetromino.T_SHAPE, Tetromino.O_SHAPE, Tetromino.I_SHAPE, Tetromino.L_SHAPE,
      Tetromino.J_SHAPE, Tetromino.S_SHAPE, Tetromino.Z_SHAPE])
    if (arguments.length < 3) {
      for (let i = 0; i < this.height; i++) {
        this.grid[i] = [];
        for (let j = 0; j < this.width; j++) {
          this.grid[i][j] = ".";
        }
      }
    } else {
      this.grid = getMatrixFromString(grid);
    }
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(rowsCleared) {
    for (let observer of this.observers) {
      observer.updateScore(rowsCleared);
    }
  }

  drop(block) {
    if (!block) {
      block = this.shuffleBag.getBlock();
    }

    if (this.movingBlock === null) {
      if (block instanceof Tetromino) {
        this.legacy = false;
        let newBlock = new MovableBlock(block.shape(), 0, Math.floor((this.width - block.getWidth()) / 2), this.width, this.height)

        while (!this.isBlockAtTop(newBlock)) {
          newBlock = newBlock.moveUp()
        }

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
        const oldBlock = this.blocks.pop();
        this.removeBlock(oldBlock)
        const newBlock = this.movingBlock.moveDown();
        const valid = this.canBlockMove(newBlock);

        if (valid) {
          this.blocks.push(newBlock);
          this.movingBlock = newBlock
          this.applyBlockToGrid(newBlock)
        } else {
          this.applyBlockToGrid(oldBlock)
          this.movingBlock = null;
          this.checkRows()
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
      if ( this.canBlockMove(newBlock)) {
        this.blocks.push(newBlock);
        this.movingBlock = newBlock
        this.applyBlockToGrid(newBlock)
      } else {
        this.blocks.push(oldBlock);
        this.applyBlockToGrid(oldBlock)
      }
    }
  }

  moveRight() {
    if (this.movingBlock) {
      const oldBlock = this.blocks.pop();
      this.removeBlock(oldBlock)
      const newBlock = this.movingBlock.moveRight();
      if (this.canBlockMove(newBlock)) {
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
        this.checkRows()
      }
    }
  }

  rotateRight() {
    if (this.movingBlock) {
      const oldBlock = this.blocks.pop();
      this.removeBlock(oldBlock)
      const rotatedBlock = this.movingBlock.rotateRight()
      if (this.canBlockMove(rotatedBlock)) {
        this.blocks.push(rotatedBlock);
        this.movingBlock = rotatedBlock
        this.applyBlockToGrid(rotatedBlock)
      } else {
        this.wallKick(oldBlock, rotatedBlock)
      }
    }
  }

  rotateLeft() {
    if (this.movingBlock) {
      const oldBlock = this.blocks.pop();
      this.removeBlock(oldBlock)
      const rotatedBlock = this.movingBlock.rotateLeft()
      if (this.canBlockMove(rotatedBlock)) {
        if (this.canBlockMove(rotatedBlock)) {
          this.blocks.push(rotatedBlock);
          this.movingBlock = rotatedBlock
          this.applyBlockToGrid(rotatedBlock)
        } else {
          this.wallKick(oldBlock, rotatedBlock)
        }
      }
    }
  }

  wallKick(oldBlock, rotatedBlock) {
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

  canBlockMove(testBlock) {
    const blockSet = new Map()
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.grid[i][j] !== ".") {
          let point = new Point(i, j)
          blockSet.set(point.toString(), point)
        }
      }
    }
    for (let point of testBlock.getFilledCoordinates()) {
      try {
        if (point.col < 0 || point.col >= this.width || point.row < 0 || point.row >= this.height ||
          !this.grid[point.row][point.col] || this.grid[point.row][point.col] !== ".") {
          return false;
        }
      } catch(e) {
        console.error(e);
      }
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

  cellAt(row, col) {
    return this.grid[row][col];
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

  checkRows() {
    let count = 0;
    outerloop: for (let i = 0; i < this.height; i++) {
      innerloop: for (let j = 0; j < this.width; j++) {
        if (this.grid[i][j] === ".") {
          break innerloop;
        }
        if (j === this.width - 1) {
          this.clearRow(i)
          this.grid.unshift(".".repeat(this.width).split(""))
          count++;
        }
      }
    }
    this.notify(count)
    return count;
  }

  isBlockAtTop(block) {
    let isAtTop = false;
    this.applyBlockToGrid(block)
    for (let point of block.getFilledCoordinates()) {
      if (this.grid[0][point.col] !== ".") {
        isAtTop = true;
      }
    }
    this.removeBlock(block);
    return isAtTop;
  }
}

