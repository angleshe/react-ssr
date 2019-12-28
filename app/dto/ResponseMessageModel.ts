/**
 * @description 响应数据接口(所有对外输出接口必须实现该接口)
 * @author angle
 * @date 2019-12-27
 * @export
 * @interface IResponseMessage
 * @template T 相应数据类型
 */
export interface IResponseMessage<T> {
  /**
   * @description 数据
   * @type {T}
   * @memberof IResponseMessage
   */
  data?: T;
  /**
   * @description 响应信息
   * @type {string}
   * @memberof IResponseMessage
   */
  message: string;
  /**
   * @description 状态码
   * @type {number}
   * @memberof IResponseMessage
   */
  code: ResCode;
}
/**
 * @description 状态码
 * @export
 * @enum {number}
 */
export enum ResCode {
  /**
   * 成功
   */
  success = 1,
  /**
   * 错误
   */
  error = -1,
  /**
   * 没有数据
   */
  noData = 0
}
