import styled from 'styled-components';

export const Canvas = styled.canvas`
  z-index: 1;
  touch-action: manipulation;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2));
  image-rendering: optimizespeed;

  transition: transform 0.5s ease-in-out;
`;
