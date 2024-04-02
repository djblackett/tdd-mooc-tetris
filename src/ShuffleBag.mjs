import { Tetromino } from "./Tetromino.mjs";
export class ShuffleBag {
  blocks;

  constructor(blockArray) {
    this.blocks = blockArray;
    this.shuffle(this.blocks)
  }

  getShuffleBag() {
    return this.blocks;
  }

  getBlock() {
    if (this.blocks.length > 0) {
      return this.blocks.pop();
    } else {
      this.blocks = Tetromino.T_SHAPE, Tetromino.O_SHAPE, Tetromino.I_SHAPE;
      this.shuffle()
    }
  }

  // todo - add seed?
  shuffle() {
    this.blocks = this.blocks
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }
}