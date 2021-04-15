import {
  TOGGLE_FULLSCREEN,
  TOGGLE_THEME,
  TOGGLE_LANG,
  TOGGLE_SETTINGS,
  UPDATE_ANIMATE,
} from './types';

export const toggleFullScreen = () => ({
  type: TOGGLE_FULLSCREEN,
});

export const toggleDarkTheme = () => ({
  type: TOGGLE_THEME,
});

export const toggleLang = () => ({
  type: TOGGLE_LANG,
});

export const toggleSettings = () => ({
  type: TOGGLE_SETTINGS,
});

export const updateAnimate = (isOn) => ({
  type: UPDATE_ANIMATE,
  payload: isOn,
});
