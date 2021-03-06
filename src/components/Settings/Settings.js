import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRows, updateColumns, updateColors, updateBallSize } from '../../store/game/actions';

import * as S from './Settings.style';
import RangeSlider from '../RangeSlider/RangeSlider';

import { g } from '../../assets/jawbreaker/jawbreaker';
import { calcMaxRows, calcMaxColumns } from '../../utils/calcSize';

function Settings({ initGame }) {
  const dispatch = useDispatch();
  const {
    app: { isPl, isSettingsActive },
    game: { ballSize, rows, columns, colors, isPlay },
  } = useSelector((state) => state);

  const calcMaxBallSize = () => {
    if (!columns || !rows) return 0;
    const { clientWidth, clientHeight } = document.documentElement;

    const spaceColumn = (clientWidth - 10) / columns;
    const spaceRows = (clientHeight - g.scoreHeight - 70) / rows;

    let maxSize = spaceColumn < spaceRows ? spaceColumn : spaceRows;
    maxSize -= Math.floor(maxSize * 0.15);

    if (maxSize > 60) return 60;
    return Math.floor(maxSize);
  };

  const fillScreen = () => {
    const r = calcMaxRows(ballSize);
    const c = calcMaxColumns(ballSize);
    dispatch(updateRows(r));
    dispatch(updateColumns(c));
  };

  return (
    <S.Settings isActive={isSettingsActive}>
      <RangeSlider
        name={isPl ? 'Rozmiar: ' : 'Size: '}
        value={ballSize}
        setValue={updateBallSize}
        min={25}
        max={calcMaxBallSize()}
      />
      <S.Button onClick={fillScreen}>{isPl ? 'Wypełnij' : 'Fill'}</S.Button>
      <RangeSlider
        name={isPl ? 'Rzędy: ' : 'Rows: '}
        value={rows}
        setValue={updateRows}
        min={7}
        max={calcMaxRows(ballSize)}
      />
      <RangeSlider
        name={isPl ? 'Kolumny: ' : 'Columns: '}
        value={columns}
        setValue={updateColumns}
        min={7}
        max={calcMaxColumns(ballSize)}
      />
      <RangeSlider
        name={isPl ? 'Kolory: ' : 'Colors: '}
        value={colors}
        setValue={updateColors}
        min={1}
        max={5}
      />
      <S.Button onClick={() => initGame(isPlay)}>Reset</S.Button>
    </S.Settings>
  );
}

export default Settings;
