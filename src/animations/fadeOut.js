import { keyframes, css } from 'styled-components';

const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}`;

const fadeOutEffect = css`
  animation: ${fadeOut} 0.5s ease-in;
`;

export default fadeOutEffect;
