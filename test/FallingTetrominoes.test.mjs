
import { beforeEach, describe, test } from "vitest";
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
    board.printPretty()

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

  test.skip("when block stops and completes a row it disappears and blocks move down", () => {
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

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       .T..TTTTT.`
    );

  })
});
