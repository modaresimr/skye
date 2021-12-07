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
    scheme: 'ipfs',
    privileges: {
      bypassCSP: false,
      secure: true,
      standard: true,
      supportFetchAPI: true,
      allowServiceWorkers: true,
      corsEnabled: true,
      stream: true,
    },
  },
]);

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'ipns',
    privileges: {
      bypassCSP: false,
      secure: true,
      standard: true,
      supportFetchAPI: true,
      allowServiceWorkers: true,
      corsEnabled: true,
      stream: true,
    },
  },
]);

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

  session.protocol.registerStreamProtocol('ipfs', async (req, cb) => {
    console.log(req);
    const url = new URL(req.url);
    // TODO:  Check if IPFS is ready

    const name = await ipfs.resolve('/ipfs/' + url.hostname + url.pathname, {
      recursive: true,
    });

    let stats: any;
    try {
      // TODO: try to append .html
      stats = await ipfs.files.stat(name);
    } catch {
      return cb({
        statusCode: 404,
      });
    }

    if (stats.type === 'directory') {
      if (!req.url.endsWith('/')) {
        return cb({
          statusCode: 301,
          headers: {
            Location: req.url + '/',
          },
        });
      }

      const index = path.join(name, 'index.html');

      try {
        await ipfs.files.stat(index);
      } catch {
        return cb({
          statusCode: 404,
          headers: {},
        });
      }

      const file = ipfs.cat(index);
      cb({
        data: itToStream(file),
        headers: {},
      });
    } else {
      try {
        await ipfs.files.stat(name);
      } catch {
        return cb({
          statusCode: 404,
          headers: {},
        });
      }

      const file = ipfs.cat(name);

      cb({
        data: itToStream(file),
        headers: {},
      });
    }
  });

  session.protocol.registerStreamProtocol('ipns', async (req, cb) => {
    const url = new URL(req.url);
    // TODO:  Check if IPFS is ready

    const name = await itLast(
      ipfs.name.resolve('/ipns/' + url.hostname + url.pathname, {
        recursive: true,
      }),
    );

    let stats: any;
    try {
      // TODO: try to append .html
      stats = await ipfs.files.stat(name);
    } catch {
      return cb({
        statusCode: 404,
      });
    }

    if (stats.type === 'directory') {
      if (!req.url.endsWith('/')) {
        return cb({
          statusCode: 301,
          headers: {
            Location: req.url + '/',
          },
        });
      }

      const index = path.join(name, 'index.html');

      try {
        await ipfs.files.stat(index);
      } catch {
        return cb({
          statusCode: 404,
          headers: {},
        });
      }

      const file = ipfs.cat(index);
      cb({
        data: itToStream(file),
      });
    } else {
      try {
        await ipfs.files.stat(name);
      } catch {
        return cb({
          statusCode: 404,
          headers: {},
        });
      }

      const file = ipfs.cat(name);
      cb({
        data: itToStream(file),
        headers: {},
      });
    }
  });

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
