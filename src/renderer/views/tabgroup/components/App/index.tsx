import React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import { StyledApp, Colors, Color } from './style';
import store from '../../store';
import { Textfield } from '~/renderer/components/Textfield';
import { ipcRenderer } from 'electron';
import { UIStyle } from '~/renderer/mixins/default-styles';

const onChange = (e: any) => {
  ipcRenderer.send(`edit-tabgroup-${store.windowId}`, {
    name: store.inputRef.current.value,
    id: store.tabGroupId,
  });
};

const onColorClick = (color: string) => () => {
  ipcRenderer.send(`edit-tabgroup-${store.windowId}`, {
    color,
    id: store.tabGroupId,
  });
};

export const App = observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <StyledApp>
        <UIStyle />
        <Textfield
          dark={store.theme.dark}
          placeholder="Name"
          style={{ width: '100%' }}
          onChange={onChange}
          ref={store.inputRef}
        />

      </StyledApp>
    </ThemeProvider>
  );
});
