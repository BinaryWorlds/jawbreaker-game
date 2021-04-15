import { keyframes, css } from 'styled-components';

const shake = (scale) => keyframes`
  10%, 90% {
    transform: scale(${scale}) translate3d(-1px, 0, 0);
  }    
  20%, 80% {
    transform: scale(${scale}) translate3d(2px, 0, 0);
  }  
  30%, 50%, 70% {
    transform: scale(${scale}) translate3d(-4px, 0, 0);
  }  
  40%, 60% {
    transform: scale(${scale}) translate3d(4px, 0, 0);
  }
`;

const shakeEffect = (scale = 1) => css`
  animation: ${shake(scale)} 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
`;

export default shakeEffect;
