import { BaseService } from '../baseService';
import { IBloggerInfo } from 'app/dto/BloggerInfoDto';
import { ResCode } from 'app/dto/ResponseMessageModel';
import { User } from 'app/model/user';
export default class BloggerSelectService extends BaseService<IBloggerInfo> {
  protected async ExecuteMethod(): Promise<void> {
    const res: User | null = await this.app.model.User.find({
      where: {
        isAdmin: true
      }
    });
    if (res === null) {
      this.setMesResult(ResCode.noData);
    } else {
      this.setResult({
        faceImg: res.faceImg,
        nickname: res.nickname,
        uid: res.id
      });
    }
  }
}
