import React from 'react';

import { Header, StyledSettingsCardGrid, Control } from '../../style';
import store from '../../store';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import {
  faBookBookmark,
  faChartSimple,
  faEclipse,
  faImageLandscape,
  faSquareExclamation,
} from '@fortawesome/pro-solid-svg-icons';
import Card from '~/renderer/components/Card';
import Switch from '~/renderer/components/Switch';
import { Dialog } from '@headlessui/react';
import Dropdown from '~/renderer/components/Dropdown';
import Button from '~/renderer/components/Button';
import { Input } from '~/renderer/components/Input';

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
    <Card
      title="Theme Variant"
      subtitle={
        store.settings.themeAuto
          ? 'Auto'
          : defaultValue === 'skye-light'
          ? 'Light'
          : 'Dark'
      }
      icon={faEclipse}
    >
      <Dialog.Title>Theme Variant</Dialog.Title>
      <Dialog.Description>
        The variant of the theme of the browser
      </Dialog.Description>
      <Control>
        <Dropdown
          value={store.settings.themeAuto ? 'auto' : defaultValue}
          onChange={onThemeChange}
          items={[
            {
              id: 'auto',
              name: 'Auto',
            },
            {
              id: 'skye-light',
              name: 'Light',
            },
            {
              id: 'skye-dark',
              name: 'Dark',
            },
          ]}
        />
      </Control>
    </Card>
  );
});

const WarnQuit = observer(() => {
  const { warnOnQuit } = store.settings;

  return (
    <Card
      title={'Warn before Quit'}
      subtitle={warnOnQuit ? 'Enabled' : 'Disabled'}
      icon={faSquareExclamation}
    >
      <Dialog.Title>Warn before Quit</Dialog.Title>
      <Dialog.Description>
        Show warning dialog when closing multiple tabs
      </Dialog.Description>
      <Control>
        <Switch
          toggled={warnOnQuit}
          onToggle={() => {
            store.settings.warnOnQuit = !warnOnQuit;
            store.save();
          }}
        />
      </Control>
    </Card>
  );
});

const BookmarksBar = observer(() => {
  const { bookmarksBar } = store.settings;

  return (
    <Card
      title={'Bookmarks Bar'}
      subtitle={bookmarksBar ? 'Enabled' : 'Disabled'}
      icon={faBookBookmark}
    >
      <Dialog.Title>Bookmarks Bar</Dialog.Title>
      <Dialog.Description>
        Show a bar with your bookmarks under tabs
      </Dialog.Description>
      <Control>
        <Switch
          toggled={bookmarksBar}
          onToggle={() => {
            store.settings.bookmarksBar = !bookmarksBar;
            store.save();
          }}
        />
      </Control>
    </Card>
  );
});

const ShowFrequentlyVisited = observer(() => {
  const { tab } = store.settings;

  return (
    <Card
      title="Frequently Visited"
      subtitle={tab.topSites ? 'Shown' : 'Not Shown'}
      icon={faChartSimple}
    >
      <Dialog.Title>Frequently Visited</Dialog.Title>
      <Dialog.Description>
        Show your frequently visited pages in new tab
      </Dialog.Description>
      <Control>
        <Switch
          toggled={tab.topSites}
          onToggle={() => {
            store.settings.tab.topSites = !tab.topSites;
            store.save();
          }}
        />
      </Control>
    </Card>
  );
});

const NewTabImage = observer(() => {
  const { tab } = store.settings;
  const [image, setImage] = useState(tab.image);
  return (
    <Card title="New Tab Background" icon={faImageLandscape}>
      <Dialog.Title>New Tab Background</Dialog.Title>
      <Dialog.Description>
        The image to show as the background of the new tab
      </Dialog.Description>
      <Control>
        <Input
          onChange={(event) => {
            setImage(event.target.value);
          }}
          style={{
            width: '200px',
          }}
          tabIndex={0}
          className="textfield"
          defaultValue={image}
        />
      </Control>
      <br />
      <Button
        primary
        onClick={() => {
          store.settings.tab.image = image;
          store.save();
        }}
      >
        Save
      </Button>
    </Card>
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
