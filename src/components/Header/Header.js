import React from 'react';
import { useSelector } from 'react-redux';

import ButtonFullScreen from '../ButtonFullScreen/ButtonFullScreen';
import ButtonPlay from '../ButtonPlay/ButtonPlay';
import * as S from './Header.style';

function Header({ isHintShow }) {
  const {
    app: { isPl },
  } = useSelector((state) => state);

  return (
    <S.Section>
      <ButtonPlay />
      <S.ButtonSettings>{isPl ? 'Ustawienia' : 'Settings'}</S.ButtonSettings>
      <ButtonFullScreen />
      <S.Hint isHintShow={isHintShow}>{isPl ? 'Kliknij Zagraj' : 'Click Play'}</S.Hint>
    </S.Section>
  );
}

export default Header;
