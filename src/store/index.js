import { combineReducers } from 'redux';
import appReducer from './app/reducer';
import gameReducer from './game/reducer';

export default combineReducers({
  app: appReducer,
  game: gameReducer,
});
