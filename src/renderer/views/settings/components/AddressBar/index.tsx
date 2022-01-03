import React from 'react';

import Dropdown from '~/renderer/components/Dropdown';
import Switch from '~/renderer/components/Switch';
import {
  Title,
  Control,
  Header,
  Back,
  StyledSettingsCardGrid,
} from '../../style';
import store from '../../store';
import { onSwitchChange } from '../../utils';
import { observer } from 'mobx-react-lite';
import {
  EnginesTable,
  TableRow,
  TableCell,
  TableHeader,
  MoreButton,
} from './style';

import { ISearchEngine } from '~/interfaces';
import Button from '~/renderer/components/Button';
import Card from '~/renderer/components/Card';
import { faQuestionCircle, faSearch } from '@fortawesome/pro-solid-svg-icons';

const SuggestionsToggle = observer(() => {
  const { suggestions } = store.settings;

  return (
    <div onClick={onSwitchChange('suggestions')}>
      <Title>Show search and site suggestions</Title>
      <Control>
        <Switch toggled={suggestions} />
      </Control>
    </div>
  );
});

const onSearchEngineChange = (value: string) => {
  const { searchEngines } = store.settings;
  store.settings.searchEngine = searchEngines.indexOf(
    searchEngines.find((x) => x.name === value),
  );
  store.save();
};

const SearchEngineRow = observer(() => {
  const se = store.searchEngine;

  return (
    <div>
      <Title>Search engine used in the address bar</Title>
      <Control>
        <Dropdown value={se.name} onChange={onSearchEngineChange} items={
          Object.values(store.settings.searchEngines).map((item, key) => ({
            id: item.name, value: item.name, name: item.name
          }))}>
        </Dropdown>
      </Control>
    </div>
  );
});

const onBackClick = () => {
  store.selectedSection = 'address-bar';
};

const onMoreClick =
  (data: ISearchEngine) => (e: React.MouseEvent<HTMLDivElement>) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    store.menuInfo.left = left - store.menuRef.current.offsetWidth;
    store.menuInfo.top = top;

    store.editedSearchEngine = data;
    store.menuVisible = true;
  };

export const SearchEngine = observer(({ data }: { data: ISearchEngine }) => {
  const isDefault = store.searchEngine.keyword === data.keyword;
  return (
    <TableRow bold={isDefault}>
      <TableCell>
        <div>
          {data.name} {isDefault && '(Default)'}
        </div>
      </TableCell>
      <TableCell>
        <div>{data.keyword}</div>
      </TableCell>
      <TableCell>
        <div>{data.url}</div>
      </TableCell>
      <MoreButton onClick={onMoreClick(data)}></MoreButton>
    </TableRow>
  );
});

const onAddClick = () => {
  store.dialogVisible = true;
  store.dialogContent = 'add-search-engine';
  store.searchEngineInputRef.current.value = '';
  store.searchEngineKeywordInputRef.current.value = '';
  store.searchEngineUrlInputRef.current.value = '';
};

export const ManageSearchEngines = observer(() => {
  return (
    <>
      <Header>
        <Back onClick={onBackClick} />
        Manage search engines
      </Header>
      <div>
        <Title>Address bar search engines</Title>
        <Control>
          <Button primary onClick={onAddClick}>
            Add
          </Button>
        </Control>
      </div>
      <EnginesTable>
        <TableRow>
          <TableHeader>Search engine</TableHeader>
          <TableHeader>Keyword</TableHeader>
          <TableHeader>URL</TableHeader>
          <TableHeader></TableHeader>
        </TableRow>
        {store.settings.searchEngines.map((item, key) => (
          <SearchEngine key={item.keyword} data={item} />
        ))}
      </EnginesTable>
    </>
  );
});

const onManageSearchEngines = () => {
  store.selectedSection = 'search-engines';
};

export const AddressBar = observer(() => {
  const { suggestions } = store.settings;
  const searchEngine = store.searchEngine;
  return (
    <>
      <Header>Address Bar</Header>
      <span>
        Change your address bar and search engine to whatever you like.
      </span>
      <StyledSettingsCardGrid>
        <Card
          title="Search Suggestions"
          subtitle={suggestions ? 'Enabled' : 'Disabled'}
          icon={faQuestionCircle}
        />
        <Card
          title="Search Engine"
          subtitle={searchEngine.name}
          icon={faSearch}
        />
      </StyledSettingsCardGrid>
    </>
  );
});
