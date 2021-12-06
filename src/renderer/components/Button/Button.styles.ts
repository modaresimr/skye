import styled, { css } from 'styled-components';
import { ITheme } from '~/interfaces';

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  success?: boolean;
  warning?: boolean;
  dark?: boolean;
  light?: boolean;
  background?: string;
  foreground?: string;
  type?: 'contained' | 'outlined';
  theme: ITheme;
}

export const StyledButton = styled.div<ButtonProps>`
  min-width: 80px;
  width: fit-content;
  height: 47px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  font-family: Inter;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  font-size: 1.8rem;
  text-align: center;
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0;
    position: absolute;
    will-change: opacity;
    transition: 0.2s opacity;
  }

  ${({ background, foreground, type, theme }) => css`
    color: ${foreground || theme.button.primary.text};
    border: ${type === 'outlined'
      ? `1px solid ${background || theme.button.primary.background}`
      : 'unset'};
    background-color: ${type === 'outlined'
      ? 'transparent'
      : background || theme.button.primary.background};

    &::before {
      background-color: ${foreground || theme.button.primary.text};
    }
  `};

  ${({ primary, secondary, light, dark, danger, warning, success, theme }) => {
    if (primary)
      return css`
        background-color: ${theme.button.primary.background};
        color: ${theme.button.primary.text};
      `;
    else if (secondary)
      return css`
        background-color: ${theme.button.secondary.background};
        color: ${theme.button.secondary.text};
      `;
    else if (light)
      return css`
        background-color: ${theme.button.light.background};
        color: ${theme.button.light.text};
      `;
    else if (dark)
      return css`
        background-color: ${theme.button.dark.background};
        color: ${theme.button.dark.text};
      `;
    else if (danger)
      return css`
        background-color: ${theme.button.danger.background};
        color: ${theme.button.danger.text};
      `;
    else if (warning)
      return css`
        background-color: ${theme.button.warning.background};
        color: ${theme.button.warning.text};
      `;
    else if (success)
      return css`
        background-color: ${theme.button.success.background};
        color: ${theme.button.success.text};
      `;
    else return css``;
  }}
`;

export const StyledLabel = styled.div`
  z-index: 1;
  font-size: 0.9rem;
  pointer-events: none;
`;
