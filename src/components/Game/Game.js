import React, { useEffect } from 'react';
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
import { calcMaxRows, calcMaxColumns } from '../../utils/calcSize';

function Game() {
  const dispatch = useDispatch();

  const {
    app: { isPl, isSettingsActive, isAnimatePlay },
    game: { ballSize, rows, columns, colors, isPlay },
  } = useSelector((state) => state);

  const { isHintShow, handleHint, hideHint } = useHint(3);

  const handleAnimate = () => {
    handleHint();
    if (isAnimatePlay || isPlay) return;
    dispatch(updateAnimate(true));
  };

  const checkIsDifferent = (r, c, k) =>
    r !== g.rowsInit || c !== g.columnsInit || k !== g.colorsInit;

  const checkScale = () => {
    const { innerWidth, innerHeight } = window;
    if (innerWidth > 1400 || innerHeight > 1400) return 0.7;
    if (innerWidth > 1000 || innerHeight > 1000) return 0.8;
    return 1;
  };

  const initGame = (mode = false) => {
    const scale = checkScale();
    const s = scale === 1 ? 25 : 40;
    const r = calcMaxRows(s, scale);
    const c = calcMaxColumns(s, scale);
    const k = 5;

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
    initGame(isPlay);
    return () => {
      stopSymulate();
      g.columnsInit = 0;
    };
  }, []);

  return (
    <S.Wrapper>
      <Header isHintShow={isHintShow} />
      <Settings initGame={initGame} />
      <Canvas handleAnimate={handleAnimate} />
    </S.Wrapper>
  );
}

export default Game;
