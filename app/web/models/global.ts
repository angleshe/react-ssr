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
    setServerError(state, params: any): any {
      console.log('state', state);
      return {
        serverError: true,
        location: params.location
      };
    }
  }
};

export default global;
