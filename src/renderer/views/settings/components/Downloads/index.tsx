import React from 'react';

import Switch from '~/renderer/components/Switch';
import {
  Title,
  Control,
  Header,
  SecondaryText,
  StyledSettingsCardGrid,
} from '../../style';
import store from '../../store';
import { onSwitchChange } from '../../utils';
import { ipcRenderer } from 'electron';
import { observer } from 'mobx-react-lite';
import Button from '~/renderer/components/Button';
import Card from '~/renderer/components/Card';
import { faDownload } from '@fortawesome/pro-solid-svg-icons';

const AskToggle = observer(() => {
  const { downloadsDialog } = store.settings;

  return (
    <div onClick={onSwitchChange('downloadsDialog')}>
      <Title>Ask where to save each file before downloading</Title>
      <Control>
        <Switch toggled={downloadsDialog} />
      </Control>
    </div>
  );
});

const onChangeClick = () => {
  ipcRenderer.send('downloads-path-change');
};

export const Downloads = () => {
  const { downloadsDialog } = store.settings;
  return (
    <>
      <Header>Downloads</Header>
      <StyledSettingsCardGrid>
        <Card
          title="Location"
          subtitle={store.settings.downloadsPath}
          icon={faDownload}
        />
        <Card
          title="Ask for save location"
          subtitle={downloadsDialog ? 'Enabled' : 'Disabled'}
          icon={faDownload}
        />
      </StyledSettingsCardGrid>
    </>
  );
};
