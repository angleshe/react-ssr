import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  ssr: true,
  outputPath: '../public',
  treeShaking: true,
  publicPath: 'http://localhost:8000/',
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [{ path: '/', component: '../pages/index' }]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'react-ssr',
        dll: true,
        locale: {
          baseNavigator: false,
          useLocalStorage: false
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//
          ]
        }
      }
    ],
    '@umijs/plugin-prerender'
  ]
};

export default config;
