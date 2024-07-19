import { EggContext, Next } from '@eggjs/tegg';
import { HttpException } from 'app/utils/HttpException';
import { ValidateException } from 'app/utils/ValidateError';
import { StatusCodes } from 'http-status-codes';

export default () => {
  return async (
    ctx:EggContext,
    next:Next,
  ) => {
    try {
      await next();
    } catch (err) {
      ctx.logger.error((err as Error).message);
      if (err instanceof ValidateException) {
        ctx.status = StatusCodes.BAD_REQUEST;
        ctx.body = {
          statusCode: ctx.status,
          message: err.type === 'missing_field' ? `缺少${err.field}参数` : `参数${err.field}应该为${err.message}`,
        };
        ctx.logger.error(JSON.stringify(ctx.body));
      }
      if (err instanceof Error) {
        const status = err instanceof HttpException ? err.statusCode : 500;
        ctx.status = status;
        ctx.body = {
          statusCode: status,
          message: err instanceof HttpException ? err.message : '网络错误',
        };
      }
    }
  };
};
