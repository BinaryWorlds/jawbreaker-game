import { css } from 'styled-components';

export const visibleIn = css`
  visibility: visible;
  opacity: 1;
  transition: visibility 0s linear 0s, opacity 500ms;
`;

export const visibleOut = css`
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 500ms, opacity 500ms;
`;
