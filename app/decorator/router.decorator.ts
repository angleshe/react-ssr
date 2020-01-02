/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { Application } from 'egg';
/**
 * @description 路由模型
 * @author angle
 * @date 2020-01-02
 * @export
 * @interface IRouterModel
 */
interface IRouterModel {
  /**
   * @description 方法
   * @type {RouterMethods}
   * @memberof IRouterModel
   */
  method: RouterMethods;
  /**
   * @description 版定路由
   * @type {string}
   * @memberof IRouterModel
   */
  url?: string;
  /**
   * @description controller对象
   * @type {Record<string, any>}
   * @memberof IRouterModel
   */
  controller: Record<string, any>;
  /**
   * @description 动作名
   * @type {string}
   * @memberof IRouterModel
   */
  action: string;
  /**
   * @description 参数
   * @type {string[]}
   * @memberof IRouterModel
   */
  params?: string[];
}
/**
 * @description 路由方法
 * @export
 * @enum {number}
 */
enum RouterMethods {
  GET = 'get'
}
/**
 * 路由列表
 */
const RouterList: IRouterModel[] = [];

/**
 * @description 无参数默认路由路径
 * @author angle
 * @date 2020-01-02
 * @export
 * @returns {MethodDecorator} 方法修饰器
 */
export function GET(): MethodDecorator;
/**
 * @description 指定路径路由
 * @author angle
 * @date 2020-01-02
 * @export
 * @param {string} path 路径
 * @returns {MethodDecorator}
 */
export function GET(path: string): MethodDecorator;
/**
 * @description 带参数默认路由
 * @author angle
 * @date 2020-01-02
 * @export
 * @param {string[]} params 参数列表
 * @returns {MethodDecorator} 方法修饰器
 */
export function GET(params: string[]): MethodDecorator;
/**
 * @description 指定参数 路径路由
 * @author angle
 * @date 2020-01-02
 * @export
 * @param {string} path 路径
 * @param {string[]} params 参数列表
 * @returns {MethodDecorator} 方法修饰器
 */
export function GET(path: string, params: string[]): MethodDecorator;
/**
 * @description 无参数默认路由路径 方法修饰器
 * @author angle
 * @date 2020-01-02
 * @export
 * @param {Record<string, any>} target
 * @param {string} propertyKey
 */
export function GET(target: Record<string, any>, propertyKey: string): void;

export function GET(
  arg1?: string | string[] | Record<string, any>,
  arg2?: string[] | string
): void | MethodDecorator {
  if (arg2 && _.isString(arg2)) {
    // GET(target: Record<string, any>, propertyKey: string): void;
    RouterList.push({
      method: RouterMethods.GET,
      controller: arg1 as Record<string, any>,
      action: arg2
    });
  } else {
    let url: string | undefined;
    let params: string[] | undefined;
    if (arg1) {
      if (_.isString(arg1)) {
        url = arg1;
      } else {
        params = arg1 as string[];
      }
    }
    if (arg2) {
      params = arg2 as string[];
    }
    return (target, propertyKey): void => {
      RouterList.push({
        method: RouterMethods.GET,
        controller: target,
        action: propertyKey.toString(),
        params,
        url
      });
    };
  }
}
/**
 * @description 绑定路由
 * @author angle
 * @date 2020-01-02
 * @export
 * @param {Application} app
 */
export function bindRouterList(app: Application): void {
  RouterList.forEach((item) => {
    const attrArr: string[] = item.controller.pathName.split('.');
    let url: string = item.url || `/${attrArr.slice(1).join('/')}/${item.action}`;
    if (item.params) {
      url += `/:${item.params.join('/:')}`;
    }
    app.router[item.method](
      url,
      attrArr.reduce<Record<string, any>>(
        (prev: Record<string, any>, curr: string) => prev[curr],
        app
      )[item.action]
    );
  });
}
