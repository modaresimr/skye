import React from 'react';

import {
  Header,
  StyledSettingsCardGrid,
  StyledSettingsCard,
  StyledSettingsTitle,
  StyledSettingsSubtitle,
  StyledSettingsIcon,
} from '../../style';
import store from '../../store';
import { onSwitchChange } from '../../utils';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import {
  faBookBookmark,
  faChartSimple,
  faEclipse,
  faImageLandscape,
  faSquareExclamation,
} from '@fortawesome/pro-solid-svg-icons';

const onThemeChange = (value: string) => {
  if (value === 'auto') {
    store.settings.themeAuto = true;
  } else {
    store.settings.themeAuto = false;
    store.settings.theme = value;
  }

  store.save();
};

const ThemeVariant = observer(() => {
  const defaultValue = store.settings.theme;

  return (
    <StyledSettingsCard>
      <StyledSettingsTitle>Theme Variant</StyledSettingsTitle>
      <StyledSettingsSubtitle>
        {store.settings.themeAuto
          ? 'Auto'
          : defaultValue === 'skye-light'
          ? 'Light'
          : 'Dark'}
      </StyledSettingsSubtitle>
      {/* <Control>
        <Dropdown
          defaultValue={store.settings.themeAuto ? 'auto' : defaultValue}
          onChange={onThemeChange}
        >
          <Dropdown.Item value="auto">Auto</Dropdown.Item>
          <Dropdown.Item value="skye-light">Light</Dropdown.Item>
          <Dropdown.Item value="skye-dark">Dark</Dropdown.Item>
        </Dropdown>
      </Control> */}
      <StyledSettingsIcon icon={faEclipse} />
    </StyledSettingsCard>
  );
});

const WarnQuit = observer(() => {
  const { warnOnQuit } = store.settings;

  return (
    <StyledSettingsCard onClick={onSwitchChange('warnOnQuit')}>
      <StyledSettingsTitle>Warn before Quitting</StyledSettingsTitle>
      <StyledSettingsSubtitle>
        {warnOnQuit ? 'Enabled' : 'Disabled'}
      </StyledSettingsSubtitle>
      {/* <Title>Show warning dialog when closing multiple tabs</Title> */}
      {/* <Control>
        <Switch toggled={warnOnQuit} />
      </Control> */}
      <StyledSettingsIcon icon={faSquareExclamation} />
    </StyledSettingsCard>
  );
});

const BookmarksBar = observer(() => {
  const { bookmarksBar } = store.settings;

  return (
    <StyledSettingsCard onClick={onSwitchChange('bookmarksBar')}>
      <StyledSettingsTitle>Bookmarks Bar</StyledSettingsTitle>
      <StyledSettingsSubtitle>
        {bookmarksBar ? 'Enabled' : 'Disabled'}
      </StyledSettingsSubtitle>
      {/* <Control>
        <Switch toggled={bookmarksBar} />
      </Control> */}
      <StyledSettingsIcon icon={faBookBookmark} />
    </StyledSettingsCard>
  );
});

const ShowFrequentlyVisited = observer(() => {
  const { tab } = store.settings;

  return (
    <StyledSettingsCard onClick={onSwitchChange('tab', 'topSites')}>
      <StyledSettingsTitle>Frequently Visited</StyledSettingsTitle>
      <StyledSettingsSubtitle>
        {tab.topSites ? 'Shown' : 'Not Shown'}
      </StyledSettingsSubtitle>
      <StyledSettingsIcon icon={faChartSimple} />
    </StyledSettingsCard>
  );
});

const NewTabImage = observer(() => {
  const { tab } = store.settings;
  const [image, setImage] = useState('');
  return (
    <StyledSettingsCard>
      <StyledSettingsTitle>New Tab Background</StyledSettingsTitle>
      {/* <Control>
        <Input
          onChange={(event) => {
            setImage(event.target.value);
          }}
          style={{
            width: '200px',
          }}
          tabIndex={0}
          className="textfield"
          value={tab.image}
        />
      </Control>
      <Button
        primary
        onClick={() => {
          store.settings.tab.image = image;
          store.save();
        }}
      >
        Save
      </Button> */}
      <StyledSettingsIcon icon={faImageLandscape} />
    </StyledSettingsCard>
  );
});

export const Appearance = observer(() => {
  return (
    <>
      <Header>Appearance</Header>
      <span>
        Make your browser yours, customize theming and other styles here.
      </span>
      <StyledSettingsCardGrid>
        <BookmarksBar />
        <WarnQuit />
        <ThemeVariant />
        <ShowFrequentlyVisited />
        <NewTabImage />
      </StyledSettingsCardGrid>
    </>
  );
});
