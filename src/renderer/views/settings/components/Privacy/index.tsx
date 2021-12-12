import React from 'react';

import { Header, Title, Control, StyledSettingsCardGrid } from '../../style';
import { Button } from '~/renderer/components/Button/Button';
import store from '../../store';
import { observer } from 'mobx-react-lite';
import { onSwitchChange } from '../../utils';
import Switch from '~/renderer/components/Switch';
import Card from '~/renderer/components/Card';
import { faTrash, faUserShield } from '@fortawesome/pro-solid-svg-icons';

const onClearBrowsingData = () => {
  store.dialogContent = 'privacy';
};

const DoNotTrackToggle = observer(() => {
  const { doNotTrack } = store.settings;

  return (
    <div onClick={onSwitchChange('doNotTrack')}>
      <Title>
        Send a &quot;Do Not Track&quot; request with your browsing traffic. Not
        recommended,{' '}
        <a
          href="https://spreadprivacy.com/do-not-track"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          see why
        </a>
      </Title>
      <Control>
        <Switch toggled={doNotTrack} />
      </Control>
    </div>
  );
});

const GlobalPrivacyControlToggle = observer(() => {
  const { globalPrivacyControl } = store.settings;

  return (
    <div onClick={onSwitchChange('globalPrivacyControl')}>
      <Title>
        Send a{' '}
        <a
          href="https://globalprivacycontrol.org"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Global Privacy Control
        </a>{' '}
        request with your browsing traffic
      </Title>
      <Control>
        <Switch toggled={globalPrivacyControl} />
      </Control>
    </div>
  );
});

export const Privacy = () => {
  const { globalPrivacyControl, doNotTrack } = store.settings;
  return (
    <>
      <Header>Privacy</Header>
      <StyledSettingsCardGrid>
        <Card
          title={'Global Privacy Control'}
          subtitle={globalPrivacyControl ? 'Enabled' : 'Disabled'}
          icon={faUserShield}
        />
        <Card
          title={'Do Not Track'}
          subtitle={`Deprecated | ${doNotTrack ? 'Enabled' : 'Disabled'}`}
          icon={faUserShield}
        />
        <Card title={'Clear Browsing Data'} icon={faTrash} />
      </StyledSettingsCardGrid>
    </>
  );
};
