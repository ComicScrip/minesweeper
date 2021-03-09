import { createBoard } from "./Board";
import { isArray, isObject } from "lodash";

describe("createEmptyBoard", () => {
  it("should initialize the board with default objects giving infos about position of the cells", () => {
    const board = createBoard(5);
    expect(isArray(board));
    for (let x = 0; x < board.length; x++) {
      expect(isArray(board[x]));
      for (let y = 0; y < board[x].length; y++) {
        const cell = board[x][y];
        expect(isObject(cell));
      }
    }
  });
});
