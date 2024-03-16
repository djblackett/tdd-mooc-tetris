export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let string = ".".repeat(this.width) + "\n";
    return string.repeat(this.height);
  }
}
