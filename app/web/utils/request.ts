import { extend, RequestMethod } from 'umi-request';
import { formatMessage } from 'umi-plugin-react/locale';
import { notification } from 'antd';
import isBrowser from 'umi-server/lib/isBrowser';
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (isBrowser()) {
    if (response && response.status) {
      const errorText: string = formatMessage({ id: `errorRequestCode${response.status}` });
      notification.error({
        message: formatMessage(
          { id: 'errorRequestMsg' },
          {
            code: response.status,
            url: response.url
          }
        ),
        description: errorText
      });
    } else {
      notification.error({
        message: formatMessage({ id: 'errorRequestOtherMsg' }),
        description: formatMessage({ id: 'errorRequestOther' })
      });
    }
  }
  return response;
};

const request: RequestMethod = extend({
  errorHandler,
  prefix: `${isBrowser() ? '' : 'http://localhost:7001'}/api/`
});
// request.use(
//   // eslint-disable-next-line @typescript-eslint/no-misused-promises
//   async (ctx, next): Promise<void> => {
//     // eslint-disable-next-line @typescript-eslint/await-thenable
//     await next();
//     console.log(ctx.res);
//   }
// );
export default request;
