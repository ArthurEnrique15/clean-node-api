import { Express, Router } from 'express';
import fg from 'fast-glob';

export default (app: Express): void => {
  const router = Router();

  app.use('/api', router);

  const routeFiles = fg.sync('**/src/main/routes/**.routes.ts');

  routeFiles.map(async (file) => {
    const route = (await import(`../../../${file}`)).default;
    route(router);
  });
};
