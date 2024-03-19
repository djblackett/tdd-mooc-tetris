export class RotatingShape {
  shape;

  constructor(str) {
    this.shape = str;
  }

  static fromString(str) {
    return new RotatingShape(str.replaceAll(" ", "") + "\n");
  }

  rotateRight() {
    let newArr = this.getMatrixFromString()
    newArr = newArr[0].map((val, index) => newArr.map(row => row[index]).reverse());
    return this.getStringFromMatrix(newArr);
  }

  rotateLeft() {
    let matrix = this.getMatrixFromString();
    matrix = matrix[0].map((val, index) => matrix.map(row => row[row.length-1-index]));
    return this.getStringFromMatrix(matrix);
  }

  getMatrixFromString() {
    let shapeArr = this.shape.substring(0, this.shape.length - 1).split("\n");
    let newArr = []
    for (let i of shapeArr) {
      newArr.push(i.split(""));
    }
    return newArr;
  }

  getStringFromMatrix(matrix) {
    let strings = matrix.map(row => row.join(""));
    return strings.join("\n") + "\n";
  }

  toString() {
    return this.shape;
  }
}
