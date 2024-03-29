import { RotatingShape } from "./RotatingShape.mjs";
import {T_ORIENTATIONS, I_ORIENTATIONS, O_ORIENTATIONS} from "./Orientations.mjs";

export class Tetromino {

  static T_SHAPE = Tetromino.fromString(0, 4, `.T.
       TTT
       ...`);

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
    this.orientations = orientations;
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

  static fromString2(currentOrientation, orientationCount, initialShape) {
    const shape = RotatingShape.fromString(initialShape);
    let orientations;

    if (initialShape.replaceAll(" ", "").trim() === `.T.
       TTT
       ...`.replaceAll(" ", "").trim()) {
      orientations = T_ORIENTATIONS.map(t => RotatingShape.fromString(t))
      console.log("orientations:", orientations);
    }

    if (initialShape.replaceAll(" ", "").trim() === `.....
       .....
       IIII.
       .....
       .....`.replaceAll(" ", "").trim()) {
      orientations = I_ORIENTATIONS.map(t => RotatingShape.fromString(t))
    }

    if (initialShape.replaceAll(" ", "").trim() === `.OO\n.OO\n...`.replaceAll(" ", "").trim()) {
      orientations = O_ORIENTATIONS.map(t => RotatingShape.fromString(t))
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

