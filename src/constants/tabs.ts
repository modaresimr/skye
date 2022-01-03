import { getWebUIURL } from '~/common/webui';

export const NEWTAB_URL = getWebUIURL('newtab');
export const SETTINGS_URL = getWebUIURL('settings');

export const defaultTabOptions: chrome.tabs.CreateProperties = {
  url: NEWTAB_URL,
  active: true,
};
