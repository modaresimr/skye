import styled, { css } from 'styled-components';

import { body2, centerIcon, interMedium } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';

export const Style = css`
  body {
    user-select: none;
    cursor: default;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    ${body2()}
    ${({ theme }) => css`
      background-color: ${theme.pages.background};
      color: ${theme.pages.text};
    `};
  }

  * {
    box-sizing: border-box;
  }
`;

export const Title = styled.div`
  font-size: 14px;
  ${interMedium()};
`;

export const Header = styled.div`
  margin-top: 4px;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 900;
  display: flex;
  align-items: center;
`;

interface RowProps {
  theme?: ITheme;
}

export const Row = styled.div<RowProps>`
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 70px;

  cursor: pointer;
  &:last-of-type {
    border: none;
  }

  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.control.border};
  `}
`;

export const Control = styled.div`
  margin-left: auto;
`;

export const SecondaryText = styled.div`
  opacity: 0.54;
  font-weight: 400;
  margin-top: 4px;
  font-size: 12px;
`;
interface IconButtonProps {
  theme?: ITheme;
}

export const IconButton = styled.div<IconButtonProps>`
  border-radius: 4px;
  cursor: pointer;
  width: 38px;
  height: 38px;
  ${centerIcon(24)};
  opacity: 0.7;

  svg {
    margin-right: 10px;
  }

  ${({ theme }) => css`
    color: #323232;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  `}
`;

export const Back = styled(IconButton)`
  position: absolute;
  left: -48px;
`;

export const StyledSettings = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  width: 900ex;
  margin-left: auto;
  padding: 200px;
  margin-right: auto;
  margin-top: 200px;
`;

export const StyledSetDefaultButton = styled.button`
  font-weight: bold;
  font-size: 1rem;
  background-color: transparent;
  border: 0;
  margin-top: 15px;
  cursor: pointer;
  padding: 0;
  text-align: left;
`;
