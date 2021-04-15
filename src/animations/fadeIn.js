import { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}`;

const fadeInEffect = css`
  animation: ${fadeIn} 0.5s ease-out;
`;

export default fadeInEffect;
