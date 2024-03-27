import { Point } from "./Point.mjs";

export class MovableBlock {
  shape; // RotatingShape obj
  row;
  col;
  symbol = "T"

  constructor(shape, row, col, boardWidth, boardHeight) {
    this.shape = shape;
    this.row = row;
    this.col = col;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;

    for (let i = 0; i < shape.getHeight(); i++) {
      for (let j = 0; j < shape.getWidth(); j++) {
        if (shape.shape[i][j] !== ".") {
          this.symbol = shape.shape[i][j];
          break;
        }
      }
    }
  }

  moveDown() {
    return new MovableBlock(this.shape, this.row + 1, this.col, this.boardWidth, this.boardHeight);
  }

  isValid(x, y) {
    if (x >= 0 && y >= 0 && x < this.boardWidth && y < this.boardHeight) {
      return true;
    }
  }

  getFilledCoordinates() {
    const points = [];
    const shape = this.shape.shape;
    for (let i = this.row; i < this.row + this.shape.getHeight(); i++) {
      for (let j = this.col; j < this.col + this.shape.getWidth(); j++) {
        let block = shape[i][j]
        if (block !== ".") {
          points.push(new Point(i - this.row, j - this.col));
        }
      }
    }
    return points
  }
}