import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSettings } from '../../store/app/actions';

import * as S from './ButtonSettings.style';

function ButtonSettings({ className }) {
  const dispatch = useDispatch();
  const { isSettingsActive } = useSelector((state) => state.app);
  const onClick = () => dispatch(toggleSettings());

  return (
    <S.Button
      className={className}
      aria-label="Settings"
      onClick={onClick}
      isActive={isSettingsActive}>
      <S.Line up isActive={isSettingsActive} start="1" className="lineOne" />
      <S.Line center isActive={isSettingsActive} start="3" className="lineTwo" />
      <S.Line down isActive={isSettingsActive} start="2" className="lineThree" />
    </S.Button>
  );
}

export default ButtonSettings;
