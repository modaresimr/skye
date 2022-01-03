import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';
import { centerIcon } from '~/renderer/mixins';

export const Control = css`
  height: 42px;
  position: relative;
  border: none;
  outline: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-size: 12px;

  ${({ theme }) => css`
    background-color: ${theme.control.background};
    color: ${theme.control.value};
  `}
`;

export const Input = styled.input.attrs(() => ({
  spellCheck: false,
}))`
  ${Control};
`;

export const Dropdown = styled.div`
  ${Control}

  &:after {
    content: '';
    position: absolute;
    right: 4px;
    height: 20px;
    width: 20px;
    ${centerIcon()};

    ${({ dark }: { dark: boolean }) => css`
      filter: ${dark ? 'invert(100%)' : 'none'};
    `}
  }
`;
