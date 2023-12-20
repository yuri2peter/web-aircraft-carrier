import Router from 'koa-router';
import { test } from './test';
import { upload } from './upload';
import { main } from './main';

export function ctrls(router: Router<any, {}>) {
  [test, upload, main].forEach((t) => t(router));
}
