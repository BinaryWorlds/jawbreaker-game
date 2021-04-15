import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateRows,
  updateColumns,
  updateColors,
  updateBallSize,
  updateAllParams,
} from '../../store/game/actions';

import * as S from './Settings.style';
import RangeSlider from '../RangeSlider/RangeSlider';

import { g } from '../../assets/jawbreaker/jawbreaker';

function Settings({ gameSize, getParams }) {
  const dispatch = useDispatch();
  const {
    app: { isPl, isSettingsActive },
    game: { ballSize, rows, columns, colors },
  } = useSelector((state) => state);

  const calcMaxBallSize = () => {
    const { innerWidth, innerHeight } = window;
    const margin = ballSize * 0.15;
    const maxSizeColumn = (innerWidth - margin) / (columns * 1.15);
    const maxSizeRows = (innerHeight - margin - g.scoreHeight) / (rows * 1.15);

    const maxSize = maxSizeColumn < maxSizeRows ? maxSizeColumn : maxSizeRows;
    return Math.floor(maxSize);
  };

  const calcMaxRows = () => {
    const margin = ballSize * 0.15;
    const ballSpace = ballSize * 1.15;
    const maxRows = (window.innerHeight - margin - g.scoreHeight) / ballSpace;

    return Math.floor(maxRows);
  };

  const calcMaxColumns = () => {
    const margin = ballSize * 0.15;
    const ballSpace = ballSize * 1.15;
    const maxColumns = (window.innerWidth - margin) / ballSpace;

    return Math.floor(maxColumns);
  };

  const fillScreen = () => {
    const r = calcMaxRows();
    const c = calcMaxColumns();
    dispatch(updateRows(r));
    dispatch(updateColumns(c));
  };

  const resetSettings = () => {
    const [r, c, k, s] = getParams(gameSize);
    dispatch(updateAllParams(r, c, k, s));
  };

  return (
    <S.Settings isActive={isSettingsActive}>
      <RangeSlider
        name={isPl ? 'Rozmiar: ' : 'Size: '}
        value={ballSize}
        setValue={updateBallSize}
        min={40}
        max={calcMaxBallSize()}
      />
      <S.Button onClick={fillScreen}>{isPl ? 'Wypełnij' : 'Fill'}</S.Button>
      <RangeSlider
        name={isPl ? 'Rzędy: ' : 'Rows: '}
        value={rows}
        setValue={updateRows}
        min={8}
        max={calcMaxRows()}
      />
      <RangeSlider
        name={isPl ? 'Kolumny: ' : 'Columns: '}
        value={columns}
        setValue={updateColumns}
        min={8}
        max={calcMaxColumns()}
      />
      <RangeSlider
        name={isPl ? 'Kolory: ' : 'Colors: '}
        value={colors}
        setValue={updateColors}
        min={1}
        max={5}
      />
      <S.Button onClick={resetSettings}>Reset</S.Button>
    </S.Settings>
  );
}

export default Settings;
