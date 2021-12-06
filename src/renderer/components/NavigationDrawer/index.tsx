import React from 'react';

import {
  StyledNavigationDrawer,
  MenuItems,
  Search,
  Input,
  Title,
  Header,
} from './style';
import { NavigationDrawerItem } from './NavigationDrawerItem';
import Avatar from '../Avatar';
import { useHash } from '../Avatar/Avatar';

export const NavigationDrawer = ({
  children,
  title,
  search,
  onSearchInput,
  style,
  dense,
  global,
}: {
  children?: any;
  title?: string;
  search?: boolean;
  onSearchInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onBackClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  style?: any;
  dense?: boolean;
  global?: boolean;
}) => {
  const hash = useHash('adam');
  return (
    <StyledNavigationDrawer style={style} dense={dense}>
      {title !== '' && (
        <Header>
          <Avatar hash={hash} />
          <Title>adam</Title>
          <p>adam@inn.com</p>
        </Header>
      )}
      <MenuItems global={global}>{children}</MenuItems>
    </StyledNavigationDrawer>
  );
};

NavigationDrawer.Item = NavigationDrawerItem;
