import styled from 'styled-components';
import Button from '../ButtonSettings/ButtonSettings';
import { BasicHint } from '../../hooks/useHint';

export const Section = styled.div`
  z-index: 201;
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 30rem;
`;

export const ButtonSettings = styled(Button)``;

export const Hint = styled(BasicHint)`
  bottom: -100%;
  left: 0;
`;
