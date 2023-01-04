import Router from "koa-router";
import { test } from "./test";

export function main(router: Router<any, {}>) {
  test(router);
}
