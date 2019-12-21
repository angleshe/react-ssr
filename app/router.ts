import { Application } from 'egg';

export default (app: Application): void => {
  const { controller, router } = app;

  router.get('*', controller.home.index);
};
