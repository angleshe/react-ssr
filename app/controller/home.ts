import { Controller, Context } from 'egg';
import path from 'path';
import server from 'umi-server';
import { IContext, IRenderOpts, IResult } from 'umi-server/lib';

export default class HomeController extends Controller {
  private readonly root: string = path.join(__dirname, '..', 'public');
  private render: (ctx: IContext, renderOpts?: IRenderOpts) => Promise<IResult>;
  constructor(ctx: Context) {
    super(ctx);
    this.render = server({
      root: this.root
    });
  }
  public async index() {
    const { ctx } = this;
    const { ssrHtml } = await this.render({
      req: {
        url: ctx.request.url
      }
    });
    ctx.body = await ctx.renderString(ssrHtml);
  }
}
