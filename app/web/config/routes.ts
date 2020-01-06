import { IRoute } from 'umi-types';
const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/BaseLayout'
    // routes: [
    //   {
    //     path: '/',
    //     redirect: '/blog'
    //   },
    //   {
    //     path: '/blog',
    //     component: '../layouts/BlogLayout/index',
    //     routes: [
    //       {
    //         path: '',
    //         component: '../pages/home/index'
    //       }
    //     ]
    //   },
    //   {
    //     path: '/500',
    //     component: './error/500'
    //   },
    //   {
    //     path: '*',
    //     component: './error/404'
    //   }
    // ]
  }
];
export default routes;
