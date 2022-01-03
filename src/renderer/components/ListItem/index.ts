import styled, { css } from 'styled-components';
import { ITheme } from '~/interfaces';

interface ListItemProps {
  selected: boolean;
  theme?: ITheme;
}
export const ListItem = styled.div<ListItemProps>`
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 48px;
  overflow: hidden;
  ${({ selected, theme }) => css`
    background-color: ${
      selected
        ? theme.dark
          ? 'rgba(255, 255, 255, 0.12)'
          : 'rgba(0, 0, 0, 0.08)'
        : 'transparent'
    };
      color: ${theme.dark ? '#fff' : '#000'};
    &:hover {
      background-color: ${
        theme.dark
          ? `rgba(255, 255, 255, ${selected ? 0.12 : 0.08})`
          : `rgba(0, 0, 0, ${selected ? 0.08 : 0.04})`
      };
    }
  `};
`;
