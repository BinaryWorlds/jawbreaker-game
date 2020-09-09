let gameBoard = [],
  h,
  w,
  score = 0;

function newGame(rows, columns, colors) {
  score = 0;
  generateBoard(rows, columns, colors);
}

function generateBoard(rows, columns, colors) {
  h = rows;
  w = columns;
  gameBoard = [];
  for (let i = 0; i < rows; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < columns; j++) {
      gameBoard[i][j] = Math.floor(Math.random() * colors);
    }
  }
}

function updateScore(nBalls) {
  score += nBalls * (nBalls - 1);
}

function select(x, y) {
  let board = cloneBoard(gameBoard);
  let chain = deleteChain(x, y, board);
  if (chain === null || chain.length === 0) return;
  updateBoard(board, chain);
  updateScore(chain.length);
}

function checkPoint(x, y, board) {
  let res = [],
    resLength = 0;
  const color = board[x][y];
  if (color === null) return res;
  if (x > 0 && color === board[x - 1][y]) res[resLength++] = [x - 1, y];
  if (x < w - 1 && color === board[x + 1][y]) res[resLength++] = [x + 1, y];
  if (y > 0 && color === board[x][y - 1]) res[resLength++] = [x, y - 1];
  if (y < h - 1 && color === board[x][y + 1]) res[resLength++] = [x, y + 1];

  return res;
}

function deleteChain(x, y, board) {
  let res = [],
    resLength,
    deepRes = [],
    deepResLength,
    chain = [[]],
    chainLength = 1;
  if (board[x][y] === null) return res;
  res = checkPoint(x, y, board);
  chain[0] = [x, y];
  board[x][y] = null;
  resLength = res.length;
  if (resLength === 0) return chain;
  for (let i = 0; i < resLength; i++) {
    deepRes = deleteChain(res[i][0], res[i][1], board);
    deepResLength = deepRes.length;
    for (let j = 0; j < deepResLength; j++) {
      chain[chainLength] = [];
      chain[chainLength++] = deepRes[j];
    }
  }
  return chain;
}

function cloneBoard(arr) {
  const arrLength = arr.length;
  let res = [];
  for (let i = 0; i < arrLength; i++) {
    res[i] = arr[i].slice(0);
  }
  return res;
}

function updateBoard(board, chain) {
  let columnsToUpdate = [],
    columnsToUpdateLength = 0,
    chainLength = chain.length,
    tempNr;

  for (let i = 0; i < chainLength; i++) {
    tempNr = chain[i][1];
    if (notInclude(tempNr, columnsToUpdate)) {
      columnsToUpdate[columnsToUpdateLength++] = tempNr;
    }
  }
  for (let i = 0; i < columnsToUpdateLength; i++) {
    moveDown(columnsToUpdate[i], board);
  }
  gameBoard = board;
}

function notInclude(val, arr) {
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    if (arr[i] === val) return false;
  }
  return true;
}

function moveDown(columnNr, board) {
  const maxHeight = h - 1;
  let val;
  for (let i = maxHeight; i > 0; i--) {
    if (board[i][columnNr] === null) {
      val = findUpperVal(columnNr, i, board);
      if (val === null) return;
      board[i][columnNr] = val;
    }
  }
}

function findUpperVal(columnNr, height, board) {
  let val = null;
  for (let i = height - 1; i >= 0; i--) {
    val = board[i][columnNr];
    if (val !== null) {
      board[i][columnNr] = null;
      return val;
    }
  }
  return val;
}

function findAllChains() {
  let board = cloneBoard(gameBoard);
  let res = [],
    resLength = 0,
    point,
    i,
    j;

  for (i = w - 1; i >= 0; i--) {
    for (j = h - 1; j >= 0; j--) {
      point = checkPoint(j, i, board);
      if (point.length > 0) {
        res[resLength++] = [j, i];
        deleteChain(j, i, board);
      }
    }
  }
  return res;
}
