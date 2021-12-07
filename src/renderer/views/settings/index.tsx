import { renderWebUI } from '~/utils/webui-entry';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { NavigationDrawer } from '~/renderer/components/NavigationDrawer';
import {
  ICON_TRASH,
  ICON_EDIT,
  ICON_SETTINGS,
  ICON_PALETTE,
  ICON_AUTOFILL,
  ICON_POWER,
  ICON_SEARCH,
  ICON_DOWNLOAD,
  ICON_SHIELD,
  ICON_PERSON,
} from '~/renderer/constants';
import store, { SettingsSection } from './store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeProvider } from 'styled-components';
import Button from '~/renderer/components/Button';
import {
  ContextMenu,
  ContextMenuItem,
} from '~/renderer/components/ContextMenu';
import { GlobalNavigationDrawer } from '~/renderer/components/GlobalNavigationDrawer';
import { Container, Content, LeftContent } from '~/renderer/components/Pages';
import { Textfield } from '~/renderer/components/Textfield';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
import { DialogTitle, DialogButtons } from '../bookmarks/components/App/style';
import { Accounts } from './components/Accounts';
import { AddressBar, ManageSearchEngines } from './components/AddressBar';
import { Appearance } from './components/Appearance';
import { Autofill } from './components/Autofill';
import { Dialog } from './components/Dialog';
import { Downloads } from './components/Downloads';
import { Privacy } from './components/Privacy';
import { OnStartup } from './components/Startup';
import { StyledSetDefaultButton, StyledSettings } from './style';

const MenuItem = observer(
  ({
    section,
    subSections,
    children,
  }: {
    section: SettingsSection;
    children: any;
    subSections?: SettingsSection[];
  }) => {
    return (
      <NavigationDrawer.Item
        onClick={() => (store.selectedSection = section)}
        selected={
          store.selectedSection === section ||
          (subSections && subSections.includes(store.selectedSection))
        }
      >
        {children}
      </NavigationDrawer.Item>
    );
  },
);

const onBlur = () => {
  store.menuVisible = false;
};

const onMakeDefaultClick = () => {
  store.settings.searchEngine = store.settings.searchEngines.findIndex(
    (x) => x.keyword === store.editedSearchEngine.keyword,
  );
  store.menuVisible = false;
};

const onRemoveClick = () => {
  store.settings.searchEngines = store.settings.searchEngines.filter(
    (x) => x.keyword !== store.editedSearchEngine.keyword,
  );
  store.save();
  store.menuVisible = false;
};

const onEditClick = () => {
  store.menuVisible = false;
  store.dialogVisible = true;
  store.dialogContent = 'edit-search-engine';
  store.searchEngineInputRef.current.value = store.editedSearchEngine.name;
  store.searchEngineKeywordInputRef.current.value =
    store.editedSearchEngine.keyword;
  store.searchEngineUrlInputRef.current.value = store.editedSearchEngine.url;
};

const onSaveClick = () => {
  const name = store.searchEngineInputRef.current.value.trim();
  const keyword = store.searchEngineKeywordInputRef.current.value.trim();
  const url = store.searchEngineUrlInputRef.current.value.trim();

  const item = store.settings.searchEngines.find((x) => x.keyword === keyword);

  if (keyword !== '' && name !== '' && url !== '') {
    if (store.dialogContent === 'edit-search-engine') {
      item.name = name;
      item.keyword = keyword;
      item.url = url;
      store.dialogVisible = false;
    } else if (store.dialogContent === 'add-search-engine') {
      if (!item) {
        store.settings.searchEngines.push({
          name,
          keyword,
          url,
        });
        store.dialogVisible = false;
      }
    }
    store.save();
  }
};

const App = observer(() => {
  const { selectedSection } = store;

  let dialogTitle = '';

  if (store.dialogContent === 'edit-search-engine') {
    dialogTitle = 'Edit search engine';
  } else if (store.dialogContent === 'add-search-engine') {
    dialogTitle = 'Add search engine';
  }

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      if (!token) return;

      store.selectedSection = 'account';
      store.settings.token = token;
      store.save();

      ipcRenderer.invoke('bookmarks-sync');
      window.history.replaceState(null, null, window.location.pathname);
    })();
  }, []);

  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <Container
        onMouseDown={(e) => (store.dialogVisible = false)}
        darken={store.dialogVisible}
      >
        <WebUIStyle />
        <ContextMenu
          tabIndex={1}
          ref={store.menuRef}
          onBlur={onBlur}
          style={{
            top: store.menuInfo.top,
            left: store.menuInfo.left,
          }}
          visible={store.menuVisible}
        >
          {store.editedSearchEngine &&
            store.editedSearchEngine.keyword !== store.searchEngine.keyword && (
              <>
                <ContextMenuItem onClick={onMakeDefaultClick}>
                  Make default
                </ContextMenuItem>
                <ContextMenuItem onClick={onRemoveClick}>
                  <FontAwesomeIcon icon={ICON_TRASH} />
                  Remove
                </ContextMenuItem>
              </>
            )}
          {store.editedSearchEngine && (
            <ContextMenuItem onClick={onEditClick}>
              <FontAwesomeIcon icon={ICON_EDIT} />
              Edit
            </ContextMenuItem>
          )}
        </ContextMenu>
        <Dialog
          onMouseDown={(e) => e.stopPropagation()}
          visible={store.dialogVisible}
          ref={store.dialogRef}
          style={{ width: 350 }}
        >
          <DialogTitle>{dialogTitle}</DialogTitle>
          <Textfield
            style={{ width: '100%' }}
            ref={store.searchEngineInputRef}
            label="Search engine"
          ></Textfield>

          <Textfield
            style={{
              width: '100%',
              marginTop: 16,
            }}
            ref={store.searchEngineKeywordInputRef}
            label="Keyword"
          ></Textfield>

          <Textfield
            style={{
              width: '100%',
              marginTop: 16,
            }}
            ref={store.searchEngineUrlInputRef}
            label="URL with %s in place of query"
          ></Textfield>

          <DialogButtons>
            <Button onClick={() => (store.dialogVisible = false)}>
              Cancel
            </Button>
            <Button onClick={onSaveClick} style={{ marginLeft: 8 }}>
              Save
            </Button>
          </DialogButtons>
          <div style={{ clear: 'both' }}></div>
        </Dialog>
        <StyledSettings>
          <NavigationDrawer title="Settings">
            <MenuItem section="appearance">Appearance</MenuItem>
            {process.env.ENABLE_AUTOFILL && (
              <MenuItem section="autofill">Autofill</MenuItem>
            )}
            <MenuItem section="startup">On startup</MenuItem>
            <MenuItem section="address-bar" subSections={['search-engines']}>
              Address bar
            </MenuItem>
            <MenuItem section="downloads">Downloads</MenuItem>
            <MenuItem section="privacy">Privacy</MenuItem>
            <MenuItem section="account">Innatical ID</MenuItem>
            <StyledSetDefaultButton
              onClick={async () => {
                await ipcRenderer.invoke('set-default-browser');
              }}
            >
              Set as default browser
            </StyledSetDefaultButton>
          </NavigationDrawer>
          <Content>
            <LeftContent>
              {selectedSection === 'appearance' && <Appearance />}
              {selectedSection === 'autofill' &&
                process.env.ENABLE_AUTOFILL && <Autofill />}
              {selectedSection === 'address-bar' && <AddressBar />}
              {selectedSection === 'search-engines' && <ManageSearchEngines />}
              {selectedSection === 'startup' && <OnStartup />}
              {selectedSection === 'privacy' && <Privacy />}
              {selectedSection === 'downloads' && <Downloads />}
              {selectedSection === 'account' && <Accounts />}
            </LeftContent>
          </Content>
        </StyledSettings>
      </Container>
    </ThemeProvider>
  );
});

renderWebUI(App);
