export const forEachCell = (board, fn) => {
  board.forEach(row => {
    row.forEach(cell => {
      fn(cell);
    });
  });
};

export const getNeighbors = (board, cell) => {
  const neighbors = [];
  const boardLastIndex = board.length - 1;

  if (cell.x > 0) neighbors.push(board[cell.x - 1][cell.y]); // up
  if (cell.x < boardLastIndex) neighbors.push(board[cell.x + 1][cell.y]); // down

  if (cell.y > 0) neighbors.push(board[cell.x][cell.y - 1]); // left
  if (cell.y > 0 && cell.x > 0) neighbors.push(board[cell.x - 1][cell.y - 1]); // left-up
  if (cell.x < boardLastIndex && cell.y > 0)
    neighbors.push(board[cell.x + 1][cell.y - 1]); // left-down

  if (cell.y < boardLastIndex) neighbors.push(board[cell.x][cell.y + 1]); // right
  if (cell.x > 0 && cell.y < boardLastIndex)
    neighbors.push(board[cell.x - 1][cell.y + 1]); // right-up
  if (cell.x < boardLastIndex && cell.y < boardLastIndex)
    neighbors.push(board[cell.x + 1][cell.y + 1]); // right-down

  return neighbors;
};

export const populateWithBombs = (board, bombRatio = 0.2) => {
  forEachCell(board, cell => {
    cell.val = Math.random() < bombRatio ? -1 : null;
  });
};

export const populateWithNeighborsCount = (board, bombRatio = 0.2) => {
  forEachCell(board, cell => {
    if (cell.val !== -1) {
      cell.val = getNeighbors(board, cell).filter(
        neighbor => neighbor.val === -1
      ).length;
    }
  });
};

export const createEmptyBoard = size => {
  const cells = new Array(size);
  for (let x = 0; x < size; x++) {
    cells[x] = new Array(size);
    for (let y = 0; y < size; y++) {
      cells[x][y] = { key: x + y, x, y, revealed: false };
    }
  }
  return cells;
};

export const getGameStatus = board => {
  let status = "playing";
  let cellsLeftToWin = board.length * board.length;
  forEachCell(board, cell => {
    if (cell.val === -1) {
      if (cell.revealed) status = "lost";
      else cellsLeftToWin--;
    } else if (cell.revealed) {
      cellsLeftToWin--;
    }
  });
  if (cellsLeftToWin === 0) status = "won";

  return status;
};

export const createBoard = (size, bombRatio) => {
  const b = createEmptyBoard(size);
  populateWithBombs(b, bombRatio);
  populateWithNeighborsCount(b);
  return b;
};
