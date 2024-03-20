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
    newArr = newArr[0].map((val, index) => newArr.map(row => {
      if (row[index] !== ".") {
        return row[index]
      } else {
        return "."
      }
    }).reverse());
    return RotatingShape.fromString(this.getStringFromMatrix(newArr));
  }

  rotateLeft() {
    let matrix = this.getMatrixFromString();
    matrix = matrix[0].map((val, index) => matrix.map(row => row[row.length-1-index]));
    return RotatingShape.fromString(this.getStringFromMatrix(matrix));
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
    return strings.join("\n");
  }

  toString() {
    return this.shape;
  }


  printPretty() {
    let matrix = this.getMatrixFromString(this.shape);
    for (let i of matrix){
      console.log(i);
    }
    console.log();
  }
}