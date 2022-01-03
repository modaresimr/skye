import styled, { css } from 'styled-components';

import { transparency } from '~/renderer/constants';
import { centerIcon } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';

interface DropdownProps {
  theme: ITheme;
}

export const StyledDropdown = styled.div<DropdownProps>`
  width: 100%;
  button {
    padding: 0.9rem;
    min-width: 200px;
    position: relative;
    border-radius: 8px;
    user-select: none;
    cursor: pointer;
    width: 100%;
    border: 0;
    display: flex;
    align-items: center;

    ${({ theme }) => css`
      background-color: ${theme.control.background};

      &:hover {
        background-color: ${theme.control.hover.background};
      }
    `}
  }
`;

interface LabelProps {
  theme: ITheme;
}

export const Label = styled.div<LabelProps>`
  font-size: 13px;
  margin-left: 8px;
  pointer-events: none;

  ${({ theme }) => css`
    color: ${theme.control.value};
  `}
`;

interface DropIconProps {
  expanded: boolean;
  theme?: ITheme;
}

export const DropIcon = styled.div<DropIconProps>`
  width: 24px;
  height: 24px;
  margin-left: auto;
  margin-right: 2px;
  opacity: ${transparency.icons.inactive};
  transition: 0.2s ${({ theme }) => theme.easingFunction} transform;
  ${centerIcon(24)};

  ${({ expanded, theme }) => css`
    transform: ${expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    filter: ${!theme.dark ? 'invert(100%)' : 'unset'};
  `}
`;
