import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header/Header';
import Canvas from '../Canvas/Canvas';
import Settings from '../Settings/Settings';
import useHint from '../../hooks/useHint';
import { updateAllParams } from '../../store/game/actions';
import { updateAnimate } from '../../store/app/actions';
import * as S from './Game.style';

import {
  changeLang,
  newGame,
  startSymulate,
  stopSymulate,
  updateBallSize,
  g,
} from '../../assets/jawbreaker/jawbreaker';

function Game() {
  const dispatch = useDispatch();

  const {
    app: { isPl, isFullScreen, isSettingsActive, isAnimatePlay },
    game: { ballSize, rows, columns, colors, isPlay },
  } = useSelector((state) => state);

  const { isHintShow, handleHint, hideHint } = useHint(3);

  const handleAnimate = () => {
    handleHint();
    if (isAnimatePlay || isPlay) return;
    dispatch(updateAnimate(true));
  };

  const checkGameSize = () => {
    const width = window.innerWidth;
    if (width > 2000) return 2;
    if (width > 1300) return 1;
    return 0;
  };

  const [gameSize, setGameSize] = useState(checkGameSize);
  const updateGameSize = () => setGameSize(checkGameSize);

  const getParams = (size) => {
    const ball = size === 2 ? 60 : 40;
    const r = size !== 0 ? 12 : 9;
    const c = size !== 0 ? 15 : 12;
    return [r, c, 5, ball];
  };

  const checkIsDifferent = (r, c, k) =>
    r !== g.rowsInit || c !== g.columnsInit || k !== g.colorsInit;

  const initGame = (size = 0, mode = false) => {
    const [r, c, k, s] = getParams(size);
    const check = checkIsDifferent(r, c, k);
    if (!check) {
      updateBallSize(s);
      return;
    }
    stopSymulate();
    newGame(r, c, k, s);
    dispatch(updateAllParams(r, c, k, s));
    if (!mode) startSymulate();
  };

  useEffect(() => {
    if (isPlay) hideHint();
  }, [isPlay]);

  useEffect(() => {
    const lang = isPl ? 'pl' : 'en';
    changeLang(lang);
  }, [isPl]);

  useEffect(() => {
    if (isFullScreen) return;
    initGame(gameSize, isPlay);
  }, [gameSize]);

  useEffect(() => {
    if (!isSettingsActive) return;
    const check = checkIsDifferent(rows, columns, colors);
    if (!check) return;

    stopSymulate();
    newGame(rows, columns, colors, ballSize);
    if (!isPlay) startSymulate();
  }, [rows, columns, colors]);

  useEffect(() => {
    if (!isSettingsActive) return;
    updateBallSize(ballSize);
  }, [ballSize]);

  useEffect(() => {
    window.addEventListener('resize', updateGameSize);
    return () => {
      window.removeEventListener('resize', updateGameSize);
      stopSymulate();
      g.columnsInit = 0;
    };
  }, []);

  return (
    <S.Wrapper>
      <Header isHintShow={isHintShow} />
      <Settings gameSize={gameSize} getParams={getParams} />
      <Canvas handleAnimate={handleAnimate} />
    </S.Wrapper>
  );
}

export default Game;
