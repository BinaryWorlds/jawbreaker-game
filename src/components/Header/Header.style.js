import styled from 'styled-components';
import Button from '../ButtonSettings/ButtonSettings';
import { BasicHint } from '../../hooks/useHint';

export const Section = styled.div`
  z-index: 201;
  position: absolute;
  top: 1rem;
  right: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 5rem;
  button {
    margin-left: 3rem;
  }
  button:first-child {
    margin: 0;
  }
`;

export const ButtonSettings = styled(Button)``;

export const Hint = styled(BasicHint)`
  bottom: -100%;
  left: 0;
`;
