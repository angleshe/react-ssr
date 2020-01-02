import { Controller } from 'egg';
import { GET } from '@/decorator/router.decorator';
export default class BloggerController extends Controller {
  @GET
  public async getBloggerInfo(): Promise<void> {
    this.ctx.body = await this.service.blog.bloggerInfoSelectService.Execute();
  }
}
