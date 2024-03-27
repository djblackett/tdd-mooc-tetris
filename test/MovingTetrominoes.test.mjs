
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

  test("a falling tetromino can be moved left", () => {
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  })

  test("a falling tetromino can be moved right", () => {
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  })


  test("a falling tetromino can be moved down", () => {
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........
       `
    );
  })

  test("it cannot be moved left beyond the board", () => {
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  })

  test("it cannot be moved right beyond the board", () => {
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  })

  test("it cannot be moved down beyond the board (will stop falling)", () => {
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  test("it cannot be moved left through other blocks", () => {
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.drop(Tetromino.T_SHAPE)
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.drop(Tetromino.T_SHAPE)
    board.moveDown()
    board.moveDown()
    board.moveLeft()
    board.moveLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .T..T.....
       TTTTTT....
       .T........
       TTT.......`
    );
  })

  test("it cannot be moved right through other blocks", () => {
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.drop(Tetromino.T_SHAPE)
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight() 
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.drop(Tetromino.T_SHAPE)
    board.moveDown()
    board.moveDown()
    board.moveRight()
    board.moveRight()
    board.moveRight()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .....T..T.
       ....TTTTTT
       ........T.
       .......TTT`
    );
  })


  test("it cannot be moved down through other blocks (will stop falling)", () => {
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
    board.moveDown()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  })
})
