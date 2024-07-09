import { produce } from "immer";
import { useState } from "react";
import {
  Board,
  Cell,
  createBoard,
  forEachCell,
  getGameStatus,
} from "./Board.tsx";

const BOARD_SIZE = 5;

const handleCellClick = (
  cell: Cell,
  board: Board,
  setBoard: (b: Board) => any,
  setIsFinished: (val: boolean) => any,
) => {
  const newBoard = produce(board, (draft) => {
    if (cell.val === -1) {
      draft[cell.x][cell.y].backgroundColor = "red";
      forEachCell(board, (cell) => {
        cell.revealed = true;
      });
    } else {
      draft[cell.x][cell.y].backgroundColor = "green";
    }
    draft[cell.x][cell.y].revealed = true;
  });

  setBoard(newBoard);

  const status = getGameStatus(newBoard);
  if (status === "lost") {
    setIsFinished(true);
    setTimeout(() => alert("YOU LOOSE :("), 200);
  } else if (status === "won") {
    setTimeout(() => alert("CONGRATS :D"), 200);
    setIsFinished(true);
  }
};

const reload = (setBoard, setIsFinished) => {
  setBoard(createBoard(BOARD_SIZE));
  setIsFinished(false);
};

export default function App() {
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [boardIsRevealed, setBoardIsRevealed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  return (
    <div className="App">
      <div>
        <button
          disabled={isFinished}
          onClick={() => setBoardIsRevealed(!boardIsRevealed)}
        >
          {boardIsRevealed ? "Stop cheating" : "Cheat"}
        </button>
        <button
          style={{ backgroundColor: isFinished ? "orange" : "" }}
          onClick={() => {
            reload(setBoard, setIsFinished);
          }}
        >
          Reload
        </button>
        <table style={{ opacity: isFinished ? 0.7 : 1 }}>
          <tbody>
            {board.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {row.map((cell) => (
                    <td
                      style={{
                        backgroundColor: cell.backgroundColor || "",
                      }}
                      key={cell.y}
                      onClick={
                        isFinished
                          ? null
                          : () => {
                              handleCellClick(
                                cell,
                                board,
                                setBoard,
                                setIsFinished,
                              );
                            }
                      }
                    >
                      {(cell.revealed || boardIsRevealed) &&
                        (cell.val === -1 ? "💣" : cell.val)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
