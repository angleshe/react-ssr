import { Controller } from 'egg';

export default class BloggerController extends Controller {
  public async getBloggerInfo(): Promise<void> {
    this.ctx.body = await this.service.blog.bloggerInfoSelectService.Execute();
  }
}
