
import { beforeEach, describe, onTestFailed, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { fallToBottom } from "./testing.mjs";


describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);

  });

  test("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE)
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
    board.drop(Tetromino.T_SHAPE)
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
    board.drop(Tetromino.T_SHAPE)
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
    board.drop(Tetromino.T_SHAPE)
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
    board.drop(Tetromino.T_SHAPE)
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
    board.drop(Tetromino.T_SHAPE)
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
    board.drop(Tetromino.T_SHAPE)
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

    onTestFailed(() => {
      console.log("Expected:");
      console.log(`..........
       ..........
       .T..T.....
       TTTTTT....
       .T........
       TTT.......`.trim().replaceAll(" ", ""));
      console.log();

      console.log("Received:");
      console.log(board.toString());
      console.log();
    })

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .T..T.....
       TTTTTT....
       .T........
       TTT.......`
    );

    onTestFailed(() => {
      console.log("Expected:", `..........
       ..........
       .T..T.....
       TTTTTT....
       .T........
       TTT.......`);
      console.log();
      console.log("Received:", board.toString());
    })
  })

  test("it cannot be moved right through other blocks", () => {
    board.drop(Tetromino.T_SHAPE)
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
    board.drop(Tetromino.T_SHAPE)
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

  test("O_SHAPE can move all the way to the right", () => {
    board.drop(Tetromino.O_SHAPE);
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)
    board.drop(Tetromino.O_SHAPE);
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)
    board.drop(Tetromino.O_SHAPE);
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `
       ........OO
       ........OO
       ........OO
       ........OO
       ........OO
       ........OO
       `
    );
  })
})
