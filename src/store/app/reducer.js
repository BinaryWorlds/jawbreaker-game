import {
  TOGGLE_FULLSCREEN,
  TOGGLE_THEME,
  TOGGLE_LANG,
  TOGGLE_SETTINGS,
  UPDATE_ANIMATE,
} from './types';

const initialState = {
  isFullScreen: false,
  isDark: false,
  isPl: false,
  isSettingsActive: false,
  isAnimatePlay: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_FULLSCREEN:
      return { ...state, isFullScreen: !state.isFullScreen };

    case TOGGLE_THEME:
      return { ...state, isDark: !state.isDark };

    case TOGGLE_LANG:
      return { ...state, isPl: !state.isPl };

    case TOGGLE_SETTINGS:
      return { ...state, isSettingsActive: !state.isSettingsActive };

    case UPDATE_ANIMATE:
      return { ...state, isAnimatePlay: payload };

    default:
      return state;
  }
};
