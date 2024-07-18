import { EggContext, Next } from '@eggjs/tegg';
import { HttpException } from 'app/utils/HttpException';

export default () => {
  return async (
    ctx:EggContext,
    next:Next,
  ) => {
    try {
      await next();
    } catch (err) {
      const status = err instanceof HttpException ? err.statusCode : 500;
      ctx.status = status;
      ctx.body = {
        statusCode: status,
        message: err instanceof HttpException ? err.message : '网络错误',
      };
      ctx.logger.error([ ctx.body.statusCode, ctx.body.message ].join(' '));
    }
  };
};
