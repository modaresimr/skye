import styled, { css } from 'styled-components';

import { body2, centerIcon, interMedium } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 900;
  display: flex;
  align-items: center;
`;

interface RowProps {
  theme?: ITheme;
}

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
  height: 100%;
  max-width: 1200px;
  width: 1200px;
  margin-left: auto;
  padding-left: 200px;
  padding-right: 200px;
  margin-right: auto;
  padding-top: 100px;
  overflow-y: scroll;
  @media (max-width: 1200px) {
    padding-left: 100px;
    padding-right: 100px;
  }

  @media (max-height: 600px) {
    padding-top: 50px;
  }
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

export const StyledSettingsCard = styled.div`
  border-radius: 12px;
  padding: 1.8rem;
  height: 130px;
  background-image: linear-gradient(90deg, #000000 0%, #161616 100%);
  border: 1px solid #2b2b2b;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px 0 rgba(15, 15, 15, 0.5);
`;

export const StyledSettingsCardGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-gap: 20px;
  grid-template-columns: calc(50% - 10px) calc(50% - 10px);
`;

export const StyledSettingsContent = styled.div`
  width: 100%;
  margin-left: 40px;
`;
export const StyledSettingsTitle = styled.h1`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
`;

export const StyledSettingsSubtitle = styled.h2`
  font-weight: 400;
  font-size: 0.8rem;
  opacity: 0.8;
  margin-bottom: 0;
  margin-top: 5px;
`;

export const StyledSettingsIcon = styled(FontAwesomeIcon)`
  margin-top: auto;
  margin-right: auto;
  font-size: 1rem;
`;
