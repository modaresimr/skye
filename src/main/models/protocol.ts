import { protocol } from 'electron';
import { join } from 'path';
import { ERROR_PROTOCOL, WEBUI_PROTOCOL } from '~/constants/files';
import { URL } from 'url';
import * as IPFS from 'ipfs-core';
//@ts-ignore
import itToStream from 'it-to-stream';
import itLast from 'it-last';
import path from 'path';

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'skye',
    privileges: {
      bypassCSP: true,
      secure: true,
      standard: true,
      supportFetchAPI: true,
      allowServiceWorkers: true,
      corsEnabled: false,
    },
  },
]);

let ipfs: IPFS.IPFS;

// TODO: Maybe block until IPFS is ready?
(async () => {
  ipfs = await IPFS.create();
})();

export const registerProtocol = (session: Electron.Session) => {
  session.protocol.registerStreamProtocol('ipfs', async (req, cb) => {
    const url = new URL(req.url);
    // TODO:  Check if IPFS is ready
    // TODO: Check if IPFS file exists
    // TODO: Prefix with index.html/.html if not found
    const name = await itLast(
      ipfs.name.resolve(url.hostname + url.pathname, {
        recursive: true,
      }),
    );

    const stats = await ipfs.files.stat(name);

    if (stats.type === 'directory') {
      const index = path.join(name, 'index.html');
      await ipfs.files.stat(index);
      const file = ipfs.cat(index);
      cb({
        data: itToStream(file),
      });
    } else {
      const file = ipfs.cat(name);
      cb({
        data: itToStream(file),
      });
    }
  });

  session.protocol.registerFileProtocol(
    ERROR_PROTOCOL,
    (request, callback: any) => {
      const parsed = new URL(request.url);

      if (parsed.hostname === 'network-error') {
        return callback({
          path: join(__dirname, '../static/pages/', `network-error.html`),
        });
      }
    },
  );

  if (process.env.NODE_ENV !== 'development') {
    session.protocol.registerFileProtocol(
      WEBUI_PROTOCOL,
      (request, callback: any) => {
        const parsed = new URL(request.url);

        if (parsed.pathname === '/') {
          return callback({
            path: join(__dirname, `${parsed.hostname}.html`),
          });
        }

        callback({ path: join(__dirname, parsed.pathname) });
      },
    );
  }
};
