import React from 'react';

import { Title, Control, Header, SecondaryText } from '../../style';
import store from '../../store';
import { getWebUIURL } from '~/common/webui';
import { observer } from 'mobx-react-lite';
import Button from '~/renderer/components/Button';
import axios from 'axios';
import { useQuery } from 'react-query';
import { applicationID, idApi, idWeb } from '~/constants';

export const Accounts = observer(() => {
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
    <>
      <Header>Account</Header>
      <div>
        <div>
          <Title>{token ? 'Logged In' : 'Logged Out'}</Title>
          <SecondaryText>
            {token ? user?.username : 'No user logged In'}
          </SecondaryText>
        </div>

        <Control>
          {token ? (
            <Button
              onClick={() => {
                store.settings.token = null;
                store.save();
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() =>
                (window.location.href = `${idWeb}/connect?id=${applicationID}&callback=${getWebUIURL(
                  'settings',
                )}`)
              }
            >
              Login
            </Button>
          )}
        </Control>
      </div>
    </>
  );
});
