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
    const shapey = this.shape.shape;
    for (let i = 0; i < shapey.length; i++) {
      for (let j = 0; j < shapey[0].length; j++) {
        if (shapey[i][j] !== ".") {
          points.push(new Point(i, j));
        }
      }
    }
    return points
  }
}