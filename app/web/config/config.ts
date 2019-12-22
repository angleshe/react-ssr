import { IConfig, IWebpackChainConfig } from 'umi-types';
import LessFunc from 'less-plugin-functions';
import path from 'path';

// ref: https://umijs.org/config/
const config: IConfig = {
  ssr: true,
  outputPath: '../public',
  treeShaking: true,
  publicPath: 'http://localhost:8000/',
  lessLoaderOptions: {
    javascriptEnabled: true,
    plugins: [new LessFunc()]
  },
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
  ],
  chainWebpack: (config: IWebpackChainConfig): void => {
    config.module
      .rule('less')
      .test(/\.less$/)
      .use('style-resources-loader')
      .loader('style-resources-loader')
      .options({
        patterns: [
          path.resolve(__dirname, './config.less'),
          path.resolve(__dirname, '../utils/utils.less')
        ]
      });
  }
};

export default config;
