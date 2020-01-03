import { Controller } from 'egg';
import { GET } from 'app/decorator/router.decorator';
export default class BloggerController extends Controller {
  /**
   * @description 获取博主信息
   * @author angle
   * @date 2020-01-02
   * @returns {Promise<void>}
   * @memberof BloggerController
   */
  @GET
  public async getBloggerInfo(): Promise<void> {
    this.ctx.body = await this.service.blog.bloggerInfoSelectService.Execute();
  }
}
