import React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import { StyledApp } from './style';
import { QuickMenu } from '../QuickMenu';
import store from '../../store';
import { UIStyle } from '~/renderer/mixins/default-styles';

export const App = observer(() => {
  return (
    <ThemeProvider theme={store.theme}>
      <StyledApp>
        <UIStyle />
        <QuickMenu />
      </StyledApp>
    </ThemeProvider>
  );
});
