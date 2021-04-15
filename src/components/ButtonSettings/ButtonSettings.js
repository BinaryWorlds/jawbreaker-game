import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleSettings } from '../../store/app/actions';

import * as S from './ButtonSettings.style';

function ButtonSettings({ className, children }) {
  const dispatch = useDispatch();

  const onClick = () => dispatch(toggleSettings());

  return (
    <S.Button className={className} aria-label="Settings" onClick={onClick}>
      {children}
    </S.Button>
  );
}

export default ButtonSettings;
