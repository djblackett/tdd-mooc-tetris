export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape;
  }

  static fromString(str) {
    return new RotatingShape(str.replaceAll(" ", "").trim().split("\n").map(row => row.split("")));
  }

  rotateRight() {
    let newArr = [...this.shape]
    newArr = newArr[0].map((val, index) => newArr.map(row => row[index]).reverse());
    return RotatingShape.fromString(this.getStringFromMatrix(newArr));
  }

  rotateLeft() {
    return this.rotateRight().rotateRight().rotateRight();
  }

  getMatrixFromString() {
    let shapeArr = this.shape.substring(0, this.shape.length - 1).split("\n");
    let newArr = []
    for (let i of shapeArr) {
      newArr.push(i.split(""));
    }
    return newArr;
  }

  getWidth() {
    return this.shape[0].length
  }

  getHeight() {
    return this.shape.length
  }

  blockAt(row, col) {
    return this.shape[row][col];
  }

  getStringFromMatrix(matrix) {
    let strings = matrix.map(row => row.join(""));
    return strings.join("\n") + "\n";
  }

  toString() {
    return this.getStringFromMatrix(this.shape);
  }

  printPretty() {
    let matrix = this.getMatrixFromString(this.shape);
    for (let i of matrix){
      console.log(i);
    }
    console.log();
  }
}
