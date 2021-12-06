import React from 'react';
import { observer } from 'mobx-react-lite';

import { StyledNavigationDrawerItem, Icon } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const NavigationDrawerItem = observer(
  ({
    children,
    selected,
    onClick,
    global,
  }: {
    children: any;
    selected?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    global?: boolean;
  }) => {
    return (
      <StyledNavigationDrawerItem
        title={children}
        onClick={onClick}
        selected={selected}
        global={global}
      >
        {children}
      </StyledNavigationDrawerItem>
    );
  },
);
