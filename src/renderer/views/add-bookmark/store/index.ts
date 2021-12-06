import { ipcRenderer } from 'electron';
import { action, makeObservable, observable } from 'mobx';
import { IBookmark } from '~/interfaces';
import React from 'react';
import { DialogStore } from '~/models/dialog-store';

export class Store extends DialogStore {
  public titleRef = React.createRef<HTMLInputElement>();

  public bookmark: IBookmark;

  // Observable

  public folders: IBookmark[] = [];

  public dialogTitle = '';
  public dialogURL = '';
  public url = '';
  public title = '';
  public favicon = '';
  public currentFolder: IBookmark = null;

  @action
  async addBookmark() {
    if (!this.bookmark) {
      this.bookmark = await ipcRenderer.invoke('bookmarks-add', {
        title: this.title,
        url: this.url,
        favicon: this.favicon,
        parent: this.folders.find((x) => x.static === 'main')._id,
      });
    }
    this.currentFolder = this.folders.find(
      (x) => x._id === this.bookmark.parent,
    );
    if (this.titleRef.current) {
      this.titleRef.current.value = this.bookmark.title ?? this.title;
      this.titleRef.current.focus();
      this.titleRef.current.select();
    }
  }

  public constructor() {
    super();

    (async () => {
      this.folders = await ipcRenderer.invoke('bookmarks-get-folders');
      this.currentFolder = this.folders.find((x) => x.static === 'main');
    })();

    makeObservable(this, {
      folders: observable,
      dialogTitle: observable,
      currentFolder: observable,
    });

    ipcRenderer.on('data', async (e, data) => {
      const { bookmark, title, url, favicon } = data;

      this.dialogTitle = !bookmark ? 'New Bookmark' : 'Edit Bookmark';
      this.dialogURL = new URL(url).hostname;
      this.title = title;
      this.url = url;
      this.favicon = favicon;

      this.bookmark = bookmark;
      this.folders = await ipcRenderer.invoke('bookmarks-get-folders');
    });
  }
}

export default new Store();
