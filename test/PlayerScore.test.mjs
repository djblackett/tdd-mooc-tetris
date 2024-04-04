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

  test("The player should receive 100 points every time they manage to remove a row.", () => {
    let score = 0;
    board = new Board(10, 6, `
       ..........
       ..........
       ..........
       ..........
       .T..TTTTT.
       TTTTTTTTTT`)
    const rowsCleared = board.checkRows()
    score += rowsCleared * 100;
    expect(score).toBe(100);
  })

  test("Player should receive 200 points from clearing two rows", () => {
    let score = 0;
    board = new Board(10, 6, `..........
       ..........
       ..........
       ..........
       OOOOOOOOOO
       OOOOOOOOOO`)

    const rowsCleared = board.checkRows()
    score += rowsCleared * 100;
    expect(score).toBe(200);
  })

  test("Player should receive 300 points from clearing three rows", () => {
    let score = 0;
    board = new Board(10, 6, `..........
       .....TTT..
       .T..T.T.T.
       TTTTTTTTTT
       OOOOOOOOOO
       OOOOOOOOOO`)
    const rowsCleared = board.checkRows()
    score += rowsCleared * 100;
    expect(score).toBe(300);
  })

  test("Player should receive 400 points from clearing four rows", () => {
    let score = 0;
    board = new Board(10, 6, `..........
       ..........
       OOOOOOOOOO
       OOOOOOOOOO
       OOOOOOOOOO
       OOOOOOOOOO`)
    const rowsCleared = board.checkRows()
    score += rowsCleared * 100;
    expect(score).toBe(400);
  })


  test("should register points earned with observer", () => {
    const playerScore = new PlayerScore();
    board.attach(playerScore);
    setUpRowClear(board)
    expect(playerScore.score).toBe(100);

  })
})