import { Controller } from 'egg';
import path from 'path';
import server from 'umi-server';
import { load } from 'cheerio';
import { Helmet, HelmetData } from 'react-helmet';
import { Result } from 'umi-server/lib';

export default class HomeController extends Controller {
  /**
   * @description 前端资源路径
   * @private
   * @type {string}
   * @memberof HomeController
   */
  private readonly root: string = path.join(__dirname, '..', 'public');
  /**
   * @description 设置标题
   * @author angle
   * @date 2019-12-22
   * @private
   * @param {ReturnType<typeof load>} $ 页面cheerio对象
   * @returns {ReturnType<typeof load>} 处理完cheerio对象
   * @memberof HomeController
   */
  private handlerTitle($: ReturnType<typeof load>): ReturnType<typeof load> {
    try {
      const helmet: HelmetData = Helmet.renderStatic();
      $('head').prepend(helmet.title.toString());
    } catch (e) {
      this.ctx.logger.error('postProcessHtml title', e);
    }
    return $;
  }
  public async index(): Promise<void> {
    const { ctx } = this;
    const render = server({
      root: this.root,
      polyfill: false,
      postProcessHtml: [this.handlerTitle],
      dev: ctx.app.config.env === 'local'
    });
    const res: Result = await render({
      req: {
        url: ctx.request.url
      }
    });
    ctx.body = res.ssrHtml;
  }
}
