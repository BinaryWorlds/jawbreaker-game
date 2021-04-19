import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header/Header';
import Canvas from '../Canvas/Canvas';
import Settings from '../Settings/Settings';
import useHint from '../../hooks/useHint';
import { updateAllParams, updateBallSize } from '../../store/game/actions';
import { updateAnimate } from '../../store/app/actions';
import * as S from './Game.style';

import {
  changeLang,
  newGame,
  startSymulate,
  stopSymulate,
  updateBallSize as updateBallSizeInGame,
  g,
} from '../../assets/jawbreaker/jawbreaker';
import { calcMaxRows, calcMaxColumns } from '../../utils/calcSize';

function Game() {
  const dispatch = useDispatch();

  const {
    app: { isPl, isSettingsActive, isAnimatePlay },
    game: { ballSize, rows, columns, colors, isPlay },
  } = useSelector((state) => state);

  const isPlayRef = useRef(false);

  const { isHintShow, handleHint, hideHint } = useHint(3);

  const handleAnimate = () => {
    handleHint();
    if (isAnimatePlay || isPlay) return;
    dispatch(updateAnimate(true));
  };

  const checkIsDifferent = (r, c, k) =>
    r !== g.rowsInit || c !== g.columnsInit || k !== g.colorsInit;

  const checkScale = () => {
    const { clientWidth, clientHeight } = document.documentElement;
    if (clientWidth > 2000 || clientHeight > 2000) return 0.6;
    if (clientWidth > 1000 || clientHeight > 1000) return 0.8;
    return 1;
  };

  const checkGameSize = () => {
    const scale = checkScale();
    const s = scale === 1 ? 25 : 40;
    const r = calcMaxRows(s, scale);
    const c = calcMaxColumns(s, scale);
    const k = 5;
    return { r, c, k, s };
  };

  const initGame = () => {
    const { r, c, k, s } = checkGameSize();
    const check = checkIsDifferent(r, c, k);
    if (!check) {
      if (ballSize !== s) dispatch(updateBallSize(s));
      updateBallSizeInGame(s);
      return;
    }
    stopSymulate();
    newGame(r, c, k, s);
    dispatch(updateAllParams(r, c, k, s));
    if (!isPlayRef.current) startSymulate();
  };

  const shouldResize = () => {
    const { r, c, s } = checkGameSize();

    const diffTreshold = 5;

    if (
      g.ballSize !== s ||
      r < g.rowsInit ||
      c < g.columnsInit ||
      r > g.rowsInit + diffTreshold ||
      c > g.columnsInit + diffTreshold
    )
      initGame();
  };

  useEffect(() => {
    isPlayRef.current = isPlay;
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
    updateBallSizeInGame(ballSize);
  }, [ballSize]);

  useEffect(() => {
    window.addEventListener('resize', shouldResize);
    initGame(isPlay);
    return () => {
      window.removeEventListener('resize', shouldResize);
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
