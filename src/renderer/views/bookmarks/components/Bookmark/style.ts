import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';
import { ICON_MORE } from '~/renderer/constants/icons';

export const More = styled.div`
  ${centerIcon(20)};
  height: 24px;
  width: 24px;
  cursor: pointer;
  opacity: 0.54;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 1;
  }
`;

export const Favicon = styled.div`
  ${centerIcon()};
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  margin-right: 24px;
`;

export const Title = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 16px;

  ${({ theme }) => css`
    color: ${theme.dialog.text};
  `}
`;

export const Site = styled.div`
  flex: 1;
  opacity: 0.54;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
