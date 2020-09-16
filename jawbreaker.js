let gameBoard = [],
  h,
  w,
  wStart,
  hStart,
  colorsStart,
  score = 0,
  timerId;

function newGame(rows, columns, colors, setSizeBall = 50) {
  score = 0;
  sizeBall = setSizeBall;
  generateBoard(rows, columns, colors);
  initCanvas();
  document.removeEventListener("mousedown", resetGame);
  document.addEventListener("mousedown", mouseHandler);
}

function generateBoard(rows, columns, colors) {
  hStart = h = rows;
  wStart = w = columns;
  colorsStart = colors;
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
  const board = cloneBoard(gameBoard),
    chain = deleteChain(x, y, board);
  if (chain === null || chain.length < 2) return;
  updateBoard(board, chain);
  updateScore(chain.length);
  // printBoard(gameBoard); // console log game after every select
}

function checkPoint(x, y, board) {
  const res = [],
    color = board[x][y];
  if (color === null) return res;
  let resLength = 0;
  if (x > 0 && color === board[x - 1][y]) res[resLength++] = [x - 1, y];
  if (x < w - 1 && color === board[x + 1][y]) res[resLength++] = [x + 1, y];
  if (y > 0 && color === board[x][y - 1]) res[resLength++] = [x, y - 1];
  if (y < h - 1 && color === board[x][y + 1]) res[resLength++] = [x, y + 1];

  return res;
}

function deleteChain(x, y, board) {
  if (board[x][y] === null) return [];

  const res = checkPoint(x, y, board),
    resLength = res.length,
    chain = [[x, y]];

  board[x][y] = null;
  if (resLength === 0) return chain;

  let deepRes = [],
    deepResLength,
    chainLength = 1;
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
  const res = [],
    arrLength = arr.length;

  for (let i = 0; i < arrLength; i++) {
    res[i] = arr[i].slice(0);
  }
  return res;
}

function updateBoard(board, chain) {
  const columnsToUpdate = [],
    chainLength = chain.length;
  let columnsToUpdateLength = 0,
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
  gameBoard = moveLeft(board);
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
  const res = [],
    columnsAmount = board.length;
  let resLength = 0;
  for (let i = 0; i < columnsAmount; i++) {
    if (board[i][0] !== null) res[resLength++] = board[i];
  }
  w = resLength;
  return res;
}

function findChains(mode) {
  // if mode === 1 find one chain; else find all chains
  const board = cloneBoard(gameBoard),
    res = [];
  let resLength = 0,
    point,
    i,
    j;

  for (i = w - 1; i >= 0; i--) {
    for (j = h - 1; j >= 0; j--) {
      point = checkPoint(i, j, board);
      if (point.length > 0) {
        res[resLength++] = [i, j];
        if (mode === 1) return res;
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

function symulateGame(x, y) {
  document.removeEventListener("mousedown", mouseHandler);
  const randomTime = Math.random() * 750 + 750;

  if (x === undefined) {
    const chains = findChains(),
      chainsLength = chains.length;
    if (chainsLength === 0) {
      resetGame();
      return symulateGame();
    }
    const randomChainNr = Math.floor(Math.random() * chainsLength);
    [x, y] = chains[randomChainNr];
    timerId = setTimeout(symulateGame, randomTime, x, y);
  } else timerId = setTimeout(symulateGame, randomTime);

  clickLogic(x, y);
  ctxDraw();
}

function stopSymulate() {
  clearTimeout(timerId);
  resetGame();
}
/****************************/
let sizeBall,
  width,
  height,
  scoreHeight = 50,
  space,
  canvas,
  ctx,
  images = {},
  lastSelectedChain = [];

function calcBoardSize() {
  space = Math.floor(sizeBall * 0.15);
  width = space + w * (sizeBall + space);
  height = space + h * (sizeBall + space) + scoreHeight;
}

function initCanvas() {
  calcBoardSize();
  canvas = document.getElementById("gameArea");
  canvas.width = width;
  canvas.height = height;
  if (!canvas.getContext && !canvas.getContext("2d")) return alert("ERROR");
  ctx = canvas.getContext("2d");
  preloadImages();
}

function imageSrc(nr) {
  return `./images/${nr}.png`;
}

function preloadImages() {
  images = {};
  images.loaded = 0;
  for (let i = 0; i < colorsStart; i++) {
    images[i] = new Image();
    images[i].onload = function () {
      if (++images.loaded >= colorsStart) ctxDraw();
    };
    images[i].src = imageSrc(i);
  }
}

function ctxDraw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, scoreHeight, width, height - scoreHeight);
  ctx.font = `${scoreHeight * 0.8}px Comic Sans MS`;
  ctx.fillStyle = "black";
  ctx.fillText(`Score : ${score}`, scoreHeight, scoreHeight * 0.8);

  highlightSelected();
  loadBalls();
  if (lastSelectedChain === null) checkItIsOver();
}

function loadBalls() {
  const columns = gameBoard.length;
  let val, y;

  for (let x = 0; x < columns; x++) {
    for (y = 0; y < h; y++) {
      val = gameBoard[x][y];
      if (val === null) break;
      ctx.drawImage(
        images[val],
        space + x * (sizeBall + space),
        height - (y + 1) * (sizeBall + space),
        sizeBall,
        sizeBall
      );
    }
  }
}

function mouseHandler(e) {
  const mouseX = e.clientX - canvas.offsetLeft,
    mouseY = e.clientY - canvas.offsetTop;
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) return;
  let x = width / wStart;
  x = Math.floor(mouseX / x);
  let y = (height - scoreHeight) / h;
  y = h - 1 - Math.floor((mouseY - scoreHeight) / y);
  if (y >= h) return;
  clickLogic(x, y);
}

function clickLogic(x, y) {
  if (x >= gameBoard.length) {
    if (lastSelectedChain !== null) {
      lastSelectedChain = null;
      ctxDraw();
    }
    return;
  }
  const preventUpdate = lastSelectedChain === null ? true : false,
    isHighlighted = findPointInChain(x, y);
  if (isHighlighted === true) {
    select(x, y);
    lastSelectedChain = null;
  } else {
    const board = cloneBoard(gameBoard),
      chain = deleteChain(x, y, board);
    if (chain === null || chain.length < 2) lastSelectedChain = null;
    else lastSelectedChain = chain;
  }

  if (lastSelectedChain === null && preventUpdate === true) return;
  ctxDraw();
}

function findPointInChain(x, y) {
  if (lastSelectedChain === null) return false;
  const length = lastSelectedChain.length;
  let chckX, chckY;
  for (let i = 0; i < length; i++) {
    [chckX, chckY] = lastSelectedChain[i];
    if (x === chckX && y === chckY) return true;
  }

  return false;
}

function highlightSelected() {
  if (lastSelectedChain === null) return;
  const chainLength = lastSelectedChain.length;
  let x1, y1, x2, y2, temp, tempLength, j;
  ctx.beginPath();
  for (let i = 0; i < chainLength; i++) {
    [x1, y1] = lastSelectedChain[i];
    temp = checkPoint(x1, y1, gameBoard);
    [x1, y1] = calcPosition(x1, y1);
    tempLength = temp.length;
    for (j = 0; j < tempLength; j++) {
      ctx.moveTo(x1, y1);
      [x2, y2] = temp[j];
      ctx.lineTo(...calcPosition(x2, y2));
    }
  }

  ctx.lineWidth = sizeBall + space;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "rgba(54, 175, 236, 0.4)";
  ctx.stroke();
}

function calcPosition(x, y) {
  const xPx = (x + 1) * (sizeBall + space) - sizeBall / 2,
    yPx = (h - y) * (sizeBall + space) + scoreHeight - sizeBall / 2;
  return [xPx, yPx];
}

function checkItIsOver() {
  const chain = findChains(1); //find one
  if (chain.length === 0) {
    document.removeEventListener("mousedown", mouseHandler);
    document.addEventListener("mousedown", resetGame);

    ctx.clearRect(0, 0, width, scoreHeight);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(0, 0, width, height);
    const txtSize = Math.floor(width / 8);
    ctx.font = `${txtSize}px Comic Sans MS`;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game over!", width / 2, height / 3);
    ctx.font = `${txtSize / 2}px Comic Sans MS`;
    ctx.fillText(`Score: ${score}`, width / 2, height / 2);
    ctx.fillText("click to reset", width / 2, (height * 2) / 3);
  }
}

function resetGame() {
  newGame(hStart, wStart, colorsStart, sizeBall);
}

newGame(12, 12, 5, 50);
