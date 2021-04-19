import styled from 'styled-components';

export const Canvas = styled.canvas`
  z-index: 1;
  touch-action: manipulation;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2));
  image-rendering: optimizeQuality;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;
`;
