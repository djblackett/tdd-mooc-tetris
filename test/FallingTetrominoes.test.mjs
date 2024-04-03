import { beforeEach, describe, onTestFailed, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { fallToBottom } from "./testing.mjs";


describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("T Shape Blocks", () => {
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
      board = new Board(10, 6, `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`)
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
  });

  describe("O Shape Blocks", () => {

    test("O_SHAPE starts from the top middle", () => {
      board.drop(Tetromino.O_SHAPE);
      expect(board.toString()).to.equalShape(`
       ....OO....
       ....OO....
       ..........
       ..........
       ..........
       ..........`
      );
    })


    test("stop when they hit the bottom", () => {
      board.drop(Tetromino.O_SHAPE);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....OO....
         ....OO....`
      );
    });

    test("stop when they land on another block", () => {
      board = new Board(10, 6, `
       ..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`)
      board.drop(Tetromino.O_SHAPE);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ....OO....
       ....OO....
       ....T.....
       ...TTT....`
      );
    });
  });

  describe("I Shape Blocks", () => {

    test("I_SHAPE starts from the top middle", () => {
      board.drop(Tetromino.I_SHAPE);
      expect(board.toString()).to.equalShape(`
       ...IIII...
       ..........
       ..........
       ..........
       ..........
       ..........`
      );
    })


    test("stop when they hit the bottom", () => {
      board.drop(Tetromino.I_SHAPE);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ..........
         ...IIII...`
      );
    });

    test("stop when they land on another block", () => {
      board = new Board(10, 6, `
       ..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`)
      board.drop(Tetromino.I_SHAPE);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ..........
       ...IIII...
       ....T.....
       ...TTT....`
      );
    });
  });


  test("when block stops and completes a row it disappears and blocks move down", () => {
    board = new Board(10, 6, `
       ..........
       ..........
       ..........
       ..........
       .T..T...T.
       TTTTTT.TTT`);

    board.drop(Tetromino.T_SHAPE)
    board.rotateRight()
    board.rotateRight()
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
    board = new Board(10, 6, `..........
       ..........
       ..........
       ..........
       OOOOOOOOOO
       OOOOOOOOOO`)

    board.checkRows()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  })



});


