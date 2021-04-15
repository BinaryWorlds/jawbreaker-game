import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGameMode } from '../../store/game/actions';
import * as S from './ButtonPlay.style';

import { stopSymulate, resetGame } from '../../assets/jawbreaker/jawbreaker';
import { updateAnimate } from '../../store/app/actions';

function ButtonPlay({ className }) {
  const dispatch = useDispatch();
  const {
    app: { isPl, isAnimatePlay },
    game: { isPlay },
  } = useSelector((state) => state);

  const onPlayClick = () => {
    if (isPlay === false) stopSymulate();
    resetGame();
    dispatch(updateGameMode(true));
  };

  const onAnimationEnd = () => dispatch(updateAnimate(false));

  const playTxt = isPl ? 'Zagraj!' : 'Play!';

  return (
    <S.Button className={className} aria-label="FullScreen" onClick={onPlayClick}>
      <S.Icon animate={isAnimatePlay} onAnimationEnd={onAnimationEnd} className="playIcon" />
      {isPlay ? 'Reset!' : playTxt}
    </S.Button>
  );
}

export default ButtonPlay;
