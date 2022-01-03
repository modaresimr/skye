import { observer } from 'mobx-react-lite';
import React from 'react';

import { StyledContainer } from './NavigationButtons.styles';
import store from '../../store';
import TitlebarButton from '../TitlebarButton';
import {
  ICON_CLOSE,
  ICON_FORWARD,
  ICON_BACK,
  ICON_REFRESH,
} from '~/renderer/constants/icons';
import { faListDropdown } from '@fortawesome/pro-light-svg-icons';

const onBackClick = () => {
  store.tabs.selectedTab.callViewMethod('goBack');
};

const onForwardClick = () => {
  store.tabs.selectedTab.callViewMethod('goForward');
};

const onRefreshClick = () => {
  if (store.tabs.selectedTab && store.tabs.selectedTab.loading) {
    store.tabs.selectedTab.callViewMethod('stop');
  } else {
    store.tabs.selectedTab.callViewMethod('reload');
  }
};

export const NavigationButtons = observer(() => {
  const { selectedTab } = store.tabs;

  let loading = false;

  if (selectedTab) {
    loading = selectedTab.loading;
  }

  return (
    <StyledContainer>
      <TitlebarButton
        size={20}
        style={{ marginLeft: 6 }}
        inhertTextColor
        icon={faListDropdown}
      />
      <TitlebarButton
        disabled={!store.navigationState.canGoBack}
        size={20}
        icon={ICON_BACK}
        inhertTextColor
        onClick={onBackClick}
      />
      <TitlebarButton
        disabled={!store.navigationState.canGoForward}
        size={20}
        inhertTextColor
        icon={ICON_FORWARD}
        onClick={onForwardClick}
      />
      <TitlebarButton
        size={20}
        inhertTextColor
        icon={loading ? ICON_CLOSE : ICON_REFRESH}
        onClick={onRefreshClick}
      />
    </StyledContainer>
  );
});
