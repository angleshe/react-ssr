import { Application } from 'egg';
import { bindRouterList } from '@/decorator/router.decorator';

export default (app: Application): void => {
  const { controller, router } = app;
  bindRouterList(app);
  router.get('*', controller.home.index);
};
