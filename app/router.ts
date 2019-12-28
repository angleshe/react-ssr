import { Application } from 'egg';

export default (app: Application): void => {
  const { controller, router } = app;
  router.get('/api/getBloggerInfo', controller.api.blogger.getBloggerInfo);
  router.get('*', controller.home.index);
};
