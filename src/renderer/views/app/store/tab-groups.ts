import { observable, action, makeObservable } from 'mobx';

import { ITabGroup } from '../models';
import { Store } from '.';
import { ipcRenderer } from 'electron';

export class TabGroupsStore {
  public list: ITabGroup[] = [];

  private store: Store;

  public constructor(store: Store) {
    makeObservable(this, { list: observable, addGroup: action });

    this.store = store;

    ipcRenderer.on('edit-tabgroup', (e, t) => {
      if (t) {
        const group = this.getGroupById(t.id);
        if (t.name != null) group.name = t.name;
        store.tabs.updateTabsBounds(true);
      }
    });
  }

  public getGroupById(id: number) {
    return this.list.find((x) => x.id === id);
  }

  public addGroup() {
    const tabGroup = new ITabGroup(this.store, this);
    this.list.push(tabGroup);
    return tabGroup;
  }
}
