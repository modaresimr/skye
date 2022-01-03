import React, {useState} from 'react';
import { observer } from 'mobx-react-lite';

import Button from '~/renderer/components/Button';
import store from '../../../store';
import { Textfield } from '~/renderer/components/Textfield';
import Dropdown from '~/renderer/components/Dropdown';
import { Dialog, Title, Content, Buttons, CloseButton } from '../../Dialog';

export default observer(() => {
  const [countries, setCountries] = useState('')
  return (
    <Dialog
      visible={store.dialogContent === 'edit-address'}
      style={{ width: 344 }}
    >
      <Title>Edit address</Title>
      <Content>
        <Textfield label="Name" />
        <Textfield label="Street address" />
        <Textfield label="Postal code" style={{ marginRight: 24 }} />
        <Textfield label="City " />
        <Dropdown value={countries} onChange={(v) => setCountries(v)} items={[
          {
            name: 'Poland',
            id: 'pl'
          }
        ]}>
        </Dropdown>
      </Content>
      <Buttons>
        <CloseButton />
        <Button>Save</Button>
      </Buttons>
    </Dialog>
  );
});
