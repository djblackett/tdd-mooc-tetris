export class RotatingShape {
  shape;

  constructor(str) {
    this.shape = str;
  }

  static fromString(str) {
    return new RotatingShape(str.replaceAll(" ", "") + "\n");
  }

  rotateRight() {
    let shapeArr = this.shape.substring(0, this.shape.length - 1).split("\n");
    let newArr = []
    for (let i of shapeArr) {
      newArr.push(i.split(""));
    }
    newArr = newArr[0].map((val, index) => newArr.map(row => row[index]).reverse());
    let strings = newArr.map(row => row.join(""));
    return strings.join("\n") + "\n";
  }

  toString() {
    return this.shape;
  }
}
