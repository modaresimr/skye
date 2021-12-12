import styled, { css } from 'styled-components';

import { transparency, ICON_SEARCH } from '~/renderer/constants';
import { ITheme } from '~/interfaces';
import { centerIcon, noButtons } from '~/renderer/mixins';

interface NavigationDrawerProps {
  theme?: ITheme;
  dense?: boolean;
}

export const StyledNavigationDrawer = styled.div<NavigationDrawerProps>`
  left: 0;
  display: flex;
  flex-flow: column;
  transition: 0.2s width;

  ${({ theme, dense }) => css`
    width: ${dense ? 56 : 220}px;

    background-color: ${theme.backgroundColor};
  `}
`;

export const MenuItems = styled.div<{
  global?: boolean;
}>`
  display: flex;
  flex-flow: column;
  flex: 1;
  margin-top: 10px;
  padding-bottom: 24px;
  overflow: hidden auto;
  ${noButtons('6px', 'rgba(0, 0, 0, 0.04)', 'rgba(0, 0, 0, 0.12)')};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
  }
`;

export const Title = styled.div`
  font-size: 24px;
  margin-top: 10px;
  font-weight: 900;
`;

interface InputProps {
  theme?: ITheme;
}

export const Input = styled.input<InputProps>`
  border: none;
  outline: none;

  width: 100%;
  padding-left: 14px;
  background-color: transparent;
  height: 100%;
  font-size: 14px;

  ${({ theme }) => css`
    color: ${theme.dark ? 'white' : `rgba(0, 0, 0, ${transparency.text.high})`};
    border-radius: 8px;
    background-color: ${theme.pages.navigationDrawer2.searchBar.background};
    &::placeholder {
      color: ${theme.dark
        ? 'rgba(255, 255, 255, 0.54)'
        : `rgba(0, 0, 0, ${transparency.text.medium})`};
    }
  `}
`;

interface SearchProps {
  theme?: ITheme;
}

export const Search = styled.div<SearchProps>`
  margin-top: 10px;
  height: 42px;
  border-radius: 8px;

  position: relative;

  ${({ theme }) => css`
    background-color: ${theme.dark
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(0, 0, 0, 0.04)'};
  `}

  &:after {
    content: '';
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    ${centerIcon(16)};

    ${({ theme }) => css`
      filter: ${theme.dark ? 'invert(100%)' : 'none'};
    `}
  }
`;
