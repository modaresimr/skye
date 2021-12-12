import { renderUI } from '~/utils/ui-entry';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledApp, Line } from './style';
import Toolbar from './components/Toolbar';
import Titlebar from './components/Titlebar';
import store from './store';
import { UIStyle } from '~/renderer/mixins/default-styles';
import BookmarkBar from './components/BookmarkBar';
import {
  DEFAULT_TITLEBAR_HEIGHT,
  COMPACT_TITLEBAR_HEIGHT,
  DEFAULT_TAB_MARGIN_TOP,
  COMPACT_TAB_MARGIN_TOP,
  COMPACT_TAB_HEIGHT,
  DEFAULT_TAB_HEIGHT,
} from '~/constants/design';
import { useMedia } from 'react-use';

const onAppLeave = () => {
  store.barHideTimer = setTimeout(function () {
    if (
      Object.keys(store.dialogsVisibility).some(
        (k) => store.dialogsVisibility[k],
      )
    ) {
      onAppLeave();
    } else {
      store.titlebarVisible = false;
    }
  }, 500);
};

const onAppEnter = () => {
  if (typeof store.barHideTimer !== 'number') clearTimeout(store.barHideTimer);
};

const onLineEnter = () => {
  store.titlebarVisible = true;
};

const App = observer(() => {
  const darkMode = useMedia('(prefers-color-scheme: dark)');
  return (
    <ThemeProvider
      theme={{
        ...store.theme,
        animations: store.settings.object.animations,
        isCompact: store.isCompact,
        titlebarHeight: !store.isCompact
          ? DEFAULT_TITLEBAR_HEIGHT
          : COMPACT_TITLEBAR_HEIGHT,
        tabMarginTop: !store.isCompact
          ? DEFAULT_TAB_MARGIN_TOP
          : COMPACT_TAB_MARGIN_TOP,
        tabHeight: store.isCompact ? COMPACT_TAB_HEIGHT : DEFAULT_TAB_HEIGHT,
      }}
    >
      <StyledApp
        onMouseOver={store.isFullscreen ? onAppEnter : undefined}
        onMouseLeave={store.isFullscreen ? onAppLeave : undefined}
        dialogOpen={Object.values(store.dialogsVisibility).some((x) => !!x)}
      >
        <UIStyle />

        {store.settings.object.topBarVariant === 'default' && <Titlebar />}
        <Toolbar />
        <BookmarkBar />
      </StyledApp>
      <Line
        onMouseOver={onLineEnter}
        style={{ height: store.isFullscreen && !store.titlebarVisible ? 1 : 0 }}
      />
    </ThemeProvider>
  );
});

renderUI(App);
