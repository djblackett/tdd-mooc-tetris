export class RotatingShape {
  shape;
  static fromString(str) {
    this.shape = str;
    return this;
  }
  toString() {}

}