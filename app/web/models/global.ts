import { IModel } from './connect';

export interface IGlobalModelState {
  serverError: boolean;
}

const global: IModel<IGlobalModelState> = {
  namespace: 'global',
  state: {
    serverError: false
  },
  reducers: {
    setServerError(): IGlobalModelState {
      return {
        serverError: true
      };
    }
  }
};

export default global;
