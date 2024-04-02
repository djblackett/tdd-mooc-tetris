import { beforeEach, describe, onTestFailed, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { setUpRowClear } from "./testing.mjs";

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
  })








})