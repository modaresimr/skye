import React from 'react';
import { observer } from 'mobx-react-lite';

import { StyledSmallDialog, Title } from './style';
import Button from '~/renderer/components/Button';
import { ITheme } from '~/interfaces';

type ClickEvent = (e: React.MouseEvent<HTMLDivElement>) => void;

export const SelectionDialog = observer(
  ({
    amount,
    visible,
    onDeleteClick,
    onCancelClick,
    theme,
  }: {
    amount: number;
    visible: boolean;
    onDeleteClick: ClickEvent;
    onCancelClick: ClickEvent;
    theme?: ITheme;
  }) => {
    return (
      <StyledSmallDialog visible={visible}>
        <Title>{amount} selected</Title>
        <Button style={{ marginLeft: 16 }} onClick={onDeleteClick}>
          Delete
        </Button>
        <Button secondary style={{ marginLeft: 8 }} onClick={onCancelClick}>
          Cancel
        </Button>
      </StyledSmallDialog>
    );
  },
);
