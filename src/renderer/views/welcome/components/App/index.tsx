import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { ThemeProvider } from 'styled-components';

import { WebUIStyle } from '~/renderer/mixins/default-styles';
import Button from '~/renderer/components/Button';
import { StyledSubtitle, StyledTitle, StyledWelcome } from './style';

export default observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <div>
        <WebUIStyle />
        <StyledWelcome>
          <StyledSubtitle>Welcome to Skye</StyledSubtitle>
          <StyledTitle>
            The browser that isn’t
            <br />
            absolute sh*t
          </StyledTitle>
          <Button primary>Let's get started</Button>
        </StyledWelcome>
      </div>
    </ThemeProvider>
  );
});
