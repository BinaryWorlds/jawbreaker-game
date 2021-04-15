import React from 'react';
import { useDispatch } from 'react-redux';
import * as S from './RangeSlider.style';

function RangeInput({ min, max, value, setValue, name }) {
  const dispatch = useDispatch();
  return (
    <S.Wrapper>
      <S.Output>
        {name} {value}
      </S.Output>
      <S.Input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => dispatch(setValue(+e.target.value))}
      />
    </S.Wrapper>
  );
}

export default RangeInput;
