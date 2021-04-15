import React, { useEffect, useRef } from 'react';
import { g } from '../../assets/jawbreaker/jawbreaker';
import * as S from './Canvas.style';

function CanvasArea({ handleAnimate }) {
  const canvasRef = useRef();

  useEffect(() => {
    g.canvas = canvasRef.current;
    g.ctx = g.canvas.getContext('2d');
  }, []);

  return <S.Canvas ref={canvasRef} onClick={handleAnimate} />;
}

export default CanvasArea;
