import styled from 'styled-components';

import { visibleIn, visibleOut } from '../../animations/visible';

export const Settings = styled.div`
  z-index: 201;
  position: absolute;
  top: 10rem;
  right: 2rem;
  width: 30rem;
  padding-bottom: 3rem;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ isActive }) => (isActive ? visibleIn : visibleOut)}
`;

export const Button = styled.button`
  cursor: pointer;
  outline: none;
  border: 0;
  width: 10rem;
  height: 4rem;
  font-size: ${({ theme }) => theme.fonts.size.s};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};

  color: white;
  background: ${({ theme }) => theme.colors.blueStrong};
`;
