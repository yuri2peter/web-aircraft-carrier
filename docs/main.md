# Documentation

## Server

- koa, axios, fs-extra, immer, md5, nanoid, socket.io are preinstalled.
- Default server port: 3000.

## Frontend

- Based on React + Typescript + [Vite](https://github.com/vitejs/vite).
- mui, axios, formik, immer, lodash, nanoid, socket.io-client, yup, @yuri2/arrow-frog are preinstalled.
- Default preview port: 8000.

## Env Variables

There are several env files you can use:

- `.env`
- `.env.local`
- `.env.development`
- `.env.development.local`
- `.env.production`
- `.env.production.local`

> In particular, the frontend environment variables need to use the `FRONTEND_` prefix.

## Scripts

- `build-frontend.sh` Compile frontend files and copy them into the `server/html/frontend` directory.
- `check-ports.sh` A small tool to check if ports 3000 and 8000 are available.
- `dev-frontend.sh` Equivalent to executing `npm run dev` in the `frontend` directory.
- `dev-server.sh` Equivalent to executing `npm run dev` in the `server` directory.
- `init.sh` Install packages, create template files.
- `start.sh` Serve in production mode.

Check [README.md#Quick Start](../README.md#Quick%20Start) for more details.

## Docker

It is recommended to use Docker to build and deploy your project.

- `build.example.sh` Build a docker image named `myapp:v1`.
- `docker-compose.example.yml` A docker-compose.yml example.
- `Dockerfile` DO NOT change it unless you know what you're doing.
- `.dockerignore` DO NOT change it unless you know what you're doing.
