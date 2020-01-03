import { Service } from 'egg';
import { IResponseMessage, ResCode } from 'app/dto/ResponseMessageModel';
import _ from 'lodash';
/**
 * @description 服务基础抽象类,所有服务类必须继承实现该类
 * @author angle
 * @date 2019-12-28
 * @export
 * @abstract
 * @class BaseService
 * @extends {Service}
 * @template R 结果类型
 * @template P 参数类型
 */
export abstract class BaseService<R, P = void> extends Service {
  /**
   * @description 参数
   * @protected
   * @type {(P | undefined)}
   * @memberof BaseService
   */
  protected Parameter: P | undefined;
  /**
   * @description 结果
   * @private
   * @type {(IResponseMessage<R> | undefined)}
   * @memberof BaseService
   */
  private Result: IResponseMessage<R> | undefined;
  /**
   * @description 服务函数
   * @author angle
   * @date 2019-12-28
   * @protected
   * @abstract
   * @returns {Promise<void>}
   * @memberof BaseService
   */
  protected abstract async ExecuteMethod(): Promise<void>;
  /**
   * @description 解析信息
   * @author angle
   * @date 2019-12-28
   * @private
   * @param {ResCode} code 状态码
   * @returns {string} 信息
   * @memberof BaseService
   */
  private codeToMeg(code: ResCode): string {
    let res: string = '';
    switch (code) {
      case ResCode.success:
        res = this.ctx.__('success');
        break;
      case ResCode.error:
        res = this.ctx.__('serverError');
        break;
      case ResCode.noData:
        res = this.ctx.__('noData');
        break;
      default:
        res = '';
        break;
    }
    return res;
  }
  /**
   * @description 设置结果(成功)
   * @author angle
   * @date 2019-12-28
   * @protected
   * @param {R} data 结果数据
   * @memberof BaseService
   */
  protected setResult(data: R): void;
  /**
   * @description 设置结果
   * @author angle
   * @date 2019-12-28
   * @protected
   * @param {R} data 结果数据
   * @param {ResCode} code 状态码
   * @memberof BaseService
   */
  protected setResult(data: R, code: ResCode): void;
  /**
   * @description 设置结果(成功)
   * @author angle
   * @date 2019-12-28
   * @protected
   * @param {R} data 结果数据
   * @param {string} message 信息
   * @memberof BaseService
   */
  protected setResult(data: R, message: string): void;
  /**
   * @description 设置结果
   * @author angle
   * @date 2019-12-28
   * @protected
   * @param {R} data 结果数据
   * @param {ResCode} code 状态码
   * @param {string} message 信息
   * @memberof BaseService
   */
  protected setResult(data: R, code: ResCode, message: string): void;
  /**
   * @description 设置结果
   * @author angle
   * @date 2019-12-28
   * @protected
   * @param {R} data 结果数据
   * @param {string} message 信息
   * @param {ResCode} code 状态码
   * @memberof BaseService
   */
  protected setResult(data: R, message: string, code: ResCode): void;

  protected setResult(data: R, arg1?: ResCode | string, arg2?: ResCode | string): void {
    let code: ResCode = ResCode.success;
    let message: string = '';
    if (arg1) {
      if (_.isNumber(arg1)) {
        code = arg1;
        if (arg2 && _.isString(arg2)) {
          message = arg2;
        }
      } else {
        message = arg1;
        if (arg2 && _.isNumber(arg2)) {
          code = arg2;
        }
      }
    }
    if (message === '') {
      message = this.codeToMeg(code);
    }
    this.Result = {
      data,
      code,
      message
    };
  }
  /**
   * @description 设置信息结果(成功)
   * @author angle
   * @date 2019-12-28
   * @protected
   * @memberof BaseService
   */
  protected setMesResult(): void;
  /**
   * @description 设置信息结果
   * @author angle
   * @date 2019-12-28
   * @protected
   * @param {ResCode} code 状态码
   * @memberof BaseService
   */
  protected setMesResult(code: ResCode): void;
  /**
   * @description 设置信息结果(成功)
   * @author angle
   * @date 2019-12-28
   * @protected
   * @param {string} message 信息
   * @memberof BaseService
   */
  protected setMesResult(message: string): void;
  /**
   * @description 设置信息结果
   * @author angle
   * @date 2019-12-28
   * @protected
   * @param {ResCode} code 状态码
   * @param {string} message 信息
   * @memberof BaseService
   */
  protected setMesResult(code: ResCode, message: string): void;
  /**
   * @description 设置信息结果
   * @author angle
   * @date 2019-12-28
   * @protected
   * @param {string} message 信息
   * @param {ResCode} code 状态码
   * @memberof BaseService
   */
  protected setMesResult(message: string, code: ResCode): void;

  protected setMesResult(arg1?: string | ResCode, arg2?: string | ResCode): void {
    let code: ResCode = ResCode.success;
    let message: string = '';
    if (arg1) {
      if (_.isNumber(arg1)) {
        code = arg1;
        if (arg2 && _.isString(arg2)) {
          message = arg2;
        }
      } else {
        message = arg1;
        if (arg2 && _.isNumber(arg2)) {
          code = arg2;
        }
      }
    }
    if (message === '') {
      message = this.codeToMeg(code);
    }
    this.Result = {
      code,
      message
    };
  }
  /**
   * @description 设置失败信息结果
   * @author angle
   * @date 2019-12-28
   * @protected
   * @memberof BaseService
   */
  protected setErrorResult(): void;
  /**
   * @description 设置失败信息结果
   * @author angle
   * @date 2019-12-28
   * @protected
   * @param {string} message 信息
   * @memberof BaseService
   */
  protected setErrorResult(message: string): void;
  protected setErrorResult(message?: string): void {
    if (message) {
      this.setMesResult(ResCode.error, message);
    } else {
      this.setMesResult(ResCode.error);
    }
  }
  /**
   * @description 执行服务
   * @author angle
   * @date 2019-12-28
   * @param {P} model 服务参数
   * @returns {Promise<IResponseMessage<R>>} 结果
   * @memberof BaseService
   */
  public async Execute(model: P): Promise<IResponseMessage<R>> {
    try {
      this.Parameter = model;
      await this.ExecuteMethod();
      if (this.Result) {
        return this.Result;
      }
      throw Error('需要对BaseService的Result赋值!!!');
    } catch (e) {
      console.error(e);
      this.logger.error(e);
      this.setErrorResult();
      return this.Result as IResponseMessage<R>;
    }
  }
}
