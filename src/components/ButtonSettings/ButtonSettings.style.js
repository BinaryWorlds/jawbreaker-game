import styled from 'styled-components';

export const Button = styled.button`
  background: transparent;
  cursor: pointer;
  outline: none;
  border: none;
  background: ${({ theme }) => theme.colors.blue};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  padding: 1rem;

  font-size: ${({ theme }) => theme.fonts.size.s};
  color: white;
  :hover,
  :focus-visible {
    transform: scale(0.9);
  }
`;
