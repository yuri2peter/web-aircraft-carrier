import Koa from 'koa';
import Router from 'koa-router';
import bodyPaser from 'koa-body';
import http from 'http';
import path from 'path';
import fs from 'fs-extra';
import CSRF from 'koa-csrf';
import staticServer from 'koa-static';
import cors from '@koa/cors';
import { ROOT_PATH } from './configs';
import { main as controller } from './controllers/index';

const htmlFrontendPath = path.join(ROOT_PATH, 'html/frontend');
const htmlResourcesPath = path.join(ROOT_PATH, 'html/resources');

export function startKoa() {
  fs.ensureDirSync(htmlFrontendPath);
  fs.ensureDirSync(htmlResourcesPath);
  const router = new Router();
  controller(router);
  const app = new Koa();
  app.use(cors());
  app.use(new CSRF());
  app.use(
    staticServer(htmlFrontendPath, {
      maxAge: 30 * 24 * 3600 * 1000, // 30天的强缓存
      immutable: true, // 声明资源是不会变更的可以永久缓存
    })
  );
  app.use(
    staticServer(htmlResourcesPath, {
      maxAge: 30 * 24 * 3600 * 1000, // 30天的强缓存
      immutable: true, // 声明资源是不会变更的可以永久缓存
    })
  );
  app.use(bodyPaser({ jsonLimit: '100mb' }));
  app.use(router.routes());
  return http.createServer(app.callback());
}
