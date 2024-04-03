import { beforeEach, describe, onTestFailed, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Rotating tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE)
  });

  test("a falling tetromino can be rotated right", () => {
    board.rotateRight()

    onTestFailed(() => {
      console.log("Expected:");
      console.log(`....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`.trim().replaceAll(" ", ""));
      console.log();

      console.log("Received:");
      console.log(board.toString());
      console.log();
    })

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  })

  test("a falling tetromino can be rotated left", () => {
    board.rotateLeft()
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );


  })
  test("it cannot be rotated when there is no room to rotate", () => {
    board = new Board(10, 6, `
       ......T...
       ......TT..
       ......T...
       ...T..T...
       ..TT..TT..
       ...T..T...`);

    board.drop(Tetromino.T_SHAPE)
    board.rotateRight()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.rotateRight()

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

    test("will perform a left wall kick", () => {
      board.rotateRight()
      board.moveLeft()
      board.moveLeft()
      board.moveLeft()
      board.moveLeft()
      board.rotateRight()

      expect(board.toString()).to.equalShape(
        `..........
         TTT.......
         .T........
         ..........
         ..........
         ..........`
      );
    })

    test("will perform a right wall kick", () => {
      board.rotateRight()
      board.rotateRight()
      board.rotateRight()
      board.moveRight()
      board.moveRight()
      board.moveRight()
      board.moveRight()
      board.moveRight()
      board.rotateRight()

      expect(board.toString()).to.equalShape(
        `........T.
         .......TTT
         ..........
         ..........
         ..........
         ..........`
      );
    })

    test("I block will perform right wall kick", () => {
      board = new Board(10, 6);
      board.drop(Tetromino.I_SHAPE);
      board.moveDown()
      board.moveDown()
      board.rotateRight();
      board.moveRight()
      board.moveRight()
      board.moveRight()
      board.rotateRight()

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ......IIII
         ..........
         ..........`
      );
    })

    test("I block cannot be rotated when there is no room to rotate", () => {
      board = new Board(10, 6);
      board.drop(Tetromino.I_SHAPE);
      board.moveDown()
      board.moveDown()
      board.rotateRight();
      board.moveRight()
      board.moveRight()
      board.moveRight()
      board.moveRight()
      board.rotateRight()

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ......IIII
         ..........
         ..........`
      );
    })

    test("will perform a wall kick when up against another block", () => {

      board = new Board(10, 6, `
         ......T...
         ......TT..
         ......T...
         ......T...
         ......TT..
         ......T...`)

      board.drop(Tetromino.T_SHAPE)
      board.rotateRight()
      board.rotateRight()
      board.rotateRight()
      board.moveRight()
      board.rotateRight()

      onTestFailed(() => {
        console.log("Expected:");
        console.log(`
         ....T.T...
         ...TTTTT..
         ......T...
         ......T...
         ......TT..
         ......T...`.trim().replaceAll(" ", ""));
        console.log();

        console.log("Received:");
        console.log(board.toString());
        console.log();
      })

      expect(board.toString()).to.equalShape(
        `....T.T...
         ...TTTTT..
         ......T...
         ......T...
         ......TT..
         ......T...`
      );
    })

    test("I_SHAPE should perform wall kick when up against another block", () => {
        board = new Board(10, 6,
          `..........
           ..........
           ........I.
           ........I.
           ........I.
           ........I.`);

        board.drop(Tetromino.I_SHAPE);
        board.moveDown()
        board.moveDown()
      board.rotateRight()
      board.moveRight()
      board.moveRight()
      board.rotateRight()

      expect(board.toString()).to.equalShape(`
           ..........
           ..........
           ........I.
           ....IIIII.
           ........I.
           ........I.`)
    })
  })
})