export class RotatingShape {
  shape;

  constructor(str) {
    this.shape = str;
  }

  static fromString(str) {
    return new RotatingShape(str.replaceAll(" ", "") + "\n");
  }

  rotateRight() {
    let shapeArr = this.shape.split("\n");
    let newArr = []
    for (let i of shapeArr) {
      newArr.push(i.split());
    }
    newArr[0].map((val, index) => newArr.map(row => row[index]).reverse())
  }

  toString() {
    return this.shape;
  }
}