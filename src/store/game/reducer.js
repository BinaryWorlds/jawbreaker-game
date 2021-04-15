import {
  UPDATE_GAME_MODE,
  UPDATE_ROWS,
  UPDATE_COLUMNS,
  UPDATE_COLORS,
  UPDATE_BALL_SIZE,
  UPDATE_ALL_PARAMS,
} from './types';

const initialState = {
  isPlay: false,
  rows: 0,
  columns: 0,
  colors: 0,
  ballSize: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_GAME_MODE:
      return { ...state, isPlay: payload };

    case UPDATE_ROWS:
      return { ...state, rows: payload };

    case UPDATE_COLUMNS:
      return { ...state, columns: payload };

    case UPDATE_COLORS:
      return { ...state, colors: payload };

    case UPDATE_BALL_SIZE:
      return { ...state, ballSize: payload };

    case UPDATE_ALL_PARAMS:
      return { ...state, ...payload };

    default:
      return state;
  }
};
