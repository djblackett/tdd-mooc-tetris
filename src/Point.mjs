export class Point {
  row;
  col;

  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  toString() {
    return JSON.stringify({row: this.row, col: this.col});
  }
}