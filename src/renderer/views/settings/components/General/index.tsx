import React from 'react';

import { Title, Row, Control, Header } from '../../style';
import store from '../../store';
import { observer } from 'mobx-react-lite';
import Switch from '~/renderer/components/Switch';
import { ipcRenderer } from 'electron';
import Button from '~/renderer/components/Button';

export const General = observer(() => {
  return (
    <>
      <Header>General</Header>
      <Row>
        <div>
          <Title>Default Browser</Title>
        </div>
        <Control>
          <Button
            onClick={async () => {
              await ipcRenderer.invoke('set-default-browser');
            }}
            primary
          >
            Set as Default
          </Button>
        </Control>
      </Row>
    </>
  );
});
