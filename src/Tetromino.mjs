import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {

  static T_SHAPE = RotatingShape.fromString(`.T.
       TTT
       ...`);

  static I_SHAPE = RotatingShape.fromString(
    `.....
       .....
       IIII.
       .....
       .....`);
  static fromString(currentOrientation, orientationCount, initialShape) {
    const shape = RotatingShape.fromString(initialShape);
    const orientations = [
      shape, shape.rotateRight(), shape.rotateRight().rotateRight(), shape.rotateRight().rotateRight().rotateRight(),
    ].slice(0, orientationCount);
    return new Tetromino(currentOrientation, orientations);
  }
}

