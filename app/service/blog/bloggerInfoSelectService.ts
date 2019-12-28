import { BaseService } from '../baseService';
import { IBloggerInfo } from '../../dto/BloggerInfoDto';
import { ResCode } from '../../dto/ResponseMessageModel';
export default class BloggerSelectService extends BaseService<IBloggerInfo> {
  protected async ExecuteMethod(): Promise<void> {
    const res = await this.app.mysql.get('ad_user', {
      IsAdministrator: 1
    });
    console.log(res);
    if (!res) {
      this.setMesResult(ResCode.noData);
    } else {
      this.setResult({
        faceImg: res.Picture,
        uid: res.Id,
        nickname: res.UserName
      });
    }
  }
}
