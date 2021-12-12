import React from 'react';
import { observer } from 'mobx-react-lite';
import AddressBar from '../AddressBar';
import { StyledAddressBarContainer } from './AddressBarContainer.styles';
import store from '../../store';

export const AddressBarContainer = observer(() => {
  return (
    <StyledAddressBarContainer
      onMouseDown={() => store.inputRef.blur()}
      visible={store.addressbarFocused || store.addressbarEditing}
    >
      <AddressBar />
    </StyledAddressBarContainer>
  );
});
