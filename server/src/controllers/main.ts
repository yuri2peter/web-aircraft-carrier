import { Controller, Ctx } from '../types/controller';

export const main: Controller = (router) => {
  router.post('/api/main/foo', async (ctx: Ctx) => {
    ctx.body = 'bar';
  });
};
