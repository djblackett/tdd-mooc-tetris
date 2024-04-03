import { RotatingShape } from "./RotatingShape.mjs";
import {
  T_ORIENTATIONS,
  I_ORIENTATIONS,
  O_ORIENTATIONS,
  L_LEFT_ORIENTATIONS,
  L_RIGHT_ORIENTATIONS, Z_RIGHT_ORIENTATIONS, Z_LEFT_ORIENTATIONS,
} from "./Orientations.mjs";

export class Tetromino {

  static T_SHAPE = Tetromino.fromString(0, 4, `.T.
       TTT
       ...`);

  static I_SHAPE = Tetromino.fromString(0, 2, `
       ....
       IIII
       ....
       ....`);

  static O_SHAPE = Tetromino.fromString(0, 1, `....
       .OO.
       .OO.
       ....`);

  static L_SHAPE = Tetromino.fromString(0, 4,
    `....
     LLL.
     L...
     ....`);

  static L_SHAPE_2 = Tetromino.fromString(0, 4,
    `....
     LLL.
     ..L.
     ....`);

  static Z_SHAPE = Tetromino.fromString(0, 2,
    `....
     .ZZ.
     ZZ..
     ....`);

  static Z_SHAPE_2 = Tetromino.fromString(0, 2,
    `....
     ZZ..
     .ZZ.
     ....`);

  currentOrientation;
  orientations;

  constructor(currentOrientation, orientations) {
    this.currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.orientations = orientations;
  }


  static fromString(currentOrientation, orientationCount, initialShape) {
    let orientations;

    if (initialShape.replaceAll(" ", "").trim() === `.T.
       TTT
       ...`.replaceAll(" ", "").trim()) {
      orientations = T_ORIENTATIONS.map(t => RotatingShape.fromString(t))
    }

    if (initialShape.replaceAll(" ", "").trim() === `
       ....
       IIII
       ....
       ....`.replaceAll(" ", "").trim()) {
      orientations = I_ORIENTATIONS.map(t => RotatingShape.fromString(t))
    }

    if (initialShape.replaceAll(" ", "").trim() === `....\n.OO.\n.OO.\n....`.replaceAll(" ", "").trim()) {
      orientations = O_ORIENTATIONS.map(t => RotatingShape.fromString(t))
    }

    if (initialShape.replaceAll(" ", "").trim() === `....\nLLL.\nL...\n....`.replaceAll(" ", "").trim()) {
      orientations = L_LEFT_ORIENTATIONS.map(t => RotatingShape.fromString(t))
    }

    if (initialShape.replaceAll(" ", "").trim() === `....\nLLL.\n..L.\n....`.replaceAll(" ", "").trim()) {
      orientations = L_RIGHT_ORIENTATIONS.map(t => RotatingShape.fromString(t))
    }

    if (initialShape.replaceAll(" ", "").trim() === `....
     .ZZ.
     ZZ..
     ....`.replaceAll(" ", "").trim()) {
      orientations = Z_RIGHT_ORIENTATIONS.map(t => RotatingShape.fromString(t))
    }

    if (initialShape.replaceAll(" ", "").trim() === `....
     ZZ..
     .ZZ.
     ....`.replaceAll(" ", "").trim()) {
      orientations = Z_LEFT_ORIENTATIONS.map(t => RotatingShape.fromString(t))
    }

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

