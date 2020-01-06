import { Model } from 'dva';

const global: Model = {
  namespace: 'global',
  state: {
    serverError: true
  }
};

export default global;
