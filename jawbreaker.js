let gameBoard = [],
  h,
  w,
  wStart,
  score = 0;

function newGame(rows, columns, colors) {
  score = 0;
  generateBoard(rows, columns, colors);
  initCanvas();
}

function generateBoard(rows, columns, colors) {
  h = rows;
  wStart = w = columns;
  gameBoard = [];
  for (let i = 0; i < columns; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < rows; j++) {
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
  if (chain === null || chain.length < 2) return false;
  updateBoard(board, chain);
  updateScore(chain.length);
  // printBoard(gameBoard); // console log game after every select
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
    tempNr = chain[i][0];
    if (notInclude(tempNr, columnsToUpdate)) {
      columnsToUpdate[columnsToUpdateLength++] = tempNr;
    }
  }
  for (let i = 0; i < columnsToUpdateLength; i++) {
    moveDown(columnsToUpdate[i], board);
  }
  board = moveLeft(board);
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
  let val;
  for (let i = 0; i < h; i++) {
    if (board[columnNr][i] === null) {
      val = findUpperVal(columnNr, i, board);
      if (val === null) return;
      board[columnNr][i] = val;
    }
  }
}

function findUpperVal(columnNr, height, board) {
  let val = null;
  for (let i = height; i < h; i++) {
    val = board[columnNr][i];
    if (val !== null) {
      board[columnNr][i] = null;
      return val;
    }
  }
  return val;
}

function moveLeft(board) {
  let res = [],
    resLength = 0,
    columnsAmount = board.length;
  for (let i = 0; i < columnsAmount; i++) {
    if (board[i][0] !== null) res[resLength++] = board[i];
  }
  w = resLength;
  return res;
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
      point = checkPoint(i, j, board);
      if (point.length > 0) {
        res[resLength++] = [i, j];
        deleteChain(i, j, board);
      }
    }
  }
  return res;
}

function printBoard(board) {
  let line = "",
    val;

  for (let i = h - 1; i >= 0; i--) {
    for (let j = 0; j < w; j++) {
      val = board[j][i];
      if (val === null) val = " ";
      line += ` ${val}`;
    }
    console.log(line);
    line = "";
  }
}

let timerId;

function symulateGame() {
  let chains = findAllChains(),
    chainsLength = chains.length;
  if (chainsLength === 0) return console.log("END");
  let randomTime = Math.random() * 1500 + 1500,
    randomChainNr = Math.floor(Math.random() * chainsLength),
    [x, y] = chains[randomChainNr];
  select(x, y);
  loadBalls(gameBoard);
  timerId = setTimeout(symulateGame, randomTime);
}

function stopSymulate() {
  clearTimeout(timerId);
}
/****************************/
let sizeBall = 50,
  width,
  height,
  space,
  canvas,
  ctx,
  images = {};

function calcBoardSize() {
  space = Math.floor(sizeBall * 0.15);
  width = space + w * (sizeBall + space);
  height = space + h * (sizeBall + space);
}

function initCanvas() {
  calcBoardSize();
  canvas = document.getElementById("gameArea");
  canvas.width = width;
  canvas.height = height;
  if (!canvas.getContext("2d")) return alert("ERROR");
  ctx = canvas.getContext("2d");
  loadBalls(gameBoard);
}

function imageSrc(nr) {
  return `./images/${nr}.png`;
}

function loadBalls(board) {
  let columns = board.length,
    imagesNr = 0,
    val;
  images = {};
  images.loaded = 0;

  for (let i = h - 1; i >= 0; i--) {
    for (let j = 0; j < columns; j++) {
      val = board[j][i];
      if (val === null) continue;
      images[imagesNr] = {};
      images[imagesNr].x = j;
      images[imagesNr].y = i;
      images[imagesNr].img = new Image();
      images[imagesNr].img.onload = function () {
        if (++images.loaded >= images.toLoad) ctxDraw();
      };
      images[imagesNr++].img.src = imageSrc(val);
    }
  }
  images.toLoad = imagesNr;
}

function ctxDraw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < images.toLoad; i++) {
    let img = images[i];
    ctx.drawImage(
      img.img,
      space + img.x * (sizeBall + space),
      height - (img.y + 1) * (sizeBall + space),
      sizeBall,
      sizeBall
    );
  }
}

document.addEventListener("mousedown", mouseHandler);
function mouseHandler(e) {
  let mouseX = e.clientX - canvas.offsetLeft,
    mouseY = e.clientY - canvas.offsetTop,
    x,
    y;
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) return;
  x = width / wStart;
  x = Math.floor(mouseX / x);
  if (x >= w) return;
  y = height / h;
  y = h - 1 - Math.floor(mouseY / y);
  let clicked = select(x, y);
  if (clicked === false) return;
  loadBalls(gameBoard);
}

newGame(9, 9, 5);
