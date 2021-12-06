import styled, { css } from 'styled-components';
import { ITheme } from '~/interfaces';
import { centerIcon } from '~/renderer/mixins';
import { ICON_ARROW_RIGHT } from '~/renderer/constants/icons';

export const Line = styled.div`
  height: 1px;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;

  ${({ theme }) => css`
    background-color: ${theme.dialog.seperator};
  `};
`;

export const MenuItem = styled.div<{
  arrow?: boolean;
  disabled?: boolean;
}>`
  height: 36px;
  align-items: center;
  display: flex;
  position: relative;
  padding: 0 12px;
  font-size: 12px;
  border-radius: 4px;

  ${({ arrow }) =>
    arrow &&
    css`
      &:after {
        content: '';
        position: absolute;
        right: 4px;
        width: 24px;
        height: 100%;
        opacity: 0.54;
        ${centerIcon(20)};
        ${({ theme }: { theme?: ITheme }) => css`
          filter: ${'none'};
        `};
      }
    `};

  ${({ disabled }) =>
    css`
      pointer-events: ${disabled ? 'none' : 'inherit'};
      opacity: ${disabled ? 0.54 : 1};
    `};

  &:hover {
    ${({ theme }) => css`
      background-color: rgba(0, 0, 0, 0.03);
    `};
  }
`;

export const MenuItemTitle = styled.div`
  flex: 1;
`;

export const MenuItems = styled.div`
  flex: 1;
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
  ${({ theme }: { theme?: ITheme }) => css`
    background-color: ${theme.dialog.background};
    color: ${theme.dialog.text};
  `};
`;

export const Content = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
`;

export const Icon = styled.div`
  margin-right: 12px;
  width: 20px;
  height: 20px;
  ${centerIcon()};
  opacity: 0.8;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
`;

export const RightControl = styled.div`
  margin-right: 18px;
`;

export const Shortcut = styled(RightControl)`
  opacity: 0.54;
`;
