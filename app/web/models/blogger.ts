/* eslint-disable @typescript-eslint/no-explicit-any */
import { IModel } from './connect';
import { getBlogger } from 'web/services/blogger';
import { ResCode } from 'app/dto/ResponseMessageModel';
export interface IBloggerModelState {
  id: number;
  nickname: string;
  faceImg?: string;
}
const blogger: IModel<IBloggerModelState> = {
  namespace: 'blogger',
  state: {
    id: 0,
    nickname: '',
    faceImg: undefined
  },
  reducers: {
    setBlogger(state, { payload }: any): any {
      return {
        id: payload.id,
        nickname: payload.nickname,
        faceImg: payload.faceImg
      };
    }
  },
  effects: {
    *getBloggerInfo(action, { call, put }): Iterable<any> {
      const res: any = yield call(getBlogger);
      if (res.code === ResCode.success) {
        yield put({
          type: 'setBlogger',
          payload: res.data
        });
      } else {
        yield put({
          type: 'global/setServerError'
        });
      }
    }
  }
};
export default blogger;
