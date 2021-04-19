import { g } from '../assets/jawbreaker/jawbreaker';

export const calcMaxRows = (ballSize, scale = 1) => {
  const margin = Math.floor(ballSize * 0.15);
  const ballSpace = ballSize + margin;
  const maxRows =
    (document.documentElement.clientHeight * scale - margin - g.scoreHeight - 70) / ballSpace;

  return Math.floor(maxRows);
};

export const calcMaxColumns = (ballSize, scale = 1) => {
  const margin = Math.floor(ballSize * 0.15);
  const ballSpace = ballSize + margin;
  const maxColumns = (document.documentElement.clientWidth * scale - margin - 10) / ballSpace;

  return Math.floor(maxColumns);
};
