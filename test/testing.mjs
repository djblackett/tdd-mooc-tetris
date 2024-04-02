import { Assertion } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";

export function normalize(s) {
  return s.replaceAll(" ", "").trim() + "\n";
}

Assertion.addMethod("equalShape", function (expected) {
  const actual = this._obj;
  new Assertion(actual).to.be.a("string");

  expected = normalize(expected);
  this.assert(
    actual === expected,
    "expected #{this} to equal #{exp} but got #{act}",
    "expected #{this} to not equal #{act}",
    expected,
    actual
  );
});

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

export function setUpRowClear(board) {
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
}
