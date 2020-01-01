import { app } from 'egg-mock/bootstrap';
import { IResponseMessage } from '@/dto/ResponseMessageModel';
import { IBloggerInfo } from '@/dto/BloggerInfoDto';
import { Context } from 'egg';
import assert from 'power-assert';
describe('blog/bloggerInfoSelectService', () => {
  it('获取博主数据', async (): Promise<void> => {
    const ctx: Context = app.mockContext();
    const user: IResponseMessage<IBloggerInfo> = await ctx.service.blog.bloggerInfoSelectService.Execute();
    assert(user);
    assert.strictEqual(user.code, 1);
  });
});
