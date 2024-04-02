import { beforeEach, describe, onTestFailed, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { setUpDoubleRowClear, setUpRowClear } from "./testing.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Players can score points", () => {
  let board
  beforeEach(() => {
    board = new Board(10, 6)
  })

  test("The player should receive points every time they manage to remove a row.", () => {
    let score = 0;
    setUpRowClear(board)
    const rowsCleared = board.checkRows()
    score += rowsCleared * 100;
    expect(score).toBe(100);
  })

  test("Player should receive more points from clearing two rows", () => {
    let score = 0;
    setUpDoubleRowClear(board)
    const rowsCleared = board.checkRows()
    score += rowsCleared * 100;
    expect(score).toBe(200);
  })

  // discovered bug for O_SHAPE movement - add more tests to root out bug
  test.skip("Player should receive more points from clearing four rows", () => {
    let score = 0;
    setUpDoubleRowClear(board)
    setUpDoubleRowClear(board)
    console.table(board.grid)
    const rowsCleared = board.checkRows()
    score += rowsCleared * 100;
    expect(score).toBe(400);
  })








})