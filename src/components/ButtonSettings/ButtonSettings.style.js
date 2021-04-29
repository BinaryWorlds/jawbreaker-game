import styled, { css } from 'styled-components';

export const Button = styled.button`
  background: transparent;
  cursor: pointer;
  outline: none;
  border: none;
`;

export const Inner = styled.div`
  width: 6rem;
  height: 4.2rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s;

  ${({ isActive }) =>
    isActive &&
    css`
      transform: scale(0.9);
    `};
`;

export const Line = styled.div`
  width: 100%;
  height: 0.2rem;
  background: ${({ theme }) => theme.colors.black};
  position: relative;
  z-index: -1;
  transform-origin: center;
  transition: all 0.2s linear;

  ${({ up, isActive }) =>
    isActive &&
    up &&
    css`
      transform: translateY(1.5rem) rotate(45deg);
    `};

  ${({ down, isActive }) =>
    isActive &&
    down &&
    css`
      transform: translateY(-1.5rem) rotate(-45deg);
    `};

  ${({ center, isActive }) =>
    isActive &&
    center &&
    css`
      opacity: 0;
    `};

  :before,
  :after {
    top: 0.1rem;
    left: 0;
    position: absolute;
    content: '';
    opacity: ${({ isActive }) => (isActive ? 0 : 1)};
    background-color: white;
    height: 0.8rem;
    transition: all 0.2s linear;
    transform: translate(${({ start }) => `${start}rem, -50%`});
  }

  :before {
    width: 1.2rem;
  }

  :after {
    border: 0.2rem solid ${({ theme }) => theme.colors.black};
    border-radius: 50%;
    width: 0.8rem;
  }

  ${Button}:hover && {
    :before,
    :after {
      transform: translate(${({ end }) => `${end}rem, -50%`});
    }
  }
`;
