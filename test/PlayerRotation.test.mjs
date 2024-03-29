import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Rotating tetrominoes", () => {
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
    board.rotate()
    board.moveRight()
    board.moveRight()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.drop(Tetromino.T_SHAPE)
    board.rotate()
    board.moveRight()
    board.moveRight()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.drop(Tetromino.T_SHAPE)
    board.rotate()
    board.rotate()
    board.rotate()
    board.moveLeft()
// board.rotate()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    // board.printPretty()

    board.drop(Tetromino.T_SHAPE)
    board.rotate()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    // board.printPretty()
    board.rotate()
    // board.printPretty()


    expect(board.toString()).to.equalShape(
      `......T...
       ......TT..
       ......T...
       ...TT.T...
       ..TTTTTT..
       ...TT.T...`
    );
  })

  describe("when it is up against a wall (or other blocks) and is rotated, but there is no room to rotate, move it away " +
    "from the wall if possible", () => {

    test.skip("will perform a left wall kick", () => {
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

    // this is probably not authentic for tetris
    test.skip("will perform a bottom wall kick", () => {
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

    test.skip("will perform a right wall kick", () => {
      board.rotate()
      board.rotate()
      board.rotate()
      board.moveRight()
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

    test("will perform a wall kick when up against another block", () => {
      board.rotate()
      board.moveRight()
      board.moveRight()
      board.moveDown()
      board.moveDown()
      board.moveDown()
      board.moveDown()
      board.drop(Tetromino.T_SHAPE)
      board.rotate()
      board.moveRight()
      board.moveRight()
      board.moveDown()
      board.moveDown()
      board.moveDown()
      board.drop(Tetromino.T_SHAPE)
      board.rotate()
      board.rotate()
      board.rotate()
      board.moveRight()
      board.rotate()

      expect(board.toString()).to.equalShape(
        `....T.T...
         ...TTTTT..
         ......T...
         ......T...
         ......TT..
         ......T...`
      );


    })


  })
})