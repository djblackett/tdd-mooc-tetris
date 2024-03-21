export class MovableBlock {
  shape;
  row;
  col;

  constructor(shape, row, col) {
    this.shape = shape;
    this.row = row;
    this.col = col;
  }

  getFilledCoordinates() {
    const points = [];

    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[0].length; j++) {
        if (this.shape[i][j] !== ".") {
          points.push(this.shape[i][j]);
        }
      }
    }
    return points
  }
}