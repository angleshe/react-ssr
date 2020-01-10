import { IModel } from './connect';
import { getBlogger } from 'web/services/blogger';
import { ResCode, IResponseMessage } from 'app/dto/ResponseMessageModel';
import { IBloggerInfo } from 'app/dto/BloggerInfoDto';
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
    setBlogger(state, { payload, location }: any): any {
      console.log('->xx', location);
      return {
        id: payload.id,
        nickname: payload.nickname,
        faceImg: payload.faceImg,
        location
      };
    }
  },
  effects: {
    *getBloggerInfo(action, { call, put }): Iterable<any> {
      const res: any = yield call(getBlogger);
      if (res.code === ResCode.success) {
        yield put({
          type: 'setBlogger',
          payload: res.data,
          location: action.location
        });
      }
    }
  }
};
export default blogger;
