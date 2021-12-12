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
import store from '~/renderer/views/settings/store';
import { useQuery } from 'react-query';
import axios from 'axios';
import { idApi } from '~/constants';

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
  const { token } = store.settings;

  const { data: user } = useQuery(
    ['currentUser'],
    async () =>
      (
        await axios.get<{
          id: string;
          email: string;
          username: string;
          name: string;
          avatar?: string;
          createdAt: Date;
          updatedAt: Date;
        }>(`${idApi}/apps/users/me`, {
          headers: {
            authorization: token,
          },
        })
      ).data,
  );

  return (
    <StyledNavigationDrawer style={style} dense={dense}>
      {title !== '' && (
        <Header>
          <Avatar hash={hash} />
          <Title>{user?.name ?? 'Guest'}</Title>
          <p>{user?.email ?? 'Innatical ID'}</p>
        </Header>
      )}
      <MenuItems global={global}>{children}</MenuItems>
    </StyledNavigationDrawer>
  );
};

NavigationDrawer.Item = NavigationDrawerItem;
