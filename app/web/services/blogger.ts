import request from 'web/utils/request';
import { IResponseMessage } from 'app/dto/ResponseMessageModel';
import { IBloggerInfo } from 'app/dto/BloggerInfoDto';

export async function getBlogger(): Promise<IResponseMessage<IBloggerInfo>> {
  return request.get<IResponseMessage<IBloggerInfo>>('blogger/getBloggerInfo');
}
