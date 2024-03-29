import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {

  static T_SHAPE = Tetromino.fromString(0, 4, `.T.
       TTT
       ...`);

  static T_ORIENTATIONS = [
    `TTT
     .T.
     ...`,
    `.T.
     TT.
     .T.`,
    `.T.
     TTT
     ...`,
    `.T.
     .TT
     .T.`
  ]

  static I_SHAPE = Tetromino.fromString(0, 2, `.....
       .....
       IIII.
       .....
       .....`);

  static O_SHAPE = Tetromino.fromString(0, 1, `.OO
       .OO
       ...`);

  currentOrientation;
  orientations;

  constructor(currentOrientation, orientations) {
    this.currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this. orientations = orientations;
  }

  static fromString(currentOrientation, orientationCount, initialShape) {
    const shape = RotatingShape.fromString(initialShape);
    const orientations = [
      shape,
      shape.rotateRight(),
      shape.rotateRight().rotateRight(),
      shape.rotateRight().rotateRight().rotateRight(),
    ].slice(0, orientationCount);
    return new Tetromino(currentOrientation, orientations);
  }

  shape() {
    return this.orientations[this.currentOrientation];
  }

  getWidth() {
    return this.shape().getWidth();
  }

  getHeight() {
    return this.shape.getHeight();
  }

  blockAt(row, col) {
    return this.shape().blockAt(row, col);
  }

  toString() {
    return this.shape().toString();
  }

  rotateRight() {
    return new Tetromino(this.currentOrientation + 1, this.orientations);
  }

  rotateLeft() {
    return new Tetromino(this.currentOrientation -1, this.orientations);
  }
}

