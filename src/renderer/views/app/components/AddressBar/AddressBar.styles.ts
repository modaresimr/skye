import { platform } from 'os';
import styled, { css } from 'styled-components';
import { ITheme } from '~/interfaces';
import { contrast } from '~/utils/colors';

interface AddressBarProps {
  theme: ITheme;
  focus: boolean;
  color?: string;
}

export const StyledAddressBar = styled.div<AddressBarProps>`
  height: 30px;
  // flex: 1;
  border-radius: 8px;
  margin: 0 7px;
  display: flex;
  align-items: center;
  // position: relative;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
  font-size: 15px;
  overflow: hidden;
  // left: ${platform() !== 'darwin' ? '34px' : '-64px'};
  position: absolute;
  left: 0;
  right: 0;
  -webkit-app-region: no-drag;
  ${({ color, theme }) => {
    if (color && color !== '') {
      const cc = contrast(color);
      switch (cc) {
        case 'dark':
          return css`
            background-color: rgb(255, 255, 255, 0.2);
            input::placeholder {
              color: rgb(255, 255, 255, 0.3);
            }
          `;
        case 'light': {
          return css`
            background-color: rgb(0, 0, 0, 0.06);
          `;
        }
      }
    }
    return css`
      color: ${theme.addressbar.text};
      background-color: ${theme.addressbar.background};
    `;
  }}

  ${({ theme, focus, color }) => css`
    border: 1px solid
      ${theme.isCompact
        ? theme.dark
          ? 'rgba(255, 255, 255, 0.12)'
          : 'transparent'
        : focus
        ? `rgba(255, 255, 255, 0.5) !important`
        : 'transparent'};

    ${!theme.isCompact &&
    css`
      &:hover {
        border: ${theme.dark
          ? '1px solid rgba(255, 255, 255, 0.12)'
          : '1px solid rgba(0, 0, 0, 0.12)'};
      }
    `}
  `};

  transition: background-color 0.4s, color 0.4s;
  transition-timing-function: ease-out;
`;

export const InputContainer = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  margin-left: 2px;
  overflow: hidden;
`;

interface TextProps {
  visible: boolean;
  theme: ITheme;
}

export const Text = styled.div<TextProps>`
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translateY(calc(-50%));
  flex: 1;
  color: inherit;
  margin-top: -1px;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  ${({ visible }) => css`
    display: ${visible ? 'flex' : 'none'};
  `};
`;

interface InputProps {
  visible: boolean;
  theme: ITheme;
}

export const Input = styled.input<InputProps>`
  outline: none;
  min-width: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  color: black;
  font-family: inherit;
  word-spacing: inherit;
  font-size: 14px;

  ${({ visible, theme }) => css`
    color: ${visible ? 'inherit' : 'transparent'};

    &::placeholder {
      color: inherit;
    }

    ${theme.dark &&
    css`
      ::selection {
        background: rgba(145, 185, 230, 0.99);
        color: black;
        height: 100px;
      }
    `}
  `};
`;
