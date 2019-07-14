<div align="center">
  <img src="static/app-icons/readme.png">

  <h3>
    A feature-rich, elegant FTP client
  </h3>

  <br />

[![Release](https://img.shields.io/github/release-pre/qusly/qusly.svg)](https://github.com/qusly/qusly/releases)
[![Travis](https://img.shields.io/travis/qusly/qusly.svg?style=flat-square)](https://travis-ci.com/qusly/qusly)
[![Travis](https://img.shields.io/travis/qusly/qusly-core.svg?style=flat-square)](https://travis-ci.org/xnerhu/qusly-core.svg)
[![Downloads](https://img.shields.io/github/downloads/qusly/qusly/total.svg?style=flat-square)](https://github.com/qusly/qusly/releases)
[![Discord](https://img.shields.io/discord/591624973609730059.svg?style=flat-square)](https://discord.gg/rNyNYFn)
[![Github](https://img.shields.io/github/followers/xnerhu.svg?style=social&label=Follow)](https://twitter.com/xnerhu)

</div>

Qusly is an FTP client, built on top of Electron, React, Styled-components and [Qusly-core](https://www.github.com/qusly/qusly-core). It aims to be fast, beatiful and functional.

### Features
- Supports __FTP, FTPS and SFTP__
- Tabs
- Full file operations e.g. rename, delete
- Easy drag and drop
- Properties panel
- Bookmarks
- Folder structure tree
- File icon
- File transfer

and more! Check out [roadmap](https://github.com/qusly/qusly/projects/) to see what's coming.

### Screenshots

![](https://i.imgur.com/N0paCfw.png)

![](https://i.imgur.com/dKTpp5U.png)

### Components
- [Qusly Core](https://github.com/qusly/qusly-core)
- Tab system from [Wexond](https://github.com/wexond/wexond)

### Running
First of all, you need to have [Node.js](https://nodejs.org) installed.

```bash
$ npm run dev
```

You can configure `.env` file for better dev experience. It will automatically create a new session on hot reload.
Copy `.env.example`, then change it's name to `.env`.

```
HOSTNAME=www.example.com
USER=root
PASSWORD=password
PROTOCOL=sftp
PORT=22
ENABLED=true
```

You can set the protocol to `sftp`, `ftp` or `ftps`.
Port is usually `21` for FTP(s) and `22` for SFTP.

### Other commands

You can also run other commands, for other tasks like building the app or linting the code, by using the commands described below.

##### Usage:

```bash
$ npm run <command>
```

| Command          | Description                                 |
| ---------------- | ------------------------------------------- |
| `build`          | Bundles the source code in production mode. |
| `compile-win32`  | Compiles binaries for Windows.              |
| `compile-darwin` | Compiles binaries for macOS.                |
| `compile-linux`  | Compiles binaries for Linux.                |
| `lint`           | Lints the source code.                      |
| `lint-fix`       | Fixes eslint errors                         |
| `dev`            | Starts Qusly in the dev mode        |

<a href="https://www.patreon.com/bePatron?u=21429620">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>
