import { observer } from 'mobx-react-lite';
import React from 'react';
import { ipcRenderer } from 'electron';
import * as remote from '@electron/remote';
import store from '../../store';
import { Tabbar } from '../Tabbar';
import { platform } from 'os';
import { WindowsControls } from 'react-windows-controls';
import { StyledToolbar, FullscreenExitButton } from './style';
import { NavigationButtons } from '../NavigationButtons';
import { RightButtons } from '../RightButtons';
import { Separator } from '../RightButtons/style';
import { SiteButtons } from '../SiteButtons';

const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  if (store.addressbarFocused) {
    e.preventDefault();
  }
};

export const Toolbar = observer(() => {
  return store.tabs.list.length > 1 ? (
    <StyledToolbar
      onMouseDown={onMouseDown}
      isFullscreen={store.isFullscreen}
      color={store.tabs.selectedTab?.color}
      dialogOpen={Object.values(store.dialogsVisibility).some((x) => !!x)}
    >
      {store.isCompact && <NavigationButtons />}
      <Tabbar />
      {store.isCompact && <RightButtons />}
    </StyledToolbar>
  ) : (
    <></>
  );
});
