import styled, { css } from 'styled-components';

const sizeNormal = 4.2;

const calcElement = (boxSize) => {
  const fragmentSize = Math.floor(boxSize * 3.7) / 10;
  const borderWidth = Math.floor(fragmentSize * 1.4) / 10;

  return css`
    width: ${fragmentSize}rem;
    height: ${fragmentSize}rem;
    border-left: ${borderWidth}rem solid ${({ theme }) => theme.colors.black};
    border-top: ${borderWidth}rem solid ${({ theme }) => theme.colors.black};
  `;
};

export const Button = styled.button`
  position: relative;
  background: transparent;
  cursor: pointer;
  outline: none;
  border: none;
  width: ${sizeNormal}rem;
  height: ${sizeNormal}rem;

  :hover,
  :focus-visible {
    transform: scale(0.9);
  }
`;

export const Fragment = styled.div`
  position: absolute;
  ${calcElement(sizeNormal)}

  transition: transform 0.5s ease-in-out;
  transition-delay: 0.2s;
  ${({ index }) => (index < 2 ? 'top: 0;' : 'bottom: 0;')};
  ${({ index }) => (index % 3 ? 'right: 0;' : 'left: 0;')};
  ${({ index }) => `transform: rotate(${index * 90}deg)`};
  ${({ full, index }) =>
    full && `transform: rotate(${index * 90 + (index % 2 ? 1 : -1) * 180}deg)`};
`;
