import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
  width: 90%;
`;

const thumb = css`
  cursor: pointer;
  -webkit-appearance: none;
  width: 2rem;
  height: 2rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.text};
  box-shadow: 0.2rem 0.2rem 0.2rem ${({ theme }) => theme.colors.text},
    0rem 0rem 0.1rem ${({ theme }) => theme.colors.text};
  border-radius: 100%;
  background: ${({ theme }) => theme.colors.pink};
`;

const track = css`
  height: 0.8rem;
  cursor: pointer;
  width: 100%;
  border: 0.1rem solid ${({ theme }) => theme.colors.text};
  border-radius: 1rem;
  background: white;
`;

export const Input = styled.input`
  -webkit-appearance: none;
  background: transparent;
  width: 100%;
  height: 3rem;
  margin: 1.8rem 0;

  :focus {
    outline: none;
  }

  ::-webkit-slider-thumb {
    margin-top: -0.8rem;
    ${thumb};
  }

  ::-moz-range-thumb {
    ${thumb};
  }

  ::-ms-thumb {
    ${thumb};
    width: 1rem;
    height: 1rem;
  }

  ::-webkit-slider-runnable-track {
    ${track};
  }

  ::-moz-range-track {
    ${track};
  }

  ::-ms-fill-lower {
    ${track};
  }

  ::-ms-fill-upper {
    ${track};
  }

  ::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
`;

export const Output = styled.output`
  position: relative;
  top: 2rem;
  left: 0;
  font-size: ${({ theme }) => theme.fonts.size.s};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};

  color: rgb(223, 120, 120);
  background: rgba(255, 255, 255, 0.65);
`;
