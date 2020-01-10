import { Model } from 'dva';
import { IGlobalModelState } from './global';
import { IBloggerModelState } from './blogger';
import { Dispatch } from 'redux';
export interface IModel<T> extends Model {
  state: T;
}
export interface ILoading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface IConnectState {
  global: IGlobalModelState,
  blogger: IBloggerModelState
  loading: ILoading
}

export interface IPropsDispatch {
  dispatch: Dispatch
}
