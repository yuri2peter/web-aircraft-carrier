# web-aircraft-carrier

React Frontend + NodeJS Server + Docker Deployment all in one project.

> This is a template project which means that it shouldn't be used without any changes.

![](./docs/assets/banner.webp)

## Features

- One project for EVERYTHING you needed
- TypeScript supported
- Tool Scripts for development and deployment

## Documentation

See more documentations in [here](./docs/main.md).

## Quick Start

First of all, initializing your project.

```bash
# cd /your_project

# Get codes
curl https://github.com/yuri2peter/web-aircraft-carrier/archive/refs/heads/main.zip -o wac.zip --progress

# Decompression
unzip wac.zip
mv -n web-aircraft-carrier-main/{.*,*} .
rm -rf web-aircraft-carrier-main
rm -rf wac.zip

# Initialize
cd ./scripts
sh init.sh

# Done
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

## Publish & Deployment

- See `./docker`
- Create a protable node app with [node-app-protable](https://github.com/yuri2peter/node-app-protable)
- Create a electron app (comnig soon...)
