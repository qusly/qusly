<div align="center">
  <img src="static/app-icons/readme.png">

  <h3>
    A full-featured, elegant FTP client
  </h3>

  <br />

[![Release](https://img.shields.io/github/release-pre/qusly/qusly.svg)](https://github.com/qusly/qusly/releases)
[![Travis](https://img.shields.io/travis/qusly/qusly.svg?style=flat-square)](https://travis-ci.com/qusly/qusly)
[![Travis](https://img.shields.io/travis/qusly/qusly-core.svg?style=flat-square)](https://travis-ci.org/xnerhu/qusly-core.svg)
[![Downloads](https://img.shields.io/github/downloads/qusly/qusly/total.svg?style=flat-square)](https://github.com/qusly/qusly/releases)
[![Hits](http://hits.dwyl.io/qusly/qusly.svg")](https://github.com/qusly/qusly/releases)
[![Discord](https://discordapp.com/api/guilds/307605794680209409/widget.png?style=shield)](https://discord.gg/P7Vn4VX)
[![Github](https://img.shields.io/github/followers/xnerhu.svg?style=social&label=Follow)](https://github.com/xnerhu)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fqusly%2Fqusly.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fqusly%2Fqusly?ref=badge_shield)

</div>

Qusly is an FTP client, built on top of Electron, React, Styled-components and [qusly-core](https://www.github.com/qusly/qusly-core). It aims to be fast, beatiful and functional.

### Features

- Supports **FTP, FTPS, SFTP**
- Has tabs
- Full file operations e.g. rename, delete
- Properties panel
- Structure tree

and more! Check out [roadmap](https://github.com/qusly/qusly/projects/) to see what's coming.

### Screenshots

![](https://i.imgur.com/7NRnj8i.png)

### Components

- [`qusly-core`](https://github.com/qusly/qusly-core)
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

<a href="https://www.patreon.com/bePatron?u=21429620">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fqusly%2Fqusly.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fqusly%2Fqusly?ref=badge_large)