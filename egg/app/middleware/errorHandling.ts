import { EggContext, Next } from '@eggjs/tegg';
import { HttpException } from 'app/utils/HttpException';
import { ValidateException } from 'app/utils/ValidateError';
import { StatusCodes } from 'http-status-codes';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';

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
      if (err instanceof TokenExpiredError) {
        ctx.status = StatusCodes.BAD_REQUEST;
        ctx.body = {
          statusCode: StatusCodes.BAD_REQUEST,
          message: '登陆过期',
        };
        return;
      }
      if (err instanceof JsonWebTokenError || err instanceof NotBeforeError) {
        ctx.status = StatusCodes.FORBIDDEN;
        ctx.body = {
          statusCode: StatusCodes.FORBIDDEN,
          message: 'token 异常',
        };
        return;
      }
    }
  };
};
