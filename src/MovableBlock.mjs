import { Point } from "./Point.mjs";

export class MovableBlock {
  shape;
  row;
  col;

  constructor(shape, row, col) {
    this.shape = shape;
    this.row = row;
    this.col = col;
  }

  moveDown() {
    return new MovableBlock(this.shape, this.row + 1, this.col);
  }

  getFilledCoordinates() {
    const points = [];
    const shape = this.shape.shape;
    for (let i = this.row; i < this.row + this.shape.getHeight(); i++) {
      for (let j = this.col; j < this.col + this.shape.getWidth(); j++) {
        if (shape[i][j] !== ".") {
          points.push(new Point(i - this.row, j -this.col));
        }
      }
    }
    return points
  }
}