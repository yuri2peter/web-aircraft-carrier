import { Controller, Ctx } from '../types/controller';

export const upload: Controller = (router) => {
  router.post('/api/upload', async (ctx: Ctx) => {
    const file = ctx.request.files.file;
    const { mimetype, newFilename, originalFilename, size } = file;
    ctx.body = { mimetype, newFilename, originalFilename, size };
  });
};
