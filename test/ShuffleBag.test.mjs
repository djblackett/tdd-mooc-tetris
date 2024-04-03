import { beforeEach, describe, onTestFailed, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

describe("ShuffleBag", () => {

test("Tetrominos should be fed to board in random order", () => {
  // todo add more block types after implementing
  const Tetrominos = [Tetromino.T_SHAPE, Tetromino.O_SHAPE, Tetromino.I_SHAPE, Tetromino.L_SHAPE,
    Tetromino.L_SHAPE_2, Tetromino.Z_SHAPE, Tetromino.Z_SHAPE_2];
  const shuffle1 = new ShuffleBag(Tetrominos).getShuffleBag();
  const shuffle2 = new ShuffleBag(Tetrominos).getShuffleBag()

  expect(shuffle1).not.toStrictEqual(shuffle2)


})

})