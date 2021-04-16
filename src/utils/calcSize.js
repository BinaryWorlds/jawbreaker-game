import { g } from '../assets/jawbreaker/jawbreaker';

export const calcMaxRows = (ballSize, scale = 1) => {
  const margin = ballSize * 0.15;
  const ballSpace = ballSize * 1.15;
  const maxRows = (window.innerHeight * scale - margin - g.scoreHeight) / ballSpace;

  return Math.floor(maxRows);
};

export const calcMaxColumns = (ballSize, scale = 1) => {
  const margin = ballSize * 0.15;
  const ballSpace = ballSize * 1.15;
  const maxColumns = (window.innerWidth * scale - margin) / ballSpace;

  return Math.floor(maxColumns);
};
