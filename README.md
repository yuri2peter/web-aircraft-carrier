# web-aircraft-carrier

React Frontend + NodeJS Server + Docker Deployment all in one project.

> This is a template project which means that it shouldn't be used without any changes.

![](./docs/assets/banner.webp)

## Features

- One project for EVERYTHING you needed
- TypeScript supported
- Dynamic ENV variables
- Tool Scripts for development and deployment

## Documentation

See more documentations in [here](./docs/list.md).

## Quick Start

First of all, initializing your project.

```bash
git clone https://github.com/yuri2peter/web-aircraft-carrier.git
cd ./web-aircraft-carrier/scripts
sh init.sh
```

For frontend development:

```bash
sh dev-frontend.sh
```

For backend development:

```bash
sh dev-server.sh
```

> Of course you could develop frontend and backend at the same time.

Compile frontend files and copy them into your server directory:

```bash
sh build-frontend.sh
```

Serve in production mode:

```bash
sh start.sh
```

## System Requirements

- CentOS 7
- NodeJS
- Docker
- Docker Compose
