import { register } from 'tsconfig-paths';
import 'reflect-metadata';
import { EggPlugin } from 'egg';
import tsConfig from '../tsconfig.json';
register({
  baseUrl: './',
  paths: tsConfig.compilerOptions.paths
});

const plugin: EggPlugin = {
  // static: true,
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  },
  assets: {
    enable: true,
    package: 'egg-view-assets'
  },
  i18n: {
    enable: true,
    package: 'egg-i18n'
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize-ts'
  }
};

export default plugin;
