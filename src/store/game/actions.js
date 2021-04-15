import {
  UPDATE_GAME_MODE,
  UPDATE_ROWS,
  UPDATE_COLUMNS,
  UPDATE_COLORS,
  UPDATE_BALL_SIZE,
  UPDATE_ALL_PARAMS,
} from './types';

export const updateGameMode = (mode = true) => ({
  type: UPDATE_GAME_MODE,
  payload: mode,
});

export const updateRows = (rows) => ({
  type: UPDATE_ROWS,
  payload: rows,
});

export const updateColumns = (columns) => ({
  type: UPDATE_COLUMNS,
  payload: columns,
});

export const updateColors = (colors) => ({
  type: UPDATE_COLORS,
  payload: colors,
});

export const updateBallSize = (size) => ({
  type: UPDATE_BALL_SIZE,
  payload: size,
});

export const updateAllParams = (rows, columns, colors, ballSize) => ({
  type: UPDATE_ALL_PARAMS,
  payload: { rows, columns, colors, ballSize },
});
