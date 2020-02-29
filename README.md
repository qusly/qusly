<div align="center">
  <img src="static/app-icons/icon.png" width="256">

  <h1>
    Qusly
  </h1>

  <br />

[![Actions Status](https://github.com/qusly/qusly/workflows/Build/badge.svg)](https://github.com/qusly/qusly/actions)
[![Downloads](https://img.shields.io/github/downloads/qusly/qusly/total.svg?style=flat-square)](https://github.com/qusly/qusly/releases)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fqusly%2Fqusly.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fqusly%2Fqusly?ref=badge_shield)
[![Discord](https://discordapp.com/api/guilds/307605794680209409/widget.png?style=shield)](https://discord.gg/P7Vn4VX)
[![Github](https://img.shields.io/github/followers/xnerhu.svg?style=social&label=Follow)](https://github.com/xnerhu)

</div>

Qusly is an FTP client, built on top of `Electron` and `React`. It aims to be beatiful and functional.

# Features

- Supports FTP, FTPS and SFTP
- Parallel file transfer
- File operations
- Details panel
- Image preview
- Tree explorer
- Tabs

> Some of the features may not be fully finished, because of the early stage.

# Screenshots

![](https://i.imgur.com/7NRnj8i.png)

# [Roadmap](https://github.com/qusly/qusly/projects)

## Components

- [Qusly-Core](https://github.com/qusly/qusly-core)
- Tabs system from [Wexond](https://github.com/wexond/wexond)

## Running

Before running Qusly, please ensure you have **latest** [Node.js](https://nodejs.org) installed on your machine.

Firstly, run this command to install all needed dependencies. If you have encountered any problems, please report it.

```bash
$ npm install
```

Commands below will run Qusly in the development mode.

```bash
$ npm run dev
```

You can configure the environment file for better development experience. It will automatically create a new session on hot reload.

Change name of the `.env.example` to `.env`.

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

### Sponsors

<a href="https://www.patreon.com/bePatron?u=21429620">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fqusly%2Fqusly.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fqusly%2Fqusly?ref=badge_large)
