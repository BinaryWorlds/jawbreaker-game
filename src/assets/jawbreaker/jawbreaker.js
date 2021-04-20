/* eslint-disable */
import ball0 from './0.png';
import ball1 from './1.png';
import ball2 from './2.png';
import ball3 from './3.png';
import ball4 from './4.png';

const ballList = [ball0, ball1, ball2, ball3, ball4];
export const g = {
  rows: null,
  rowsInit: null,
  columns: null,
  columnsInit: null,
  colorsInit: null,
  score: 0,
  timerId: null,
  ballSize: null,
  width: null,
  height: null,
  scoreHeight: 40,
  space: null,
  canvas: null,
  ctx: null,
  img: {},
  lastSelectedChain: [],
  board: [],
  symulateMode: false,
  lang: 'pl',
  txt: {
    en: {
      score: 'Score',
      gameOver: 'Game over!',
      clickToReset: 'click to reset',
    },
    pl: {
      score: 'Wynik',
      gameOver: 'Koniec gry!',
      clickToReset: 'kliknij aby zresetować',
    },
  },
};

export function changeLang(lang) {
  if (lang !== 'en' && lang !== 'pl') return;
  g.lang = lang;
  if (g.ctx) ctxDraw();
}

export function newGame(rows, columns, colors, ballSize = 60) {
  g.lastSelectedChain = [];
  g.score = 0;
  g.rowsInit = g.rows = rows;
  g.columnsInit = g.columns = columns;
  g.colorsInit = colors;
  g.ballSize = ballSize;
  generateBoard();
  initCanvas();
  if (!g.symulateMode) {
    document.removeEventListener('mousedown', resetGame);
    document.addEventListener('mousedown', mouseHandler);
  }
}

function generateBoard() {
  g.board = [];
  for (let x = 0; x < g.columns; x++) {
    g.board[x] = [];
    for (let y = 0; y < g.rows; y++) {
      g.board[x][y] = Math.floor(Math.random() * g.colorsInit);
    }
  }
}

function updateScore(nBalls) {
  g.score += nBalls * (nBalls - 1);
}

function select(x, y) {
  const board = cloneBoard(g.board);
  const chain = deleteChain(x, y, board);
  if (chain === null || chain.length < 2) return;
  updateBoard(board, chain);
  updateScore(chain.length);
  // printBoard(gameBoard); // console log game after every select
}

function checkPoint(x, y, board) {
  const res = [];
  const color = board[x][y];
  if (color === null) return res;
  let resLength = 0;
  if (x > 0 && color === board[x - 1][y]) res[resLength++] = [x - 1, y];
  if (x < g.columns - 1 && color === board[x + 1][y]) res[resLength++] = [x + 1, y];
  if (y > 0 && color === board[x][y - 1]) res[resLength++] = [x, y - 1];
  if (y < g.rows - 1 && color === board[x][y + 1]) res[resLength++] = [x, y + 1];

  return res;
}

function deleteChain(x, y, board) {
  if (board[x][y] === null) return [];

  const res = checkPoint(x, y, board);
  const resLength = res.length;
  const chain = [[x, y]];

  board[x][y] = null;
  if (resLength === 0) return chain;

  let deepRes = [];
  let deepResLength;
  let chainLength = 1;
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
  const res = [];
  const arrLength = arr.length;

  for (let i = 0; i < arrLength; i++) {
    res[i] = arr[i].slice(0);
  }
  return res;
}

function updateBoard(board, chain) {
  const columnsToUpdate = [];
  const chainLength = chain.length;
  let columnsToUpdateLength = 0;
  let tempNr;

  for (let i = 0; i < chainLength; i++) {
    tempNr = chain[i][0];
    if (notInclude(tempNr, columnsToUpdate)) {
      columnsToUpdate[columnsToUpdateLength++] = tempNr;
    }
  }
  for (let i = 0; i < columnsToUpdateLength; i++) {
    moveDown(columnsToUpdate[i], board);
  }
  g.board = moveLeft(board);
}

function notInclude(val, arr) {
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    if (arr[i] === val) return false;
  }
  return true;
}

function moveDown(columnNr, board) {
  let val;
  for (let i = 0; i < g.rows; i++) {
    if (board[columnNr][i] === null) {
      val = findUpperVal(columnNr, i, board);
      if (val === null) return;
      board[columnNr][i] = val;
    }
  }
}

function findUpperVal(columnNr, height, board) {
  let val = null;
  for (let i = height; i < g.rows; i++) {
    val = board[columnNr][i];
    if (val !== null) {
      board[columnNr][i] = null;
      return val;
    }
  }
  return val;
}

function moveLeft(board) {
  const res = [];
  const columnsAmount = board.length;
  let resLength = 0;
  for (let i = 0; i < columnsAmount; i++) {
    if (board[i][0] !== null) res[resLength++] = board[i];
  }
  g.columns = resLength;
  return res;
}

function findChains(mode) {
  // if mode === 1 find one chain; else find all chains
  const board = cloneBoard(g.board);
  const res = [];
  let resLength = 0;
  let point;
  let y;

  for (let x = 0; x < g.columns; x++) {
    for (y = 0; y < g.rows; y++) {
      point = checkPoint(x, y, board);
      if (point.length > 0) {
        res[resLength++] = [x, y];
        if (mode === 1) return res;
        deleteChain(x, y, board);
      }
    }
  }
  return res;
}

export function startSymulate() {
  if (g.symulateMode === true) return;
  g.symulateMode = true;
  document.removeEventListener('mousedown', mouseHandler);
  symulateGame();
}

export function symulateGame(x, y) {
  const randomTime = Math.random() * 750 + 750;

  if (x === undefined) {
    const chains = findChains();
    const chainsLength = chains.length;
    if (chainsLength === 0) {
      resetGame();
      g.symulateMode = false;
      return startSymulate();
    }
    const randomChainNr = Math.floor(Math.random() * chainsLength);
    [x, y] = chains[randomChainNr];
    g.timerId = setTimeout(symulateGame, randomTime, x, y);
  } else g.timerId = setTimeout(symulateGame, randomTime);

  clickLogic(x, y);
  ctxDraw();
}

export function stopSymulate() {
  g.symulateMode = false;
  clearTimeout(g.timerId);
}
/** ************************* */

export function calcBoardSize() {
  g.space = Math.floor(g.ballSize * 0.15);
  g.width = g.space + g.columns * (g.ballSize + g.space);
  g.height = g.space + g.rows * (g.ballSize + g.space) + g.scoreHeight;
}

export function getRatio() {
  const dpr = window.devicePixelRatio || 1;
  const bsr =
    g.ctx.webkitBackingStorePixelRatio ||
    g.ctx.mozBackingStorePixelRatio ||
    g.ctx.msBackingStorePixelRatio ||
    g.ctx.oBackingStorePixelRatio ||
    g.ctx.backingStorePixelRatio ||
    1;

  return dpr / bsr;
}

function updateCanvasSize() {
  const ratio = getRatio();
  g.canvas.width = g.width * ratio;
  g.canvas.height = g.height * ratio;
  g.canvas.style.width = `${g.width}px`;
  g.canvas.style.height = `${g.height}px`;
  g.ctx.scale(ratio, ratio);
}

export function updateBallSize(size) {
  if (size === g.ballSize) return;
  g.ballSize = size;
  calcBoardSize();
  updateCanvasSize();
  ctxDraw();
}

function initCanvas() {
  calcBoardSize();
  // g.canvas = document.getElementById("gameArea");

  updateCanvasSize();
  // if (!g.canvas.getContext && !g.canvas.getContext("2d")) return alert("ERROR");
  // g.ctx = g.canvas.getContext("2d");
  preloadImages();
}

function preloadImages() {
  g.img = {};
  g.img.loaded = 0;
  for (let i = 0; i < g.colorsInit; i++) {
    g.img[i] = new Image();
    g.img[i].onload = () => {
      if (++g.img.loaded >= g.colorsInit) ctxDraw();
    };
    g.img[i].src = ballList[i];
  }
}

function ctxDraw() {
  g.ctx.clearRect(0, 0, g.width, g.height);
  g.ctx.fillStyle = '#f0f0f0';
  g.ctx.fillRect(0, g.scoreHeight, g.width, g.height - g.scoreHeight);
  g.ctx.font = `${g.scoreHeight * 0.8}px Comic Sans MS`;
  g.ctx.fillStyle = 'black';
  g.ctx.fillText(`${g.txt[g.lang].score}: ${g.score}`, g.scoreHeight, g.scoreHeight * 0.8);

  highlightSelected();
  loadBalls();
  if (g.lastSelectedChain === null) checkItIsOver();
}

function loadBalls() {
  const columns = g.board.length;
  let val;
  let y;

  for (let x = 0; x < columns; x++) {
    for (y = 0; y < g.rows; y++) {
      val = g.board[x][y];
      if (val === null) break;
      g.ctx.drawImage(
        g.img[val],
        g.space + x * (g.ballSize + g.space),
        g.height - (y + 1) * (g.ballSize + g.space),
        g.ballSize,
        g.ballSize,
      );
    }
  }
}

function mouseHandler(e) {
  const { left, top } = g.canvas.getBoundingClientRect();
  const mouseX = e.clientX - left;
  const mouseY = e.clientY - top;

  if (mouseX < 0 || mouseY < 0 || mouseX > g.width || mouseY > g.height) return;
  let x = g.width / g.columnsInit;
  x = Math.floor(mouseX / x);
  let y = (g.height - g.scoreHeight) / g.rows;
  y = g.rows - 1 - Math.floor((mouseY - g.scoreHeight) / y);
  if (y >= g.rows) return;
  clickLogic(x, y);
}

function clickLogic(x, y) {
  if (x >= g.columns) {
    if (g.lastSelectedChain !== null) {
      g.lastSelectedChain = null;
      ctxDraw();
    }
    return;
  }
  const preventUpdate = g.lastSelectedChain === null;
  const isHighlighted = findPointInChain(x, y);
  if (isHighlighted === true) {
    select(x, y);
    g.lastSelectedChain = null;
  } else {
    const board = cloneBoard(g.board);
    const chain = deleteChain(x, y, board);
    if (chain === null || chain.length < 2) g.lastSelectedChain = null;
    else g.lastSelectedChain = chain;
  }

  if (g.lastSelectedChain === null && preventUpdate === true) return;
  ctxDraw();
}

function findPointInChain(x, y) {
  if (g.lastSelectedChain === null) return false;
  const { length } = g.lastSelectedChain;
  let chckX;
  let chckY;
  for (let i = 0; i < length; i++) {
    [chckX, chckY] = g.lastSelectedChain[i];
    if (x === chckX && y === chckY) return true;
  }

  return false;
}

function highlightSelected() {
  if (g.lastSelectedChain === null) return;
  const chainLength = g.lastSelectedChain.length;
  let x1;
  let y1;
  let x2;
  let y2;
  let temp;
  let tempLength;
  let j;
  g.ctx.beginPath();
  for (let i = 0; i < chainLength; i++) {
    [x1, y1] = g.lastSelectedChain[i];
    temp = checkPoint(x1, y1, g.board);
    [x1, y1] = calcPosition(x1, y1);
    tempLength = temp.length;
    for (j = 0; j < tempLength; j++) {
      g.ctx.moveTo(x1, y1);
      [x2, y2] = temp[j];
      g.ctx.lineTo(...calcPosition(x2, y2));
    }
  }

  g.ctx.lineWidth = g.ballSize + g.space;
  g.ctx.lineCap = 'round';
  g.ctx.lineJoin = 'round';
  g.ctx.strokeStyle = 'rgba(54, 175, 236, 0.4)';
  g.ctx.stroke();
}

function calcPosition(x, y) {
  const xPx = (x + 1) * (g.ballSize + g.space) - g.ballSize / 2;
  const yPx = (g.rows - y) * (g.ballSize + g.space) + g.scoreHeight - g.ballSize / 2;
  return [xPx, yPx];
}

function checkItIsOver() {
  const chain = findChains(1); // find one
  if (chain.length === 0) {
    document.removeEventListener('mousedown', mouseHandler);
    if (!g.symulateMode) document.addEventListener('mousedown', resetGame);

    g.ctx.fillStyle = '#f0f0f0';
    g.ctx.fillRect(0, 0, g.width, g.scoreHeight + 1);
    g.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    g.ctx.fillRect(0, 0, g.width, g.height);
    const smallerSide = Math.min(g.width, g.height);
    const txtSize = Math.min(Math.floor(smallerSide / 8), 100);
    g.ctx.font = `${txtSize}px Comic Sans MS`;
    g.ctx.fillStyle = 'black';
    g.ctx.textAlign = 'center';
    g.ctx.fillText(`${g.txt[g.lang].gameOver}`, g.width / 2, g.height / 3);
    g.ctx.font = `${txtSize / 2}px Comic Sans MS`;
    g.ctx.fillText(`${g.txt[g.lang].score}: ${g.score}`, g.width / 2, g.height / 2);
    g.ctx.fillText(`${g.txt[g.lang].clickToReset}`, g.width / 2, (g.height * 2) / 3);
  }
}

export function resetGame() {
  newGame(g.rowsInit, g.columnsInit, g.colorsInit, g.ballSize);
}
