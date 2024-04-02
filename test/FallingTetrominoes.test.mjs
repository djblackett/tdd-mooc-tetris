
import { beforeEach, describe, onTestFailed, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("start from the top middle", () => {
    board.drop(Tetromino.T_SHAPE);

    onTestFailed(() => {
      console.log("Expected:");
      console.log(`....T.....
       ...TTT....
       ..........
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
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("stop when they hit the bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  test("stop when they land on another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });

  test("when block stops and completes a row it disappears and blocks move down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE)
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE)
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE)
    board.rotate()
    board.rotate()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)
    board.checkRows()

    onTestFailed(() => {
      console.log("Expected:");
      console.log(`..........
       ..........
       ..........
       ..........
       ..........
       .T..TTTTT.`.trim().replaceAll(" ", ""));
      console.log();

      console.log("Received:");
      console.log(board.toString());
      console.log();
    })
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       .T..TTTTT.`
    );
  })

  test("Can clear 2 rows on board", () => {
    board.drop(Tetromino.O_SHAPE)
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    fallToBottom(board)
    board.drop(Tetromino.O_SHAPE)
    board.moveLeft()
    fallToBottom(board)

  })
});
