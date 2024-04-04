import { describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

describe("ShuffleBag", () => {

  const TETROMINOS = [Tetromino.T_SHAPE, Tetromino.O_SHAPE, Tetromino.I_SHAPE, Tetromino.L_SHAPE,
    Tetromino.J_SHAPE, Tetromino.S_SHAPE, Tetromino.Z_SHAPE];

  test("Tetrominos should be fed to board in random order", () => {

    const shuffle1 = new ShuffleBag(TETROMINOS).getShuffleBag();
    const shuffle2 = new ShuffleBag(TETROMINOS).getShuffleBag()

    expect(shuffle1).not.toStrictEqual(shuffle2)
  })

  test("each block should be dropped an equal number of times", () =>{
    let arr = []
    const numberOfShuffleBags = 100;
    const map = new Map()
    let isSameNumber = true

    for (let i = 0; i < numberOfShuffleBags; i++) {
      arr = arr.concat([...new ShuffleBag(TETROMINOS).getShuffleBag()])
    }

    for (let i of TETROMINOS) {
      map.set(i.toString(), 0);
    }

    for (let i of arr) {
      map.set(i.toString(), map.get(i.toString()) + 1);
    }

    for (let i of map.values()) {
      if (numberOfShuffleBags !== i) {
        isSameNumber = false;
        break;
      }
    }

    expect(isSameNumber).toBe(true)
  })
})