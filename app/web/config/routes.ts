import { IRoute } from 'umi-types';
const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/BlogLayout/index',
    routes: [
      {
        path: '/',
        redirect: '/home'
      },
      { path: '/home', component: '../pages/home/index' }
    ]
  }
];
export default routes;
