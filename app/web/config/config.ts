import { IConfig, IWebpackChainConfig } from 'umi-types';
import postcssPxtorem from 'postcss-pxtorem';
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
  extraPostCSSPlugins: [
    postcssPxtorem({
      rootValue: 75,
      propList: ['*', '!font*'],
      minPixelValue: 5
    })
  ],
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/',
          redirect: '/home'
        },
        { path: '/home', component: '../pages/home/index' }
      ]
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
        dll: true,
        locale: {
          baseNavigator: false,
          useLocalStorage: false
        },
        metas: [
          { name: 'apple-mobile-web-app-capable', content: 'yes' },
          { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
          { name: 'format-detection', content: 'telephone=no' },
          { name: 'format-detection', content: 'email=no' },
          {
            name: 'viewport',
            content:
              'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
          }
        ],
        headScripts: [
          {
            src: '<%= PUBLIC_PATH %>flexible.min.js'
          }
        ],
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
