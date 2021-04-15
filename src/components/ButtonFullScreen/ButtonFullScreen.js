import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFullScreen } from '../../store/app/actions';
import * as S from './ButtonFullScreen.style';
import { openFullScreen, closeFullScreen } from '../../utils/fullScreen';

function ButtonFullScreen({ className }) {
  const dispatch = useDispatch();
  const { isFullScreen } = useSelector((state) => state.app);

  const onClick = () => {
    dispatch(toggleFullScreen());
    if (isFullScreen) {
      // initGame(gameSize, gameMode);
      closeFullScreen();
    } else openFullScreen();
  };

  const fragments = ['fr1', 'fr2', 'fr3', 'fr4'].map((el, index) => (
    <S.Fragment key={el} index={index} full={isFullScreen} />
  ));

  return (
    <S.Button className={className} onClick={onClick} aria-label="FullScreen">
      {fragments}
    </S.Button>
  );
}

export default ButtonFullScreen;
