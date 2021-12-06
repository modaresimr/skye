import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';
import { transparency } from '~/renderer/constants';

interface NavigationDrawerItemProps {
  theme?: ITheme;
  global?: boolean;
  selected?: boolean;
}
export const StyledNavigationDrawerItem = styled.div<NavigationDrawerItemProps>`
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 6px;
  padding-bottom: 6px;
  cursor: pointer;
  ${({ theme, global, selected }) => css`
    ${selected && {
      fontWeight: 700,
    }}

    ${global && {
      fontSize: 18,
    }}
    padding-left: ${global ? '0' : '10px'};
    padding-right: ${global ? '0' : '10px'};
    justify-content: ${global ? 'center' : 'left'};
  `};
`;

export const Icon = styled.div`
  height: 24px;
  opacity: ${transparency.icons.inactive};
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${centerIcon(20)};
`;
