import request from 'web/utils/request';
import { IResponseMessage } from '../../dto/ResponseMessageModel';
import { IBloggerInfo } from '../../dto/BloggerInfoDto';

export async function getBlogger(): Promise<IResponseMessage<IBloggerInfo>> {
  return request.get<IResponseMessage<IBloggerInfo>>('blogger/getBloggerInfo');
}
