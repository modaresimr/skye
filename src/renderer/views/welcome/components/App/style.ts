import styled, { css } from 'styled-components';
import { centerIcon } from '~/renderer/mixins';

import { ITheme } from '~/interfaces';
import { contrast } from '~/utils/colors';

export const StyledWelcome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
  background-color: ${({ theme }) => theme.backgroundColor};
  text-align: center;
`;

export const StyledSubtitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.9;
  margin: 0;
`;
export const StyledTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 0.2rem;
`;
