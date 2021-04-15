import styled from 'styled-components';
import shakeEffect from '../../animations/shakeEffect';

export const Button = styled.button`
  z-index: 2;
  position: relative;
  background: transparent;
  cursor: pointer;
  outline: none;
  border: 0;

  font-size: ${({ theme }) => theme.fonts.size.s};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-right: 3rem;

  :before {
    transform-origin: top left;
    content: '';
    z-index: -1;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 40%;
    left: 33%;
    background: ${({ theme }) => theme.colors.blue};
    transition: all 0.4s;
  }

  ${({ theme }) => theme.mq.huge} {
    font-size: ${({ theme }) => theme.fonts.size.l};
  }

  :hover:before,
  :focus-visible:before {
    transform: scale(0.5) translate(-6rem, -4rem);
  }

  ${({ animate }) => animate && shakeEffect(1)};
`;
