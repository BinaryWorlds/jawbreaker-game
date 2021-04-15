import styled, { keyframes, css } from 'styled-components';

const pulse = keyframes`
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {   
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 0;
    }
}`;

const pulseEffect = css`
  animation: ${pulse} 1.5s ease-out;
`;

export const Button = styled.button`
  z-index: 2;
  position: relative;
  background: transparent;
  cursor: pointer;
  outline: none;
  border: 0;
  display: flex;
  align-items: center;
  width: 12rem;
  font-size: ${({ theme }) => theme.fonts.size.s};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};

  :hover,
  :focus-visible {
    .playIcon:before {
      ${pulseEffect};
    }
  }
`;

export const Icon = styled.div`
  margin-right: 1rem;
  border-radius: 50%;
  width: 4.2rem;
  height: 4.2rem;
  border: 2.1rem solid ${({ theme }) => theme.colors.blueStrong};
  position: relative;

  :before,
  :after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
  }

  :before {
    width: 100%;
    height: 100%;
    z-index: -1;
    border: 2.1rem solid ${({ theme }) => theme.colors.blueStrong};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    ${({ animate }) => animate && pulseEffect}
  }

  :after {
    width: 1rem;
    height: 1rem;
    border-left: 18px solid ${({ theme }) => theme.colors.white};
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    transform: translate(-33%, -50%);
  }
`;
