import { EggPlugin } from 'egg';

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
  }
};

export default plugin;
