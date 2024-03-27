import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE)
  });

  test("a falling tetromino can be rotated", () => {
    board.rotate()
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  })

  test("it cannot be rotated when there is no room to rotate", () => {
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.rotate()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  })
})