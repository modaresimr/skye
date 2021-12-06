import { observable, computed, makeObservable } from 'mobx';
import { ISettings, ITheme, IVisitedItem } from '~/interfaces';
import { getTheme } from '~/utils/themes';
import { DEFAULT_SETTINGS } from '~/constants';

export class Store {
  @observable
  public settings: ISettings = { ...(window as any).settings };

  @computed
  public get theme(): ITheme {
    return getTheme(this.settings.theme);
  }

  public updateSettings(newSettings: ISettings) {
    this.settings = { ...this.settings, ...newSettings };
  }

  public constructor() {
    makeObservable(this);

    (window as any).updateSettings = (settings: ISettings) => {
      this.settings = { ...this.settings, ...settings };
    };
  }
}

export default new Store();
