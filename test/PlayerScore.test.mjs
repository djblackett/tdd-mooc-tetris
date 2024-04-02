import { beforeEach, describe, onTestFailed, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { setUpDoubleRowClear, setUpRowClear } from "./testing.mjs";
import { PlayerScore } from "../src/PlayerScore.mjs";

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

  test("Player should receive more points from clearing three rows", () => {
    let score = 0;
    setUpDoubleRowClear(board)
    setUpRowClear(board)
    const rowsCleared = board.checkRows()
    score += rowsCleared * 100;
    expect(score).toBe(300);
  })

  test.skip("Player should receive more points from clearing four rows", () => {
    let score = 0;
    setUpDoubleRowClear(board)
    setUpDoubleRowClear(board)
    console.table(board.grid)
    const rowsCleared = board.checkRows()
    score += rowsCleared * 100;
    expect(score).toBe(400);
  })


  test("should register points earned with observer", () => {
    const playerScore = new PlayerScore();
    board.attach(playerScore);
    setUpRowClear(board)
    board.checkRows()
    expect(playerScore.score).toBe(100);

  })
})