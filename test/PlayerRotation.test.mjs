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
    board.moveDown()
    board.drop(Tetromino.T_SHAPE)
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.drop(Tetromino.T_SHAPE)
    board.rotate()
    board.printPretty()


    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  })

  describe("when it is up against a wall (or other blocks) and is rotated, but there is no room to rotate, move it away " +
    "from the wall if possible", () => {

    test("will perform a left wall kick", () => {
      board.rotate()
      board.moveLeft()
      board.moveLeft()
      board.moveLeft()
      board.moveLeft()
      board.rotate()

      expect(board.toString()).to.equalShape(
        `..........
         TTT.......
         .T........
         ..........
         ..........
         ..........`
      );
    })


    test("will perform a bottom wall kick", () => {
      board.moveDown()
      board.moveDown()
      board.moveDown()
      board.moveDown()
      board.rotate()

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....T.....
         ....TT....
         ....T.....`
      );
    })

    test("will perform a right wall kick", () => {
      board.rotate()
      board.rotate()
      board.rotate()
      board.moveRight()
      board.moveRight()
      board.moveRight()
      board.moveRight()
      board.rotate()

      expect(board.toString()).to.equalShape(
        `........T.
         .......TTT
         ..........
         ..........
         ..........
         ..........`
      );
    })
  })

})